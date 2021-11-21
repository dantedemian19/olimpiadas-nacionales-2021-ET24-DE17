import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { MovimientosAlmacenDTO } from '../service/dto/movimientos-almacen.dto';
import { MovimientosAlmacenMapper } from '../service/mapper/movimientos-almacen.mapper';
import { MovimientosAlmacenRepository } from '../repository/movimientos-almacen.repository';

const relationshipNames = [];
relationshipNames.push('queso');
relationshipNames.push('user');

@Injectable()
export class MovimientosAlmacenService {
    logger = new Logger('MovimientosAlmacenService');

    constructor(
        @InjectRepository(MovimientosAlmacenRepository)
        private movimientosAlmacenRepository: MovimientosAlmacenRepository,
    ) {}

    async findById(id: number): Promise<MovimientosAlmacenDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.movimientosAlmacenRepository.findOne(id, options);
        return MovimientosAlmacenMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<MovimientosAlmacenDTO>): Promise<MovimientosAlmacenDTO | undefined> {
        const result = await this.movimientosAlmacenRepository.findOne(options);
        return MovimientosAlmacenMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<MovimientosAlmacenDTO>): Promise<[MovimientosAlmacenDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.movimientosAlmacenRepository.findAndCount(options);
        const movimientosAlmacenDTO: MovimientosAlmacenDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach((movimientosAlmacen) =>
                movimientosAlmacenDTO.push(MovimientosAlmacenMapper.fromEntityToDTO(movimientosAlmacen)),
            );
            resultList[0] = movimientosAlmacenDTO;
        }
        return resultList;
    }

    async save(
        movimientosAlmacenDTO: MovimientosAlmacenDTO,
        creator?: string,
    ): Promise<MovimientosAlmacenDTO | undefined> {
        const entity = MovimientosAlmacenMapper.fromDTOtoEntity(movimientosAlmacenDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.movimientosAlmacenRepository.save(entity);
        return MovimientosAlmacenMapper.fromEntityToDTO(result);
    }

    async update(
        movimientosAlmacenDTO: MovimientosAlmacenDTO,
        updater?: string,
    ): Promise<MovimientosAlmacenDTO | undefined> {
        const entity = MovimientosAlmacenMapper.fromDTOtoEntity(movimientosAlmacenDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.movimientosAlmacenRepository.save(entity);
        return MovimientosAlmacenMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.movimientosAlmacenRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
