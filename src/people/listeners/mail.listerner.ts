import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { join } from 'path';
import { CreatePeopleDto } from '../dto/people.dto';
import { MailerService } from '@nestjs-modules/mailer';



@Injectable()
export class MailCreatedListener {

  constructor(private readonly mailerService: MailerService) { }

  @OnEvent('people.created', { async: true })
  async handlePeopleCreatedEvent(user: CreatePeopleDto) {
    console.log("send.mail");
    let to_user = false;
    const mail= {
      to: user.email,
      subject: 'Register',
      template: "",
      context: {...user},
      attachments: [
        {   // encoded string as an attachment
          filename: 'passport.png',
          content: user.image_pasport,
          encoding: 'base64',
          cid: 'passport'
        },
        {   // encoded string as an attachment
          filename: 'registration.png',
          content: user.image_registration,
          encoding: 'base64',
          cid: 'registration'
        },
      ]
      }
       
  if(!to_user){
      mail.to = process.env.EMAIL_ID;
      mail.template = join(__dirname, '/mail/templates',  'email_to_the_district.hbs')
  }else{
      mail.template = join(__dirname, '/mail/templates',  'email_to_the_user.hbs')
  }
  
  console.log(mail);
 // Отправка почты
  let r = await this.mailerService
    .sendMail(mail)
    .catch((e) => {
      throw new HttpException(
        `Ошибка работы почты: ${JSON.stringify(e)}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    });
    console.log(r);
    return r;  
  }
  
  @OnEvent('*.*', { async: true })
  handleEverything(payload: any) {
    console.log("all event");  
    // handle and process an event
    console.log(payload);
  }
}