import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LechesController } from '../web/rest/leches.controller';
import { LechesRepository } from '../repository/leches.repository';
import { LechesService } from '../service/leches.service';

@Module({
    imports: [TypeOrmModule.forFeature([LechesRepository])],
    controllers: [LechesController],
    providers: [LechesService],
    exports: [LechesService],
})
export class LechesModule {}
