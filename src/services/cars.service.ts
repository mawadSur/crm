import AWS from 'aws-sdk';
import fs from 'fs';
import util from 'util';
import { CarModel } from '../models/index.js';

const unlinkFile = util.promisify(fs.unlink);
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

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
    await CarModel.updateOne({ id }, { $push: { pictures: s3Data.Key || '' } });
    await unlinkFile(file.path);
    return {
      message: 'Image uploaded successfully',
      imageUrl: s3Data.Key,
    };
  }

  private uploadFileToS3(file) {
    const fileStream = fs.createReadStream(file.path);
    const uploadParams = {
      Bucket: bucketName,
      Body: fileStream,
      Key: file.filename,
    };
    console.log(uploadParams);
    return s3.upload(uploadParams).promise();
  }
}
