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
import { ApiBearerAuth, ApiTags,ApiResponse, ApiOperation } from '@nestjs/swagger';
import { TandaQuesosDTO } from '../../service/dto/tanda-quesos.dto';
import { TandaQuesosService } from '../../service/tanda-quesos.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/tanda-quesos')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiTags('tanda-quesos')
export class TandaQuesosController {
    logger = new Logger('TandaQuesosController');

    constructor(private readonly tandaQuesosService: TandaQuesosService) {}

    @Get('/')
    @Roles(RoleType.USER)
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
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: TandaQuesosDTO,
    })
    async getOne(@Param('id') id: number): Promise<TandaQuesosDTO> {
        return await this.tandaQuesosService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ summary: ' Create tandaQuesos' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: TandaQuesosDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() tandaQuesosDTO: TandaQuesosDTO): Promise<TandaQuesosDTO> {
        const created = await this.tandaQuesosService.save(tandaQuesosDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'TandaQuesos', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ summary: ' Update tandaQuesos' })
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
    @Roles(RoleType.ADMIN)
    @ApiOperation({ summary: ' Update tandaQuesos with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: TandaQuesosDTO,
    })
    async putId(@Req() req: Request, @Body() tandaQuesosDTO: TandaQuesosDTO): Promise<TandaQuesosDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'TandaQuesos', tandaQuesosDTO.id);
        return await this.tandaQuesosService.update(tandaQuesosDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ summary: ' Delete tandaQuesos' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'TandaQuesos', id);
        return await this.tandaQuesosService.deleteById(id);
    }
}

