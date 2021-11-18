import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { TipoDeQuesoDTO } from '../service/dto/tipo-de-queso.dto';
import { TipoDeQuesoMapper } from '../service/mapper/tipo-de-queso.mapper';
import { TipoDeQuesoRepository } from '../repository/tipo-de-queso.repository';

const relationshipNames = [];

@Injectable()
export class TipoDeQuesoService {
    logger = new Logger('TipoDeQuesoService');

    constructor(@InjectRepository(TipoDeQuesoRepository) private tipoDeQuesoRepository: TipoDeQuesoRepository) {}

    async findById(id: number): Promise<TipoDeQuesoDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.tipoDeQuesoRepository.findOne(id, options);
        return TipoDeQuesoMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<TipoDeQuesoDTO>): Promise<TipoDeQuesoDTO | undefined> {
        const result = await this.tipoDeQuesoRepository.findOne(options);
        return TipoDeQuesoMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<TipoDeQuesoDTO>): Promise<[TipoDeQuesoDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.tipoDeQuesoRepository.findAndCount(options);
        const tipoDeQuesoDTO: TipoDeQuesoDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach((tipoDeQueso) => tipoDeQuesoDTO.push(TipoDeQuesoMapper.fromEntityToDTO(tipoDeQueso)));
            resultList[0] = tipoDeQuesoDTO;
        }
        return resultList;
    }

    async save(tipoDeQuesoDTO: TipoDeQuesoDTO, creator?: string): Promise<TipoDeQuesoDTO | undefined> {
        const entity = TipoDeQuesoMapper.fromDTOtoEntity(tipoDeQuesoDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.tipoDeQuesoRepository.save(entity);
        return TipoDeQuesoMapper.fromEntityToDTO(result);
    }

    async update(tipoDeQuesoDTO: TipoDeQuesoDTO, updater?: string): Promise<TipoDeQuesoDTO | undefined> {
        const entity = TipoDeQuesoMapper.fromDTOtoEntity(tipoDeQuesoDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.tipoDeQuesoRepository.save(entity);
        return TipoDeQuesoMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.tipoDeQuesoRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
