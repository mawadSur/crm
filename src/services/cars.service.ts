import AWS from 'aws-sdk';
import fs from 'fs';
import util from 'util';
import { ENV_VARIABLES } from '../config/environment.js';
import { CarModel } from '../models/index.js';

const unlinkFile = util.promisify(fs.unlink);
const bucketName = ENV_VARIABLES.AWS_BUCKET_NAME;
const region = ENV_VARIABLES.AWS_BUCKET_REGION;
const accessKeyId = ENV_VARIABLES.AWS_ACCESS_KEY;
const secretAccessKey = ENV_VARIABLES.AWS_SECRET_KEY;

AWS.config.update({
  accessKeyId,
  secretAccessKey,
  region,
});

const s3 = new AWS.S3();

export class CarsService {
  constructor() {}

  async list(vin: string = ''): Promise<{
    pictures: any[];
  }> {
    const results: any = await CarModel.findOne({ VIN: vin || '' }, 'pictures');
    return { pictures: (results || {}).pictures || [] };
  }

  async deleteImage(s3Url: string, vin: string) {
    console.log(s3Url);
    console.log(vin);
    await s3.deleteObject({ Bucket: bucketName, Key: s3Url });
    console.log('Deleted successfully');
    await CarModel.updateOne({ VIN: vin }, { $pull: { pictures: s3Url } });
    return {
      message: 'Image deleted successfully',
    };
  }

  async upload(
    file: any,
    id: string,
  ): Promise<{
    message: string;
    imageUrl: string;
  }> {
    const s3Data = await this.uploadFileToS3(file);
    const url = `https://${bucketName}.s3.amazonaws.com/${s3Data.Key}`;
    await CarModel.updateOne({ _id: id }, { $push: { pictures: url || '' } });
    await unlinkFile(file.path);
    return {
      message: 'Image uploaded successfully',
      imageUrl: url,
    };
  }

  private uploadFileToS3(file) {
    const fileStream = fs.createReadStream(file.path);
    const uploadParams = {
      Bucket: bucketName,
      Body: fileStream,
      Key: 'car-images/' + file.filename,
    };
    return s3.upload(uploadParams).promise();
  }
}
