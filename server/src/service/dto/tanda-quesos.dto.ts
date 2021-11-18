/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { LechesDTO } from './leches.dto';
import { TipoDeQuesoDTO } from './tipo-de-queso.dto';
import { EstadoQuesos } from '../../domain/enumeration/estado-quesos';

/**
 * A TandaQuesosDTO object.
 */
export class TandaQuesosDTO extends BaseDTO {
    @ApiModelProperty({ enum: EstadoQuesos, description: 'estado enum field', required: false })
    estado: EstadoQuesos;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'peso field' })
    peso: number;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'pesoInicial field' })
    pesoInicial: number;

    @ApiModelProperty({ description: 'fechaEntradaCuracion field', required: false })
    fechaEntradaCuracion: any;

    @ApiModelProperty({ description: 'fechaSalidaCuracion field', required: false })
    fechaSalidaCuracion: any;

    @ApiModelProperty({ type: LechesDTO, description: 'leche relationship' })
    leche: LechesDTO;

    @ApiModelProperty({ type: TipoDeQuesoDTO, description: 'tipo relationship' })
    tipo: TipoDeQuesoDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
