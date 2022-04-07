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
  martial_status: boolean //married, divorced etc.
  
  @Prop()
  email: string // email adress with validation
  
  @Prop()
  phone: string //  for example +4917679890866, or +380966100289
  
  @Prop()
  registration_address: string // Street Nr., ZIP, City
  
  @Prop()
  district:string // Innenstadt, Rodenkirchen, Lindenthal, Ehrenfeld, Nippes, Chorweiler, Porz, Kalk,
  
  @Prop()
  job_offer_existent: boolean
  
  @Prop()
  general_work_permit_required: boolean
}

export const PeopleSchema = SchemaFactory.createForClass(People);