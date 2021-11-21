import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { BaseDTO } from './base.dto';

/**
 * An Authority DTO object.
 */
export class AuthorityDTO extends BaseDTO {
    @ApiProperty({ uniqueItems: true, example: 'ROLE_EXAMPLE', description: 'User permissions' })
    @IsString()
    name: string;
}