import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class AppService {
  getHello(): string {
    
    return 'Hello World!';
  }
  @OnEvent('**')
  handleEverything(payload: any) {
    // handle and process an event
    console.log("ev", payload);
  }
}
