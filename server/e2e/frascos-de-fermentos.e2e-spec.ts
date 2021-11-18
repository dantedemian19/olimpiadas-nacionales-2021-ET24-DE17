import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { FrascosDeFermentosDTO } from '../src/service/dto/frascos-de-fermentos.dto';
import { FrascosDeFermentosService } from '../src/service/frascos-de-fermentos.service';

describe('FrascosDeFermentos Controller', () => {
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
            .overrideProvider(FrascosDeFermentosService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all frascos-de-fermentos ', async () => {
        const getEntities: FrascosDeFermentosDTO[] = (
            await request(app.getHttpServer()).get('/api/frascos-de-fermentos').expect(200)
        ).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET frascos-de-fermentos by id', async () => {
        const getEntity: FrascosDeFermentosDTO = (
            await request(app.getHttpServer())
                .get('/api/frascos-de-fermentos/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create frascos-de-fermentos', async () => {
        const createdEntity: FrascosDeFermentosDTO = (
            await request(app.getHttpServer()).post('/api/frascos-de-fermentos').send(entityMock).expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update frascos-de-fermentos', async () => {
        const updatedEntity: FrascosDeFermentosDTO = (
            await request(app.getHttpServer()).put('/api/frascos-de-fermentos').send(entityMock).expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update frascos-de-fermentos from id', async () => {
        const updatedEntity: FrascosDeFermentosDTO = (
            await request(app.getHttpServer())
                .put('/api/frascos-de-fermentos/' + entityMock.id)
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE frascos-de-fermentos', async () => {
        const deletedEntity: FrascosDeFermentosDTO = (
            await request(app.getHttpServer())
                .delete('/api/frascos-de-fermentos/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});
