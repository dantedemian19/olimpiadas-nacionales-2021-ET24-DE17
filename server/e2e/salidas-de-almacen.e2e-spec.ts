import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { SalidasDeAlmacenDTO } from '../src/service/dto/salidas-de-almacen.dto';
import { SalidasDeAlmacenService } from '../src/service/salidas-de-almacen.service';

describe('SalidasDeAlmacen Controller', () => {
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
            .overrideProvider(SalidasDeAlmacenService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all salidas-de-almacens ', async () => {
        const getEntities: SalidasDeAlmacenDTO[] = (
            await request(app.getHttpServer()).get('/api/salidas-de-almacens').expect(200)
        ).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET salidas-de-almacens by id', async () => {
        const getEntity: SalidasDeAlmacenDTO = (
            await request(app.getHttpServer())
                .get('/api/salidas-de-almacens/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create salidas-de-almacens', async () => {
        const createdEntity: SalidasDeAlmacenDTO = (
            await request(app.getHttpServer()).post('/api/salidas-de-almacens').send(entityMock).expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update salidas-de-almacens', async () => {
        const updatedEntity: SalidasDeAlmacenDTO = (
            await request(app.getHttpServer()).put('/api/salidas-de-almacens').send(entityMock).expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update salidas-de-almacens from id', async () => {
        const updatedEntity: SalidasDeAlmacenDTO = (
            await request(app.getHttpServer())
                .put('/api/salidas-de-almacens/' + entityMock.id)
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE salidas-de-almacens', async () => {
        const deletedEntity: SalidasDeAlmacenDTO = (
            await request(app.getHttpServer())
                .delete('/api/salidas-de-almacens/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});
