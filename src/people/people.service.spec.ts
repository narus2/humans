import { Module } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreatePeopleDto } from './dto/people.dto';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { People, PeopleDocument } from './schemas/peopole.shema';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { mockPeople } from './schemas/people.mok';

describe('PeopleService', () => {
  let service: PeopleService;
  let model: Model<People>;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PeopleService,
        {
          provide: getModelToken('People'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockPeople),
            constructor: jest.fn().mockResolvedValue(mockPeople),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
  }).compile();

    service = module.get<PeopleService>(PeopleService);
    
    model = module.get<Model<People>>(getModelToken('People'));

  });

  it('service be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all People', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce([mockPeople]),
    } as any);
    const cats = await service.getAll();
    expect(cats).toEqual([mockPeople]);
  });

  // it('should insert a new cat', async () => {
  //   jest.spyOn(model, 'create').mockImplementationOnce( () =>
  //     Promise.resolve(mockPeople),
  //   );
  //   const newPeople = await service.create(mockPeople);
  //   expect(newPeople).toEqual(mockPeople);
  // });


});
