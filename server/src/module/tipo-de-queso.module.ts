import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoDeQuesoController } from '../web/rest/tipo-de-queso.controller';
import { TipoDeQuesoRepository } from '../repository/tipo-de-queso.repository';
import { TipoDeQuesoService } from '../service/tipo-de-queso.service';

@Module({
    imports: [TypeOrmModule.forFeature([TipoDeQuesoRepository])],
    controllers: [TipoDeQuesoController],
    providers: [TipoDeQuesoService],
    exports: [TipoDeQuesoService],
})
export class TipoDeQuesoModule {}
