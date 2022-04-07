import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CreatePeopleDto } from '../dto/people.dto';

@Injectable()
export class MailCreatedListener {
  @OnEvent('people.created', { async: true })
  handlePeopleCreatedEvent(event: CreatePeopleDto) {

    console.log('event:');
    console.log(event);
  }

    @OnEvent('**')
    handleEverything(payload: any) {
    // handle and process an event
    console.log(payload);
    }
}