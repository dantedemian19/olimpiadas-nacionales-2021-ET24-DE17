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
import { TipoDeQuesoDTO } from '../../service/dto/tipo-de-queso.dto';
import { TipoDeQuesoService } from '../../service/tipo-de-queso.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/tipo-de-quesos')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiTags('tipo-de-quesos')
export class TipoDeQuesoController {
    logger = new Logger('TipoDeQuesoController');

    constructor(private readonly tipoDeQuesoService: TipoDeQuesoService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: TipoDeQuesoDTO,
    })
    async getAll(@Req() req: Request): Promise<TipoDeQuesoDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.tipoDeQuesoService.findAndCount({
            skip: +pageRequest.page * pageRequest.size,
            take: +pageRequest.size,
            order: pageRequest.sort.asOrder(),
        });
        HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
        return results;
    }

    @Get('/:id')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: TipoDeQuesoDTO,
    })
    async getOne(@Param('id') id: number): Promise<TipoDeQuesoDTO> {
        return await this.tipoDeQuesoService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ summary: 'Create tipoDeQueso' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: TipoDeQuesoDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() tipoDeQuesoDTO: TipoDeQuesoDTO): Promise<TipoDeQuesoDTO> {
        const created = await this.tipoDeQuesoService.save(tipoDeQuesoDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'TipoDeQueso', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ summary: 'Update tipoDeQueso' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: TipoDeQuesoDTO,
    })
    async put(@Req() req: Request, @Body() tipoDeQuesoDTO: TipoDeQuesoDTO): Promise<TipoDeQuesoDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'TipoDeQueso', tipoDeQuesoDTO.id);
        return await this.tipoDeQuesoService.update(tipoDeQuesoDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ summary: 'Update tipoDeQueso with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: TipoDeQuesoDTO,
    })
    async putId(@Req() req: Request, @Body() tipoDeQuesoDTO: TipoDeQuesoDTO): Promise<TipoDeQuesoDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'TipoDeQueso', tipoDeQuesoDTO.id);
        return await this.tipoDeQuesoService.update(tipoDeQuesoDTO, req.user?.login);
    }   

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ summary: 'Delete tipoDeQueso' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'TipoDeQueso', id);
        return await this.tipoDeQuesoService.deleteById(id);
    }
}
