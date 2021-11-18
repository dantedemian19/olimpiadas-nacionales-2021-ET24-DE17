import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalidasDeAlmacenController } from '../web/rest/salidas-de-almacen.controller';
import { SalidasDeAlmacenRepository } from '../repository/salidas-de-almacen.repository';
import { SalidasDeAlmacenService } from '../service/salidas-de-almacen.service';

@Module({
    imports: [TypeOrmModule.forFeature([SalidasDeAlmacenRepository])],
    controllers: [SalidasDeAlmacenController],
    providers: [SalidasDeAlmacenService],
    exports: [SalidasDeAlmacenService],
})
export class SalidasDeAlmacenModule {}
