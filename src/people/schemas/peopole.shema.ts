import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type PeopleDocument = People & Document;

@Schema()
export class People {
  @Prop()
  _id: string;

  @Prop()
  name: string;

  @Prop()
  surname: string

  @Prop()
  birthdate: Date
  
  @Prop({
    type: String,
    enum: ['National', 'Biometric', 'Regular'],
  } )
  passport_type: String 
  
  @Prop()
  arrival_date: Date
  
  @Prop()
  body_height: Number
  
  @Prop({
    type: String,
    enum: ['red', 'green', 'blue', 'brown', 'mixed'],
  } )
  eye_color:string
  
  @Prop({
    type: String,
    enum: ['city', 'region', 'oblast', 'country'],
  })
  birth_place: string
  
  @Prop()
  martial_status: boolean 
  
  @Prop()
  email: string 
  
  @Prop()
  phone: string 
  
  @Prop()
  registration_address: string 
  
  @Prop()
  district:string 
  
  @Prop()
  job_offer_existent: boolean
  
  @Prop()
  general_work_permit_required: boolean
  
  @Prop()
  image_pasport: string
  
  @Prop()
  image_registration: string

}

export const PeopleSchema = SchemaFactory.createForClass(People);