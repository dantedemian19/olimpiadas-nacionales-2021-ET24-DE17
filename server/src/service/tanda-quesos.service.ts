import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { TandaQuesosDTO } from '../service/dto/tanda-quesos.dto';
import { TandaQuesosMapper } from '../service/mapper/tanda-quesos.mapper';
import { TandaQuesosRepository } from '../repository/tanda-quesos.repository';

const relationshipNames = [];
relationshipNames.push('leche');
relationshipNames.push('tipo');

@Injectable()
export class TandaQuesosService {
    logger = new Logger('TandaQuesosService');

    constructor(@InjectRepository(TandaQuesosRepository) private tandaQuesosRepository: TandaQuesosRepository) {}

    async findById(id: number): Promise<TandaQuesosDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.tandaQuesosRepository.findOne(id, options);
        return TandaQuesosMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<TandaQuesosDTO>): Promise<TandaQuesosDTO | undefined> {
        const result = await this.tandaQuesosRepository.findOne(options);
        return TandaQuesosMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<TandaQuesosDTO>): Promise<[TandaQuesosDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.tandaQuesosRepository.findAndCount(options);
        const tandaQuesosDTO: TandaQuesosDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach((tandaQuesos) => tandaQuesosDTO.push(TandaQuesosMapper.fromEntityToDTO(tandaQuesos)));
            resultList[0] = tandaQuesosDTO;
        }
        return resultList;
    }

    async save(tandaQuesosDTO: TandaQuesosDTO, creator?: string): Promise<TandaQuesosDTO | undefined> {
        const entity = TandaQuesosMapper.fromDTOtoEntity(tandaQuesosDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.tandaQuesosRepository.save(entity);
        return TandaQuesosMapper.fromEntityToDTO(result);
    }

    async update(tandaQuesosDTO: TandaQuesosDTO, updater?: string): Promise<TandaQuesosDTO | undefined> {
        const entity = TandaQuesosMapper.fromDTOtoEntity(tandaQuesosDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.tandaQuesosRepository.save(entity);
        return TandaQuesosMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.tandaQuesosRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
