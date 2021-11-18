import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { CisternasDTO } from '../src/service/dto/cisternas.dto';
import { CisternasService } from '../src/service/cisternas.service';

describe('Cisternas Controller', () => {
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
            .overrideProvider(CisternasService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all cisternas ', async () => {
        const getEntities: CisternasDTO[] = (await request(app.getHttpServer()).get('/api/cisternas').expect(200)).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET cisternas by id', async () => {
        const getEntity: CisternasDTO = (
            await request(app.getHttpServer())
                .get('/api/cisternas/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create cisternas', async () => {
        const createdEntity: CisternasDTO = (
            await request(app.getHttpServer()).post('/api/cisternas').send(entityMock).expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update cisternas', async () => {
        const updatedEntity: CisternasDTO = (
            await request(app.getHttpServer()).put('/api/cisternas').send(entityMock).expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update cisternas from id', async () => {
        const updatedEntity: CisternasDTO = (
            await request(app.getHttpServer())
                .put('/api/cisternas/' + entityMock.id)
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE cisternas', async () => {
        const deletedEntity: CisternasDTO = (
            await request(app.getHttpServer())
                .delete('/api/cisternas/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});
