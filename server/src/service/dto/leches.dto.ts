/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { CisternasDTO } from './cisternas.dto';

/**
 * A LechesDTO object.
 */
export class LechesDTO extends BaseDTO {
    @IsNotEmpty()
    @ApiProperty({ description: 'analisis field' })
    analisis: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'calidad field' })
    calidad: number;

    @IsNotEmpty()
    @ApiProperty({ description: 'cantidad field' })
    cantidad: number;

    @IsNotEmpty()
    @ApiProperty({ description: 'fechaDeIngreso field' })
    fechaDeIngreso: any;

    @IsNotEmpty()
    @ApiProperty({ description: 'tambo field' })
    tambo: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'temperatura field' })
    temperatura: number;

    @ApiProperty({ type: CisternasDTO, description: 'cisterna relationship' })
    cisterna: CisternasDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
