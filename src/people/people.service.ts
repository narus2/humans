import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CreatePeopleDto } from './dto/people.dto';
import { People, PeopleDocument } from './schemas/peopole.shema';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class PeopleService {

    constructor(@InjectModel(People.name) private peopleModel: Model<PeopleDocument>) { }


    async getAll(): Promise<People[]> {
        return this.peopleModel.find().exec();
    }

    async create(peopleDto: CreatePeopleDto): Promise<People> {

        const createdPeople = new this.peopleModel(peopleDto);
        createdPeople.set("_id", createdPeople.name.concat(createdPeople.surname));

        // const em = new EventEmitter2()
        // let r = em.emit('people.created', '')
        // console.log('send emit ', r)
        let r = this.peopleModel.emit('people.created', peopleDto);
        console.log('send emit21 ', r)

        return createdPeople.save();
    }

}
