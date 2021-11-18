import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FrascosDeFermentosController } from '../web/rest/frascos-de-fermentos.controller';
import { FrascosDeFermentosRepository } from '../repository/frascos-de-fermentos.repository';
import { FrascosDeFermentosService } from '../service/frascos-de-fermentos.service';

@Module({
    imports: [TypeOrmModule.forFeature([FrascosDeFermentosRepository])],
    controllers: [FrascosDeFermentosController],
    providers: [FrascosDeFermentosService],
    exports: [FrascosDeFermentosService],
})
export class FrascosDeFermentosModule {}
