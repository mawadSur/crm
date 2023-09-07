import { Schema } from 'mongoose';
import { IQuery } from './common.interface.js';

import { FormatString, SchemaDefinitionProperty } from 'mongoose';

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
  services: string[];
  updatedAt: Date;
  createdAt: Date;
}

export enum ECustomerServiceType {
  Pending = 'Pending',
  InProgress = 'InProgress',
  Completed = 'Completed',
}

export interface ICustomerService extends Document {
  serviceTypeId: SchemaDefinitionProperty<string>;
  status: ECustomerServiceType;
  customerId: SchemaDefinitionProperty<string>;
}

export interface ICustomerActivity extends Document {
  activityId: SchemaDefinitionProperty<string>;
  customerId: SchemaDefinitionProperty<string>;
}

export interface ICustomerInsurance extends Document {
  policyType: string;
  policyNumber: string;
  expiryDate: Schema.Types.Date;
  customerId: SchemaDefinitionProperty<string>;
}
export interface ICustomerVehicle extends Document {
  customerId: SchemaDefinitionProperty<string>;
  make: string;
  model: string;
  year: string;
  equity: string;
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
