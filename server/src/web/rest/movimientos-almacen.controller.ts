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
import { MovimientosAlmacenDTO } from '../../service/dto/movimientos-almacen.dto';
import { MovimientosAlmacenService } from '../../service/movimientos-almacen.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/movimientos-almacens')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiTags('movimientos-almacens')
export class MovimientosAlmacenController {
    logger = new Logger('MovimientosAlmacenController');

    constructor(private readonly movimientosAlmacenService: MovimientosAlmacenService) {}

    @Get('/')
    @Roles(RoleType.ADMIN, RoleType.PRODUCTION)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: MovimientosAlmacenDTO,
    })
    async getAll(@Req() req: Request): Promise<MovimientosAlmacenDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.movimientosAlmacenService.findAndCount({
            skip: +pageRequest.page * pageRequest.size,
            take: +pageRequest.size,
            order: pageRequest.sort.asOrder(),
        });
        HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
        return results;
    }

    @Get('/:id')
    @Roles(RoleType.ADMIN, RoleType.PRODUCTION)
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: MovimientosAlmacenDTO,
    })
    async getOne(@Param('id') id: number): Promise<MovimientosAlmacenDTO> {
        return await this.movimientosAlmacenService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ summary: 'Create movimientosAlmacen' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: MovimientosAlmacenDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(
        @Req() req: Request,
        @Body() movimientosAlmacenDTO: MovimientosAlmacenDTO,
    ): Promise<MovimientosAlmacenDTO> {
        const created = await this.movimientosAlmacenService.save(movimientosAlmacenDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'MovimientosAlmacen', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ summary: 'Update movimientosAlmacen' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: MovimientosAlmacenDTO,
    })
    async put(
        @Req() req: Request,
        @Body() movimientosAlmacenDTO: MovimientosAlmacenDTO,
    ): Promise<MovimientosAlmacenDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'MovimientosAlmacen', movimientosAlmacenDTO.id);
        return await this.movimientosAlmacenService.update(movimientosAlmacenDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ summary: 'Update movimientosAlmacen with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: MovimientosAlmacenDTO,
    })
    async putId(
        @Req() req: Request,
        @Body() movimientosAlmacenDTO: MovimientosAlmacenDTO,
    ): Promise<MovimientosAlmacenDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'MovimientosAlmacen', movimientosAlmacenDTO.id);
        return await this.movimientosAlmacenService.update(movimientosAlmacenDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ summary: 'Delete movimientosAlmacen' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'MovimientosAlmacen', id);
        return await this.movimientosAlmacenService.deleteById(id);
    }
}
