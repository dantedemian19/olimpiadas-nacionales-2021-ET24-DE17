import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { FrascosDeFermentosDTO } from '../service/dto/frascos-de-fermentos.dto';
import { FrascosDeFermentosMapper } from '../service/mapper/frascos-de-fermentos.mapper';
import { FrascosDeFermentosRepository } from '../repository/frascos-de-fermentos.repository';

const relationshipNames = [];
relationshipNames.push('tipo');

@Injectable()
export class FrascosDeFermentosService {
    logger = new Logger('FrascosDeFermentosService');

    constructor(
        @InjectRepository(FrascosDeFermentosRepository)
        private frascosDeFermentosRepository: FrascosDeFermentosRepository,
    ) {}

    async findById(id: number): Promise<FrascosDeFermentosDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.frascosDeFermentosRepository.findOne(id, options);
        return FrascosDeFermentosMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<FrascosDeFermentosDTO>): Promise<FrascosDeFermentosDTO | undefined> {
        const result = await this.frascosDeFermentosRepository.findOne(options);
        return FrascosDeFermentosMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<FrascosDeFermentosDTO>): Promise<[FrascosDeFermentosDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.frascosDeFermentosRepository.findAndCount(options);
        const frascosDeFermentosDTO: FrascosDeFermentosDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach((frascosDeFermentos) =>
                frascosDeFermentosDTO.push(FrascosDeFermentosMapper.fromEntityToDTO(frascosDeFermentos)),
            );
            resultList[0] = frascosDeFermentosDTO;
        }
        return resultList;
    }

    async save(
        frascosDeFermentosDTO: FrascosDeFermentosDTO,
        creator?: string,
    ): Promise<FrascosDeFermentosDTO | undefined> {
        const entity = FrascosDeFermentosMapper.fromDTOtoEntity(frascosDeFermentosDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.frascosDeFermentosRepository.save(entity);
        return FrascosDeFermentosMapper.fromEntityToDTO(result);
    }

    async update(
        frascosDeFermentosDTO: FrascosDeFermentosDTO,
        updater?: string,
    ): Promise<FrascosDeFermentosDTO | undefined> {
        const entity = FrascosDeFermentosMapper.fromDTOtoEntity(frascosDeFermentosDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.frascosDeFermentosRepository.save(entity);
        return FrascosDeFermentosMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.frascosDeFermentosRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
