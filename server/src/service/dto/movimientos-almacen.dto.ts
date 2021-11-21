/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { TandaQuesosDTO } from './tanda-quesos.dto';
import { EstadoQuesos } from '../../domain/enumeration/estado-quesos';

import { UserDTO } from './user.dto';

/**
 * A MovimientosAlmacenDTO object.
 */
export class MovimientosAlmacenDTO extends BaseDTO {
    @IsNotEmpty()
    @ApiModelProperty({ enum: EstadoQuesos, description: 'desde enum field' })
    desde: EstadoQuesos;

    @IsNotEmpty()
    @ApiModelProperty({ enum: EstadoQuesos, description: 'hacia enum field' })
    hacia: EstadoQuesos;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'peso field' })
    peso: number;

    @ApiModelProperty({ type: TandaQuesosDTO, description: 'queso relationship' })
    queso: TandaQuesosDTO;

    @ApiModelProperty({ type: UserDTO, description: 'user relationship' })
    user: UserDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
