import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { LechesDTO } from '../service/dto/leches.dto';
import { LechesMapper } from '../service/mapper/leches.mapper';
import { LechesRepository } from '../repository/leches.repository';

const relationshipNames = [];
relationshipNames.push('cisterna');

@Injectable()
export class LechesService {
    logger = new Logger('LechesService');

    constructor(@InjectRepository(LechesRepository) private lechesRepository: LechesRepository) {}

    async findById(id: number): Promise<LechesDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.lechesRepository.findOne(id, options);
        return LechesMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<LechesDTO>): Promise<LechesDTO | undefined> {
        const result = await this.lechesRepository.findOne(options);
        return LechesMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<LechesDTO>): Promise<[LechesDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.lechesRepository.findAndCount(options);
        const lechesDTO: LechesDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach((leches) => lechesDTO.push(LechesMapper.fromEntityToDTO(leches)));
            resultList[0] = lechesDTO;
        }
        return resultList;
    }

    async save(lechesDTO: LechesDTO, creator?: string): Promise<LechesDTO | undefined> {
        const entity = LechesMapper.fromDTOtoEntity(lechesDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.lechesRepository.save(entity);
        return LechesMapper.fromEntityToDTO(result);
    }

    async update(lechesDTO: LechesDTO, updater?: string): Promise<LechesDTO | undefined> {
        const entity = LechesMapper.fromDTOtoEntity(lechesDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.lechesRepository.save(entity);
        return LechesMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.lechesRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
