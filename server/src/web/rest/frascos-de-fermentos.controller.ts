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
import { FrascosDeFermentosDTO } from '../../service/dto/frascos-de-fermentos.dto';
import { FrascosDeFermentosService } from '../../service/frascos-de-fermentos.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/frascos-de-fermentos')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiTags('frascos-de-fermentos')
export class FrascosDeFermentosController {
    logger = new Logger('FrascosDeFermentosController');

    constructor(private readonly frascosDeFermentosService: FrascosDeFermentosService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: FrascosDeFermentosDTO,
    })
    async getAll(@Req() req: Request): Promise<FrascosDeFermentosDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.frascosDeFermentosService.findAndCount({
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
        type: FrascosDeFermentosDTO,
    })
    async getOne(@Param('id') id: number): Promise<FrascosDeFermentosDTO> {
        return await this.frascosDeFermentosService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create frascosDeFermentos' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: FrascosDeFermentosDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(
        @Req() req: Request,
        @Body() frascosDeFermentosDTO: FrascosDeFermentosDTO,
    ): Promise<FrascosDeFermentosDTO> {
        const created = await this.frascosDeFermentosService.save(frascosDeFermentosDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'FrascosDeFermentos', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update frascosDeFermentos' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: FrascosDeFermentosDTO,
    })
    async put(
        @Req() req: Request,
        @Body() frascosDeFermentosDTO: FrascosDeFermentosDTO,
    ): Promise<FrascosDeFermentosDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'FrascosDeFermentos', frascosDeFermentosDTO.id);
        return await this.frascosDeFermentosService.update(frascosDeFermentosDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update frascosDeFermentos with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: FrascosDeFermentosDTO,
    })
    async putId(
        @Req() req: Request,
        @Body() frascosDeFermentosDTO: FrascosDeFermentosDTO,
    ): Promise<FrascosDeFermentosDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'FrascosDeFermentos', frascosDeFermentosDTO.id);
        return await this.frascosDeFermentosService.update(frascosDeFermentosDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete frascosDeFermentos' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'FrascosDeFermentos', id);
        return await this.frascosDeFermentosService.deleteById(id);
    }
}
