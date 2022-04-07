import { IsBoolean, IsDate, IsDateString, IsEmail, IsEnum, IsNumber, IsPhoneNumber, IsString } from "class-validator"

export class CreatePeopleDto {
   @IsString()
   name: string
   @IsString()
   surname: string
   @IsDateString()
   birthdate: Date
   @IsEnum([ 'National', 'Biometric', 'Regular' ])
   passport_type: String 
   @IsDateString()
   arrival_date: Date
   @IsNumber()
   body_height: Number
   @IsEnum(['red', 'green', 'blue', 'brown', 'mixed' ])
   eye_color:string 
   @IsEnum(['city', 'region', 'oblast', 'country'])
   birth_place: string 
   martial_status: boolean //married, divorced etc.
   @IsEmail()
   email: string // email adress with validation
   @IsPhoneNumber()
   phone: string //  for example +4917679890866, or +380966100289
   @IsString()
   registration_address: string // Street Nr., ZIP, City
   @IsString()
   district:string // Innenstadt, Rodenkirchen, Lindenthal, Ehrenfeld, Nippes, Chorweiler, Porz, Kalk,
   @IsBoolean()
   job_offer_existent: boolean
   @IsBoolean()
   general_work_permit_required: boolean
}