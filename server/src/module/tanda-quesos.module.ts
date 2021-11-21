import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TandaQuesosController } from '../web/rest/tanda-quesos.controller';
import { TandaQuesosRepository } from '../repository/tanda-quesos.repository';
import { TandaQuesosService } from '../service/tanda-quesos.service';
import { MovimientosAlmacenModule } from './movimientos-almacen.module'

@Module({
    imports: [TypeOrmModule.forFeature([TandaQuesosRepository]), MovimientosAlmacenModule],
    controllers: [TandaQuesosController],
    providers: [TandaQuesosService],
    exports: [TandaQuesosService],
})
export class TandaQuesosModule {}
