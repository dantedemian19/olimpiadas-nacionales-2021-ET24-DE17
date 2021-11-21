import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { EstadoQuesos } from '../../domain/enumeration/estado-quesos';

/**
 * A TandaQuesosChangebyIdDTO object.
 */
 export class TandaQuesoChangeByIdDTO extends BaseDTO {
    @ApiProperty({ enum: EstadoQuesos, description: 'estado enum field', required: false })
    estado: EstadoQuesos;

    @ApiProperty({ description: 'peso field' })
    peso: number;

    @ApiProperty({ description: 'fechaEntradaCuracion field', required: false })
    fechaEntradaCuracion: any;

    @ApiProperty({ description: 'fechaSalidaCuracion field', required: false })
    fechaSalidaCuracion: any;
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}