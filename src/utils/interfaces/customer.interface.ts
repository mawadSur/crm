import { IQuery } from './common.interface.js';

export interface IQueryCustomer extends IQuery {
  query: {
    name?: string;
    age?: number;
    gender?: string;
    email?: string;
    sourceOfLead?: string;

    //TODO: Not sure where we can get these fields
    occupation?: string;
    contact?: string;
    purchase?: string;
    carMake?: string;
    carModel?: string;
    carYear?: string;
    carColor?: string;
    carPrice?: string;
    leaseOfPurchase?: string;
    lastServiceDate?: string;
    tradeIn?: string;
    testDriveHistory?: string;
    financingStatus?: string;
    type?: string;
  };
}
