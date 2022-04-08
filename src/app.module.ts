import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PeopleModule } from './people/people.module';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule, ConfigService  } from '@nestjs/config';

import { MongooseConfigService } from './config/mongoose-config-service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MailCreatedListener } from './people/listeners/mail.listerner';
import { MailModule } from './mail/mail.module';

import { MailerModule } from '@nestjs-modules/mailer';
import { getMailConfig } from './config/mail-config';


@Module({
  imports: [PeopleModule,
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({useClass: MongooseConfigService}),
    EventEmitterModule.forRoot(),
    MailModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMailConfig,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, MailCreatedListener]
})
export class AppModule {}
