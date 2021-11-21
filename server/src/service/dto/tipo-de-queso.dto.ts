/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

/**
 * A TipoDeQuesoDTO object.
 */
export class TipoDeQuesoDTO extends BaseDTO {
    @IsNotEmpty()
    @ApiModelProperty({ description: 'nombre field' })
    nombre: string;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'tiempoDeCurado field' })
    tiempoDeCurado: number;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
