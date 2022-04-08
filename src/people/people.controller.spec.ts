import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CreatePeopleDto } from './dto/people.dto';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { mockPeople } from './schemas/people.mok';
import { People, PeopleSchema } from './schemas/peopole.shema';


describe('PeopleController', () => {
  let controller: PeopleController;
  let service: PeopleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeopleController],
      providers: [
        {
          provide: PeopleService,
          useValue: {
            getAll: jest.fn().mockResolvedValue([mockPeople
            ]),
            create: jest.fn().mockResolvedValue(CreatePeopleDto),
          },
        },
      ],
    }).compile();

    controller = module.get<PeopleController>(PeopleController);
    service = module.get<PeopleService>(PeopleService);  
  });

  it('controller be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('should create a new cat', async () => {
      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(new People);

      await controller.create(new CreatePeopleDto);
      expect(createSpy).toHaveBeenCalledWith(new  CreatePeopleDto);
    });
  });

  describe('findAll()', () => {
    it('should return an array of People', async () => {
      expect(controller.getAll()).resolves.toEqual([mockPeople]);
      expect(service.getAll).toHaveBeenCalled();
    });
  });

  
});
