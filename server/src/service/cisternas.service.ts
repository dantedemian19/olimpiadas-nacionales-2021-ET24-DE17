import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { CisternasDTO } from '../service/dto/cisternas.dto';
import { CisternasMapper } from '../service/mapper/cisternas.mapper';
import { CisternasRepository } from '../repository/cisternas.repository';

const relationshipNames = [];

@Injectable()
export class CisternasService {
    logger = new Logger('CisternasService');

    constructor(@InjectRepository(CisternasRepository) private cisternasRepository: CisternasRepository) {}

    async findById(id: number): Promise<CisternasDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.cisternasRepository.findOne(id, options);
        return CisternasMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<CisternasDTO>): Promise<CisternasDTO | undefined> {
        const result = await this.cisternasRepository.findOne(options);
        return CisternasMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<CisternasDTO>): Promise<[CisternasDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.cisternasRepository.findAndCount(options);
        const cisternasDTO: CisternasDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach((cisternas) => cisternasDTO.push(CisternasMapper.fromEntityToDTO(cisternas)));
            resultList[0] = cisternasDTO;
        }
        return resultList;
    }

    async save(cisternasDTO: CisternasDTO, creator?: string): Promise<CisternasDTO | undefined> {
        const entity = CisternasMapper.fromDTOtoEntity(cisternasDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.cisternasRepository.save(entity);
        return CisternasMapper.fromEntityToDTO(result);
    }

    async update(cisternasDTO: CisternasDTO, updater?: string): Promise<CisternasDTO | undefined> {
        const entity = CisternasMapper.fromDTOtoEntity(cisternasDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.cisternasRepository.save(entity);
        return CisternasMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.cisternasRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
