/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { TipoDeQuesoDTO } from './tipo-de-queso.dto';
import { EstadoFermentos } from '../../domain/enumeration/estado-fermentos';

/**
 * A FrascosDeFermentosDTO object.
 */
export class FrascosDeFermentosDTO extends BaseDTO {
    @IsNotEmpty()
    @ApiModelProperty({ description: 'calidad field' })
    calidad: number;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'fechaAnalisis field' })
    fechaAnalisis: any;

    @ApiModelProperty({ enum: EstadoFermentos, description: 'estado enum field', required: false })
    estado: EstadoFermentos;

    @ApiModelProperty({ description: 'detalles field', required: false })
    detalles: any;

    @ApiModelProperty({ description: 'peso field', required: false })
    peso: number;

    @ApiModelProperty({ type: TipoDeQuesoDTO, description: 'tipo relationship' })
    tipo: TipoDeQuesoDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
