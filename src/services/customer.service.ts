import httpRequest from '../libs/httpsRequest.js';
import { BlastModel, CustomerModel } from '../models/index.js';
import { IQueryCustomer } from '../utils/index.js';

export class CustomerService {
  constructor() {}

  async list({ query }: IQueryCustomer) {
    const total = await CustomerModel.countDocuments();
    const queryOptions: any = {};

    if (query?.name) {
      queryOptions.name = {
        $regex: query.name,
        $options: 'i',
      };
    }
    if (query?.age) {
      queryOptions.age = {
        $eq: +query.age,
      };
    }
    if (query?.gender) {
      queryOptions.gender = {
        $eq: query.gender,
      };
    }
    if (query?.email) {
      queryOptions.email = {
        $regex: query.email,
        $options: 'i',
      };
    }
    if (query?.sourceOfLead) {
      queryOptions.sourceOfLead = {
        $eq: query.sourceOfLead,
      };
    }

    //TODO update more conditions to query options

    const data = await CustomerModel.find(queryOptions).exec();
    return {
      data,
      total,
    };
  }

  async launchCampaign(payload: { customerIds: string[]; context: string }) {
    const customers = await CustomerModel.find({
      _id: {
        $in: payload.customerIds,
      },
    })
      .lean()
      .exec();

    if (customers.length === 0) {
      throw new Error('Customers not found');
    }

    const waitingList = customers.map((customer) => ({
      name: customer.name,
      phone: customer.phone,
      customerId: customer._id,
      context: String(payload.context),
      isSendMessage: false,
    }));

    //! Create blast data
    const blasts = await BlastModel.insertMany(waitingList, {
      ordered: false,
      lean: true,
    });

    //! Send message to customers
    const promiseSendMessage = await Promise.allSettled(
      blasts.map((blast) =>
        this.requestLaunch({
          phone: blast.phone,
          context: blast.context,
        }),
      ),
    );

    let totalSuccess = 0;
    let totalFailed = 0;
    const updateBlastOperations = [];

    promiseSendMessage.forEach((item, i) => {
      if (item.status === 'rejected') {
        totalFailed += 1;
        return;
      }
      if (item.status === 'fulfilled') {
        totalSuccess += 1;
        const blastId = blasts[i]._id;

        if (!blastId) return;

        console.log('blastId', blastId);
        updateBlastOperations.push({
          updateOne: {
            filter: { _id: blastId },
            update: { $set: { isSendMessage: true } },
          },
        });
      }
    });

    if (updateBlastOperations.length > 0) {
      //! Update blast status
      await BlastModel.bulkWrite(updateBlastOperations, {
        ordered: false,
      });
    }

    return {
      totalFailed,
      totalSuccess,
    };
  }

  private async requestLaunch(payload: { phone: string; context: string }) {
    try {
      const url = process.env.AWS_SEND_MESSAGE_URI;
      const response = await httpRequest.post(
        url,
        JSON.stringify({
          phone: payload.phone,
          context: payload.context,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
          maxBodyLength: Infinity,
        },
      );
      return response.data;
    } catch (error) {
      console.log('error', error?.message);
      throw error;
    }
  }
}
