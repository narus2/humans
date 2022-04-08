import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CreatePeopleDto } from './dto/people.dto';
import { People, PeopleDocument } from './schemas/peopole.shema';
import { join } from 'path';

import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class PeopleService {

    constructor(@InjectModel(People.name) 
        private peopleModel: Model<PeopleDocument>,
        private readonly mailerService: MailerService,
        ) { }


    async getAll(): Promise<People[]> {
        return this.peopleModel.find().exec();
    }

    async create(peopleDto: CreatePeopleDto): Promise<People> {

        const createdPeople = new this.peopleModel(peopleDto);
        createdPeople.set("_id", createdPeople.name.concat(createdPeople.surname));

        this.sendConfirmMail(peopleDto, true)
        this.sendConfirmMail(peopleDto, false)

        return createdPeople.save();
    }

    async sendConfirmMail(user: CreatePeopleDto, to_user: boolean) {
        const mail= {
            to: user.email,
            subject: 'Register',
            template: "",
            context: user
            }
             
        if(!to_user){
            mail.to = process.env.EMAIL_ID;
            mail.template = join(__dirname, '/mail/templates',  'email_to_the_district.hbs')
        }else{
            mail.template = join(__dirname, '/mail/templates',  'email_to_the_user.hbs')
        }
        
       // Отправка почты
        return await this.mailerService
          .sendMail(mail)
          .catch((e) => {
            throw new HttpException(
              `Ошибка работы почты: ${JSON.stringify(e)}`,
              HttpStatus.UNPROCESSABLE_ENTITY,
            );
          });
      }
}
