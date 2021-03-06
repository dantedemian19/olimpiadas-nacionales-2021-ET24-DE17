import { Injectable, HttpException, HttpStatus, Logger, Inject } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { LechesDTO } from '../service/dto/leches.dto';
import { LechesMapper } from '../service/mapper/leches.mapper';
import { LechesRepository } from '../repository/leches.repository';
import { CisternasService } from './cisternas.service';


const relationshipNames = [];
relationshipNames.push('cisterna');

@Injectable()
export class LechesService {
    logger = new Logger('LechesService');

    constructor(
        @InjectRepository(LechesRepository) private lechesRepository: LechesRepository,
        @Inject(CisternasService) private cisternasService: CisternasService,
    ) {}

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

    async save(lechesDTO: LechesDTO, creator?: string): Promise<LechesDTO | undefined>{
        let cisterna = await this.cisternasService.findById(lechesDTO.cisterna.id);
        if(cisterna){
        if(lechesDTO.cantidad>0){
        if(cisterna.reserva==0){
        if(cisterna.reserva+lechesDTO.cantidad<=cisterna.capacidad){
        if(cisterna.estado=='OPERATIVO'){
        
        const entity = LechesMapper.fromDTOtoEntity(lechesDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.lechesRepository.save(entity);
        cisterna.reserva += lechesDTO.cantidad;
        try {
            await this.cisternasService.update(cisterna);
        } catch (error) {
            throw new HttpException('Error, guardando los datos de la cisterna', HttpStatus.NOT_FOUND);
        }
        return LechesMapper.fromEntityToDTO(result);
        }else throw new HttpException('Error, la cisterna esta inoperativa', HttpStatus.NOT_ACCEPTABLE);
        }else throw new HttpException('Error, la capacidad de la cisterna no soporta tanto', HttpStatus.NOT_ACCEPTABLE);
        }else throw new HttpException('Error, la cisterna esta ocupada', HttpStatus.NOT_ACCEPTABLE);
        }else throw new HttpException('Error, la cantidad ingresada no puede ser negativa', HttpStatus.NOT_ACCEPTABLE);
        }else throw new HttpException('Error, la cisterna no existe', HttpStatus.NOT_ACCEPTABLE);
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
