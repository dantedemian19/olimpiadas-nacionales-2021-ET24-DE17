/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { TipoDeQuesoDTO } from './tipo-de-queso.dto';
import { EstadoFermentos } from '../../domain/enumeration/estado-fermentos';

/**
 * A FrascosDeFermentosDTO object.
 */
export class FrascosDeFermentosDTO extends BaseDTO {
    @IsNotEmpty()
    @ApiProperty({ description: 'calidad field' })
    calidad: number;

    @IsNotEmpty()
    @ApiProperty({ description: 'fechaAnalisis field' })
    fechaAnalisis: any;

    @ApiProperty({ enum: EstadoFermentos, description: 'estado enum field', required: false })
    estado: EstadoFermentos;

    @ApiProperty({ description: 'detalles field', required: false })
    detalles: string;

    @ApiProperty({ description: 'peso field', required: false })
    peso: number;

    @ApiProperty({ type: TipoDeQuesoDTO, description: 'tipo relationship' })
    tipo: TipoDeQuesoDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
