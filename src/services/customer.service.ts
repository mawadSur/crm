import httpRequest from '../libs/httpsRequest.js';
import {
  BlastModel,
  CustomerActivityModel,
  CustomerInsuranceModel,
  CustomerModel,
  CustomerServiceModel,
  CustomerVehicleModel,
} from '../models/index.js';
import { IQuery, IQueryCustomer } from '../utils/index.js';

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

  async followupList({ query }: IQueryCustomer) {
    const total = await CustomerModel.countDocuments();

    //TODO update more conditions to query options

    const data = await CustomerModel.find({ flags: { $ne: null } }).exec();
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
      phone: customer.workNumber,
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

  async launchAllCampaign(payload: { context: string }) {
    const limit = 10;
    let offset = 0;
    const totalCustomers = await CustomerModel.countDocuments();

    let _totalSuccess = 0;
    let _totalFailed = 0;

    while (offset < totalCustomers) {
      try {
        const customers = await CustomerModel.find().skip(offset).limit(limit).lean().exec();
        const { totalSuccess, totalFailed } = await this.launchCampaign({
          customerIds: customers.map((customer) => String(customer._id)),
          context: payload.context,
        });
        offset += limit;
        _totalSuccess += totalSuccess;
        _totalFailed += totalFailed;
      } catch (error) {
        console.log('error', error?.message ?? error);
        offset += limit;
      }
    }

    return {
      totalFailed: _totalFailed,
      totalSuccess: _totalSuccess,
    };
  }

  private async requestLaunch(payload: { phone: string; context: string }) {
    try {
      const url = process.env.AWS_SEND_MESSAGE_URI;
      const response = await httpRequest.post(
        url,
        JSON.stringify({
          action: 'send',
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

  async getCustomerServices(customerId: string, query: IQuery) {
    const total = await CustomerServiceModel.countDocuments();
    const queryOptions: any = CustomerServiceModel.find({
      customerId,
    });

    if (!query?.unlimited) {
      queryOptions.limit(query?.limit ?? 10);
      queryOptions.offset(query?.offset ?? 0);
    }
    const customerServices = await queryOptions
      .sort({ createdAt: -1 })
      .populate({
        path: 'customerId',
        model: 'Customers',
      })
      .populate({
        path: 'serviceTypeId',
        model: 'ServiceTypes',
      })
      .lean()
      .exec();
    return {
      data: customerServices,
      total,
    };
  }

  async getCustomerInsurances(customerId: string, query: IQuery) {
    const total = await CustomerInsuranceModel.countDocuments();
    const queryOptions: any = CustomerInsuranceModel.find({
      customerId,
    });

    if (!query?.unlimited) {
      queryOptions.limit(query?.limit ?? 10);
      queryOptions.offset(query?.offset ?? 0);
    }
    const customerInsurances = await queryOptions
      .sort({ createdAt: -1 })
      .populate({
        path: 'customerId',
        model: 'Customers',
      })
      .lean()
      .exec();
    return {
      data: customerInsurances,
      total,
    };
  }

  async getCustomerVehicles(customerId: string, query: IQuery) {
    const total = await CustomerVehicleModel.countDocuments();
    const queryOptions: any = CustomerVehicleModel.find({
      customerId,
    });

    if (!query?.unlimited) {
      queryOptions.limit(query?.limit ?? 10);
      queryOptions.offset(query?.offset ?? 0);
    }
    const customerVehicles = await queryOptions
      .sort({ createdAt: -1 })
      .populate({
        path: 'customerId',
        model: 'Customers',
      })
      .lean()
      .exec();
    return {
      data: customerVehicles,
      total,
    };
  }

  async getCustomerActivities(customerId: string, query: IQuery) {
    const total = await CustomerActivityModel.countDocuments();
    const queryOptions: any = CustomerActivityModel.find({
      customerId,
    });

    if (!query?.unlimited) {
      queryOptions.limit(query?.limit ?? 10);
      queryOptions.offset(query?.offset ?? 0);
    }
    const customerActivities = await queryOptions
      .sort({ createdAt: -1 })
      .populate({
        path: 'customerId',
        model: 'Customers',
      })
      .populate({
        path: 'activityId',
        model: 'Activities',
      })
      .lean()
      .exec();
    return {
      data: customerActivities,
      total,
    };
  }
}
