import { FormatString, model, Schema } from 'mongoose'
import fs from 'fs';


const ageRange: number[] = Array.from({ length: 83 }, (_, index) => index + 18);

export interface Person {
  name: string
  age: number
  gender:string,
  address:string,
  phone:FormatString
}

export const PersonSchema = new Schema<Person>({
  name: { type: String, required: true },
  age: { type: Number,enum:ageRange, required: true },
  gender: { type: String, required: true },
  address: { type: String, required: true }, 
  phone: { type: String, required: true,validate: /^\d{10}$/  },

})

export const PersonModel = model<Person>('Person', PersonSchema)



const jsonFileContent = fs.readFileSync('cars.json', 'utf8');
const dropdownOptions = JSON.parse(jsonFileContent);


export interface Car {
  make: string
  model: string
  year: String
  mileage: number;
  location: string;
  pictures: string[];
  status: string;

}
  
export const CarSchema = new Schema<Car>({
  make: { type: String, enum: dropdownOptions.makeOptions, required: true },
  model: { type: String, enum: dropdownOptions.modelOptions, required: true },
  year: { type: String, enum: dropdownOptions.yearOptions, required: true, },
  mileage: { type: Number, required: true },
  location: { type: String,required: true },
  pictures: { type: [String], required: true },
  status: { type: String, enum: dropdownOptions.status,required: true },
});

export const CarModel = model<Car>('Car', CarSchema)