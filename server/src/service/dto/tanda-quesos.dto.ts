/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { LechesDTO } from './leches.dto';
import { FrascosDeFermentosDTO } from './frascos-de-fermentos.dto';
import { TipoDeQuesoDTO } from './tipo-de-queso.dto';
import { EstadoQuesos } from '../../domain/enumeration/estado-quesos';

/**
 * A TandaQuesosDTO object.
 */
export class TandaQuesosDTO extends BaseDTO {
    @ApiProperty({ enum: EstadoQuesos, description: 'estado enum field', required: false })
    estado: EstadoQuesos;

    @IsNotEmpty()
    @ApiProperty({ description: 'peso field' })
    peso: number;

    @IsNotEmpty()
    @ApiProperty({ description: 'pesoInicial field' })
    pesoInicial: number;

    @ApiProperty({ description: 'fechaEntradaCuracion field', required: false })
    fechaEntradaCuracion: any;

    @ApiProperty({ description: 'fechaSalidaCuracion field', required: false })
    fechaSalidaCuracion: any;

    @ApiProperty({ type: LechesDTO, description: 'leche relationship' })
    leche: LechesDTO;

    @ApiProperty({ type: FrascosDeFermentosDTO, description: 'fermento relationship' })
    fermento: FrascosDeFermentosDTO;

    @ApiProperty({ type: TipoDeQuesoDTO, description: 'tipo relationship' })
    tipo: TipoDeQuesoDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
