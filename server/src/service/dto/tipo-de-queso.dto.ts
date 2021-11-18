/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

/**
 * A TipoDeQuesoDTO object.
 */
export class TipoDeQuesoDTO extends BaseDTO {
    @IsNotEmpty()
    @ApiProperty({ description: 'nombre field' })
    nombre: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'tiempoDeCurado field' })
    tiempoDeCurado: any;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
