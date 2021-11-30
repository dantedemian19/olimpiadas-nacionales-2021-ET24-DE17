import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    Post as PostMethod,
    Put,
    UseGuards,
    Req,
    UseInterceptors,
    BadRequestException
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { LechesDTO } from '../../service/dto/leches.dto';
import { LechesService } from '../../service/leches.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

import { CisternasService } from '../../service/cisternas.service';
@Controller('api/leches')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@Roles(RoleType.RECEPTIONIST, RoleType.ADMIN)
@ApiTags('leches')
export class LechesController {
    logger = new Logger('LechesController');

    constructor(
        private readonly lechesService: LechesService,
        private readonly cisternasService: CisternasService
    ) {}

    @Get('/')
    @Roles(RoleType.PRODUCTION)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: LechesDTO,
    })
    async getAll(@Req() req: Request): Promise<LechesDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.lechesService.findAndCount({
            skip: +pageRequest.page * pageRequest.size,
            take: +pageRequest.size,
            order: pageRequest.sort.asOrder(),
        });
        HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
        return results;
    }

    @Get('/:id')
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: LechesDTO,
    })
    async getOne(@Param('id') id: number): Promise<LechesDTO> {
        return await this.lechesService.findById(id);
    }

    @PostMethod('/')
    @ApiOperation({ summary: 'Create leches' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: LechesDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: 400, description: 'Se alcanzo el limite de capacidad de la cisterna'})
    async post(@Req() req: Request, @Body() lechesDTO: LechesDTO): Promise<LechesDTO> {

        if ( ! lechesDTO.cisterna ) {
            req.res.status(400);
            throw new BadRequestException("No se asignó una cisterna");
        }

        // Create leche
        const created = await this.lechesService.save(lechesDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Leches', created.id);
        return created;
    }

    @Put('/')
    @ApiOperation({ summary: 'Update leches' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: LechesDTO,
    })
    async put(@Req() req: Request, @Body() lechesDTO: LechesDTO): Promise<LechesDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Leches', lechesDTO.id);
        return await this.lechesService.update(lechesDTO, req.user?.login);
    }

    @Put('/:id')
    @ApiOperation({ summary: 'Update leches with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: LechesDTO,
    })
    async putId(@Req() req: Request, @Body() lechesDTO: LechesDTO): Promise<LechesDTO> {

        // Get info from leches and cisterna
        let current_leches = await this.lechesService.findById(lechesDTO.id);
        let leche_cant_diff = current_leches.cantidad - lechesDTO.cantidad;

        // Check cisterna capacity
        if( lechesDTO.cisterna.reserva - leche_cant_diff > lechesDTO.cisterna.capacidad ) {
            req.res.status(400);
            throw new BadRequestException("Se alcanzo el limite de capacidad de la cisterna");
        }
        if( lechesDTO.cisterna.reserva - leche_cant_diff < 0 ) {
            req.res.status(400);
            throw new BadRequestException("La reserva de la cisterna no puede ser un número negativo");
        }

        // Update cisterna reserva
        lechesDTO.cisterna.reserva -= leche_cant_diff;
        await this.cisternasService.update(lechesDTO.cisterna, req.user?.login);

        HeaderUtil.addEntityCreatedHeaders(req.res, 'Leches', lechesDTO.id);
        return await this.lechesService.update(lechesDTO, req.user?.login);
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete leches' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {

        // Update cisterna reserva
        const lecheDTO = await this.lechesService.findById(id);
        if (lecheDTO.cisterna){
            lecheDTO.cisterna.reserva = lecheDTO.cisterna.reserva - lecheDTO.cantidad;
            await this.cisternasService.update(lecheDTO.cisterna, req.user?.login);
        }

        // Delete leche
        HeaderUtil.addEntityDeletedHeaders(req.res, 'Leches', id);
        return await this.lechesService.deleteById(id);
    }
}
