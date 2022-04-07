import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import {CreatePeopleDto} from './dto/people.dto';
import { PeopleService } from './people.service';
import { People } from './schemas/peopole.shema';

@Controller('people')
export class PeopleController {
    
    constructor(private readonly peopleService: PeopleService) {
    }


    @Get()
    get():Promise<People[]>{
        return  this.peopleService.getAll()
    }

    @Post()
    create(@Body() createProductDto: CreatePeopleDto){
        return this.peopleService.create(createProductDto)
    }
}
