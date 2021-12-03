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
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { TandaQuesosDTO } from '../../service/dto/tanda-quesos.dto';
import { TandaQuesosService } from '../../service/tanda-quesos.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { TandaQuesoChangeByIdDTO } from '../../service/dto/TandaQuesoChangeById.dto';
import { MovimientosAlmacenDTO } from '../../service/dto/movimientos-almacen.dto';
import { MovimientosAlmacenService } from '../../service/movimientos-almacen.service';

import { CisternasService } from '../../service/cisternas.service'
import { FrascosDeFermentosService } from '../../service/frascos-de-fermentos.service'

import { EstadoFermentos } from '../../domain/enumeration/estado-fermentos';

@Controller('api/tanda-quesos')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@Roles(RoleType.ADMIN, RoleType.PRODUCTION)
@ApiTags('tanda-quesos')
export class TandaQuesosController {
    logger = new Logger('TandaQuesosController');

    constructor(
        private readonly tandaQuesosService: TandaQuesosService,
        private readonly movimientosAlmacenService: MovimientosAlmacenService,
        private readonly cisternasService: CisternasService,
        private readonly frascosDeFermentosService: FrascosDeFermentosService,
    ) {}

    @Get('/')
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: TandaQuesosDTO,
    })
    async getAll(@Req() req: Request): Promise<TandaQuesosDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.tandaQuesosService.findAndCount({
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
        type: TandaQuesosDTO,
    })
    async getOne(@Param('id') id: number): Promise<TandaQuesosDTO> {
        return await this.tandaQuesosService.findById(id);
    }

    @PostMethod('/')
    @ApiOperation({ summary: 'Create tandaQuesos' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: TandaQuesosDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() tandaQuesosDTO: TandaQuesosDTO): Promise<TandaQuesosDTO> {

        tandaQuesosDTO.fermento.estado = EstadoFermentos.AGOTADO;
        await this.frascosDeFermentosService.update(tandaQuesosDTO.fermento, req.user?.login);

        tandaQuesosDTO.leche.cisterna.reserva = 0;
        await this.cisternasService.save(tandaQuesosDTO.leche.cisterna);

        const created = await this.tandaQuesosService.save(tandaQuesosDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'TandaQuesos', created.id);
        return created;
    }

    @Put('/')
    @ApiOperation({ summary: 'Update tandaQuesos' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: TandaQuesosDTO,
    })
    async put(@Req() req: Request, @Body() tandaQuesosDTO: TandaQuesosDTO): Promise<TandaQuesosDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'TandaQuesos', tandaQuesosDTO.id);
        return await this.tandaQuesosService.update(tandaQuesosDTO, req.user?.login);
    }

    @Put('/:id')
    @ApiOperation({ summary: 'Update tandaQuesos with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: TandaQuesosDTO,
    })
    async putId(@Req() req: Request, @Body() tandaQuesosDTO: TandaQuesosDTO): Promise<TandaQuesosDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Tanda Queso ID:', tandaQuesosDTO.id);
        let oldTandaQuesos = await this.tandaQuesosService.findById(tandaQuesosDTO.id);
        if(tandaQuesosDTO.estado == "ENCURADO" && oldTandaQuesos.estado == "ENSALADO"){
            tandaQuesosDTO.fechaEntradaCuracion = new Date();
        }
        if(tandaQuesosDTO.estado == "ENSTOCK" && (oldTandaQuesos.estado == "ENCURADO" || oldTandaQuesos.estado == "ENSALADO")){
            tandaQuesosDTO.fechaEntradaCuracion = new Date();
        }
        let registry = new MovimientosAlmacenDTO();
        registry.desde = oldTandaQuesos.estado;
        registry.hacia = tandaQuesosDTO.estado;
        registry.queso = oldTandaQuesos;
        registry.user = req.user;
        registry.peso = tandaQuesosDTO.peso;
        this.movimientosAlmacenService.save(registry, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'MovimientosAlmacen', registry.id);
        oldTandaQuesos.estado = tandaQuesosDTO.estado;
        return await this.tandaQuesosService.update(oldTandaQuesos, req.user?.login);
    }
    
    @Put('/:changeTandaQuesoEstado')
    @ApiOperation({ summary: 'Update tipoDeQueso.estado with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: TandaQuesosDTO,
    })
    async putIdforEstado(@Req() req: Request, @Body() tandaQuesosDTO: TandaQuesoChangeByIdDTO): Promise<TandaQuesosDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Tanda Queso ID:', tandaQuesosDTO.id);
        let oldTandaQuesos = await this.tandaQuesosService.findById(tandaQuesosDTO.id);
        if(tandaQuesosDTO.estado == "ENCURADO" && oldTandaQuesos.estado == "ENSALADO"){
            tandaQuesosDTO.fechaEntradaCuracion = new Date();
        }
        if(tandaQuesosDTO.estado == "ENSTOCK" && (oldTandaQuesos.estado == "ENCURADO" || oldTandaQuesos.estado == "ENSALADO")){
            tandaQuesosDTO.fechaEntradaCuracion = new Date();
        }
        let registry = new MovimientosAlmacenDTO();
        registry.desde = oldTandaQuesos.estado;
        registry.hacia = tandaQuesosDTO.estado;
        registry.queso = oldTandaQuesos;
        registry.user = req.user;
        registry.peso = tandaQuesosDTO.peso;
        this.movimientosAlmacenService.save(registry, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'MovimientosAlmacen', registry.id);
        oldTandaQuesos.estado = tandaQuesosDTO.estado;
        return await this.tandaQuesosService.update(oldTandaQuesos, req.user?.login);
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete tandaQuesos' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'TandaQuesos', id);
        return await this.tandaQuesosService.deleteById(id);
    }
}
