import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { TandaQuesosDTO } from '../src/service/dto/tanda-quesos.dto';
import { TandaQuesosService } from '../src/service/tanda-quesos.service';

describe('TandaQuesos Controller', () => {
    let app: INestApplication;

    const authGuardMock = { canActivate: (): any => true };
    const rolesGuardMock = { canActivate: (): any => true };
    const entityMock: any = {
        id: 'entityId',
    };

    const serviceMock = {
        findById: (): any => entityMock,
        findAndCount: (): any => [entityMock, 0],
        save: (): any => entityMock,
        update: (): any => entityMock,
        deleteById: (): any => entityMock,
    };

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideGuard(AuthGuard)
            .useValue(authGuardMock)
            .overrideGuard(RolesGuard)
            .useValue(rolesGuardMock)
            .overrideProvider(TandaQuesosService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all tanda-quesos ', async () => {
        const getEntities: TandaQuesosDTO[] = (await request(app.getHttpServer()).get('/api/tanda-quesos').expect(200))
            .body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET tanda-quesos by id', async () => {
        const getEntity: TandaQuesosDTO = (
            await request(app.getHttpServer())
                .get('/api/tanda-quesos/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create tanda-quesos', async () => {
        const createdEntity: TandaQuesosDTO = (
            await request(app.getHttpServer()).post('/api/tanda-quesos').send(entityMock).expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update tanda-quesos', async () => {
        const updatedEntity: TandaQuesosDTO = (
            await request(app.getHttpServer()).put('/api/tanda-quesos').send(entityMock).expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update tanda-quesos from id', async () => {
        const updatedEntity: TandaQuesosDTO = (
            await request(app.getHttpServer())
                .put('/api/tanda-quesos/' + entityMock.id)
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE tanda-quesos', async () => {
        const deletedEntity: TandaQuesosDTO = (
            await request(app.getHttpServer())
                .delete('/api/tanda-quesos/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});
