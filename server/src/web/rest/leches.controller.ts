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
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { LechesDTO } from '../../service/dto/leches.dto';
import { LechesService } from '../../service/leches.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/leches')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('leches')
export class LechesController {
    logger = new Logger('LechesController');

    constructor(private readonly lechesService: LechesService) {}

    @Get('/')
    @Roles(RoleType.USER)
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
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: LechesDTO,
    })
    async getOne(@Param('id') id: number): Promise<LechesDTO> {
        return await this.lechesService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create leches' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: LechesDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() lechesDTO: LechesDTO): Promise<LechesDTO> {
        const created = await this.lechesService.save(lechesDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Leches', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update leches' })
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
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update leches with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: LechesDTO,
    })
    async putId(@Req() req: Request, @Body() lechesDTO: LechesDTO): Promise<LechesDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Leches', lechesDTO.id);
        return await this.lechesService.update(lechesDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete leches' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'Leches', id);
        return await this.lechesService.deleteById(id);
    }
}
