import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CisternasController } from '../web/rest/cisternas.controller';
import { CisternasRepository } from '../repository/cisternas.repository';
import { CisternasService } from '../service/cisternas.service';

@Module({
    imports: [TypeOrmModule.forFeature([CisternasRepository])],
    controllers: [CisternasController],
    providers: [CisternasService],
    exports: [CisternasService],
})
export class CisternasModule {}
