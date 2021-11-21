import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovimientosAlmacenController } from '../web/rest/movimientos-almacen.controller';
import { MovimientosAlmacenRepository } from '../repository/movimientos-almacen.repository';
import { MovimientosAlmacenService } from '../service/movimientos-almacen.service';

@Module({
    imports: [TypeOrmModule.forFeature([MovimientosAlmacenRepository])],
    controllers: [MovimientosAlmacenController],
    providers: [MovimientosAlmacenService],
    exports: [MovimientosAlmacenService],
})
export class MovimientosAlmacenModule {}
