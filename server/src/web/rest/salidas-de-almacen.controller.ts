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
import { SalidasDeAlmacenDTO } from '../../service/dto/salidas-de-almacen.dto';
import { SalidasDeAlmacenService } from '../../service/salidas-de-almacen.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/salidas-de-almacens')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiTags('salidas-de-almacens')
export class SalidasDeAlmacenController {
    logger = new Logger('SalidasDeAlmacenController');

    constructor(private readonly salidasDeAlmacenService: SalidasDeAlmacenService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: SalidasDeAlmacenDTO,
    })
    async getAll(@Req() req: Request): Promise<SalidasDeAlmacenDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.salidasDeAlmacenService.findAndCount({
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
        type: SalidasDeAlmacenDTO,
    })
    async getOne(@Param('id') id: number): Promise<SalidasDeAlmacenDTO> {
        return await this.salidasDeAlmacenService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create salidasDeAlmacen' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: SalidasDeAlmacenDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() salidasDeAlmacenDTO: SalidasDeAlmacenDTO): Promise<SalidasDeAlmacenDTO> {
        const created = await this.salidasDeAlmacenService.save(salidasDeAlmacenDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'SalidasDeAlmacen', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update salidasDeAlmacen' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: SalidasDeAlmacenDTO,
    })
    async put(@Req() req: Request, @Body() salidasDeAlmacenDTO: SalidasDeAlmacenDTO): Promise<SalidasDeAlmacenDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'SalidasDeAlmacen', salidasDeAlmacenDTO.id);
        return await this.salidasDeAlmacenService.update(salidasDeAlmacenDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update salidasDeAlmacen with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: SalidasDeAlmacenDTO,
    })
    async putId(@Req() req: Request, @Body() salidasDeAlmacenDTO: SalidasDeAlmacenDTO): Promise<SalidasDeAlmacenDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'SalidasDeAlmacen', salidasDeAlmacenDTO.id);
        return await this.salidasDeAlmacenService.update(salidasDeAlmacenDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete salidasDeAlmacen' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'SalidasDeAlmacen', id);
        return await this.salidasDeAlmacenService.deleteById(id);
    }
}
