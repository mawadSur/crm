import { model, Schema } from 'mongoose'

export interface Person {
  name: string
  age: number
}

export const PersonSchema = new Schema<Person>({
  name: { type: String, required: true },
  age: { type: Number, required: true }
})

export const PersonModel = model<Person>('Person', PersonSchema)


export interface Car {
    make: string
    model: string
    year: number
  }
  
  export const CarSchema = new Schema<Car>({
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true }
  })
  
  export const CarModel = model<Car>('Car', CarSchema)