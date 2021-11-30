import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LechesController } from '../web/rest/leches.controller';
import { LechesRepository } from '../repository/leches.repository';
import { LechesService } from '../service/leches.service';
import { TandaQuesosModule } from '../module/tanda-quesos.module';
import { CisternasModule } from '../module/cisternas.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([LechesRepository]),
        TandaQuesosModule,
        CisternasModule
    ],
    controllers: [LechesController],
    providers: [LechesService],
    exports: [LechesService],
})
export class LechesModule {}
