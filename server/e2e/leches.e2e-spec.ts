import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { LechesDTO } from '../src/service/dto/leches.dto';
import { LechesService } from '../src/service/leches.service';

describe('Leches Controller', () => {
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
            .overrideProvider(LechesService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all leches ', async () => {
        const getEntities: LechesDTO[] = (await request(app.getHttpServer()).get('/api/leches').expect(200)).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET leches by id', async () => {
        const getEntity: LechesDTO = (
            await request(app.getHttpServer())
                .get('/api/leches/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create leches', async () => {
        const createdEntity: LechesDTO = (
            await request(app.getHttpServer()).post('/api/leches').send(entityMock).expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update leches', async () => {
        const updatedEntity: LechesDTO = (
            await request(app.getHttpServer()).put('/api/leches').send(entityMock).expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update leches from id', async () => {
        const updatedEntity: LechesDTO = (
            await request(app.getHttpServer())
                .put('/api/leches/' + entityMock.id)
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE leches', async () => {
        const deletedEntity: LechesDTO = (
            await request(app.getHttpServer())
                .delete('/api/leches/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});
