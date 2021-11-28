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
import { CisternasDTO } from '../../service/dto/cisternas.dto';
import { CisternasService } from '../../service/cisternas.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/cisternas')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@Roles(RoleType.ADMIN)
@ApiTags('cisternas')
export class CisternasController {
    logger = new Logger('CisternasController');

    constructor(private readonly cisternasService: CisternasService) {}

    @Get('/')
    @Roles(RoleType.RECEPTIONIST)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: CisternasDTO,
    })
    async getAll(@Req() req: Request): Promise<CisternasDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.cisternasService.findAndCount({
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
        type: CisternasDTO,
    })
    async getOne(@Param('id') id: number): Promise<CisternasDTO> {
        return await this.cisternasService.findById(id);
    }

    @PostMethod('/')
    @ApiOperation({ summary: 'Create cisternas' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: CisternasDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() cisternasDTO: CisternasDTO): Promise<CisternasDTO> {
        const created = await this.cisternasService.save(cisternasDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Cisternas', created.id);
        return created;
    }

    @Put('/')
    @ApiOperation({ summary: 'Update cisternas' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: CisternasDTO,
    })
    async put(@Req() req: Request, @Body() cisternasDTO: CisternasDTO): Promise<CisternasDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Cisternas', cisternasDTO.id);
        return await this.cisternasService.update(cisternasDTO, req.user?.login);
    }

    @Put('/:id')
    @ApiOperation({ summary: 'Update cisternas with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: CisternasDTO,
    })
    async putId(@Req() req: Request, @Body() cisternasDTO: CisternasDTO): Promise<CisternasDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Cisternas', cisternasDTO.id);
        return await this.cisternasService.update(cisternasDTO, req.user?.login);
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete cisternas' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'Cisternas', id);
        return await this.cisternasService.deleteById(id);
    }
}
