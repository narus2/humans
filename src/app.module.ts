import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PeopleModule } from './people/people.module';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule } from '@nestjs/config';
import { MongooseConfigService } from './config/mongoose-config-service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MailCreatedListener } from './people/listeners/mail.listerner';

@Module({
  imports: [PeopleModule,
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({useClass: MongooseConfigService}),
    EventEmitterModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService, MailCreatedListener]
})
export class AppModule {}
