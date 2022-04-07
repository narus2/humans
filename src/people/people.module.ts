import { Module } from '@nestjs/common';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { MongooseModule } from '@nestjs/mongoose';
import { People, PeopleSchema } from './schemas/peopole.shema';
import { MailCreatedListener } from './listeners/mail.listerner';


@Module({
    controllers: [ PeopleController],
    providers: [ PeopleService, MailCreatedListener],
    imports:[
        MongooseModule.forFeature([ {name:People.name, schema:PeopleSchema } ])
    ]
})

export class PeopleModule {}
