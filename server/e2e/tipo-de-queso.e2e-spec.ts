import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { TipoDeQuesoDTO } from '../src/service/dto/tipo-de-queso.dto';
import { TipoDeQuesoService } from '../src/service/tipo-de-queso.service';

describe('TipoDeQueso Controller', () => {
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
            .overrideProvider(TipoDeQuesoService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all tipo-de-quesos ', async () => {
        const getEntities: TipoDeQuesoDTO[] = (
            await request(app.getHttpServer()).get('/api/tipo-de-quesos').expect(200)
        ).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET tipo-de-quesos by id', async () => {
        const getEntity: TipoDeQuesoDTO = (
            await request(app.getHttpServer())
                .get('/api/tipo-de-quesos/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create tipo-de-quesos', async () => {
        const createdEntity: TipoDeQuesoDTO = (
            await request(app.getHttpServer()).post('/api/tipo-de-quesos').send(entityMock).expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update tipo-de-quesos', async () => {
        const updatedEntity: TipoDeQuesoDTO = (
            await request(app.getHttpServer()).put('/api/tipo-de-quesos').send(entityMock).expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update tipo-de-quesos from id', async () => {
        const updatedEntity: TipoDeQuesoDTO = (
            await request(app.getHttpServer())
                .put('/api/tipo-de-quesos/' + entityMock.id)
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE tipo-de-quesos', async () => {
        const deletedEntity: TipoDeQuesoDTO = (
            await request(app.getHttpServer())
                .delete('/api/tipo-de-quesos/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});
