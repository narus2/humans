import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CreatePeopleDto } from './dto/people.dto';
import { People, PeopleDocument } from './schemas/peopole.shema';
import { join } from 'path';

import { MailerService } from '@nestjs-modules/mailer';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class PeopleService {

    constructor(@InjectModel(People.name) 
        private peopleModel: Model<PeopleDocument>,
        private readonly mailerService: MailerService,
        private eventEmitter: EventEmitter2,
        ) { }


    @OnEvent('*.*', { async: true })
    handleOrderCreatedEvent(payload: String) {
        console.log("all");
        console.log("eee", payload)
        // handle and process "OrderCreatedEvent" event
    }
    

    async getAll(): Promise<People[]> {
        return this.peopleModel.find().exec();
    }

    async create(peopleDto: CreatePeopleDto): Promise<People> {

        const createdPeople = new this.peopleModel(peopleDto);
        createdPeople.set("_id", createdPeople.name.concat(createdPeople.surname));
        this.eventEmitter.emit('people.created',{to_user: true, ...peopleDto});
        this.eventEmitter.emit('people.created',{to_user: false, ...peopleDto});
        return new People; //createdPeople.save();
    }
}
