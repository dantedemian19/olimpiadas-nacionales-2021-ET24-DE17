/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { EstadoCisterna } from '../../domain/enumeration/estado-cisterna';

/**
 * A CisternasDTO object.
 */
export class CisternasDTO extends BaseDTO {
    @IsNotEmpty()
    @ApiModelProperty({ description: 'capacidad field' })
    capacidad: number;

    @ApiModelProperty({ enum: EstadoCisterna, description: 'estado enum field', required: false })
    estado: EstadoCisterna;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'reserva field' })
    reserva: number;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
