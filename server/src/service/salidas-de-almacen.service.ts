import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { SalidasDeAlmacenDTO } from '../service/dto/salidas-de-almacen.dto';
import { SalidasDeAlmacenMapper } from '../service/mapper/salidas-de-almacen.mapper';
import { SalidasDeAlmacenRepository } from '../repository/salidas-de-almacen.repository';

const relationshipNames = [];
relationshipNames.push('tandaDeQueso');

@Injectable()
export class SalidasDeAlmacenService {
    logger = new Logger('SalidasDeAlmacenService');

    constructor(
        @InjectRepository(SalidasDeAlmacenRepository) private salidasDeAlmacenRepository: SalidasDeAlmacenRepository,
    ) {}

    async findById(id: number): Promise<SalidasDeAlmacenDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.salidasDeAlmacenRepository.findOne(id, options);
        return SalidasDeAlmacenMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<SalidasDeAlmacenDTO>): Promise<SalidasDeAlmacenDTO | undefined> {
        const result = await this.salidasDeAlmacenRepository.findOne(options);
        return SalidasDeAlmacenMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<SalidasDeAlmacenDTO>): Promise<[SalidasDeAlmacenDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.salidasDeAlmacenRepository.findAndCount(options);
        const salidasDeAlmacenDTO: SalidasDeAlmacenDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach((salidasDeAlmacen) =>
                salidasDeAlmacenDTO.push(SalidasDeAlmacenMapper.fromEntityToDTO(salidasDeAlmacen)),
            );
            resultList[0] = salidasDeAlmacenDTO;
        }
        return resultList;
    }

    async save(salidasDeAlmacenDTO: SalidasDeAlmacenDTO, creator?: string): Promise<SalidasDeAlmacenDTO | undefined> {
        const entity = SalidasDeAlmacenMapper.fromDTOtoEntity(salidasDeAlmacenDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.salidasDeAlmacenRepository.save(entity);
        return SalidasDeAlmacenMapper.fromEntityToDTO(result);
    }

    async update(salidasDeAlmacenDTO: SalidasDeAlmacenDTO, updater?: string): Promise<SalidasDeAlmacenDTO | undefined> {
        const entity = SalidasDeAlmacenMapper.fromDTOtoEntity(salidasDeAlmacenDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.salidasDeAlmacenRepository.save(entity);
        return SalidasDeAlmacenMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.salidasDeAlmacenRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
