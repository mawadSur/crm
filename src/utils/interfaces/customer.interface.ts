import { IQuery } from './common.interface.js';

import { FormatString } from 'mongoose';

export enum ECustomerGender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}

export interface ICustomerOtherContact {
  email: string;
  phone: string;
  name: string;
}
export interface ICustomer {
  name: string;
  age: number;
  gender: ECustomerGender;
  address: string;
  email: string;
  otherEmail: string;
  homeNumber: FormatString;
  cellNumber: FormatString;
  workNumber: FormatString;
  // conversations: TextConversation[]; // Add conversations field
  dateOfBirth: Date;
  occupation: string;
  sourceOfLead: string;
  preferredContactMethod: string;
  notes: string;
  textPreferred: boolean;
  otherContacts: ICustomerOtherContact[];
  relationships: string[];
  updatedAt: Date;
  createdAt: Date;
}

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
