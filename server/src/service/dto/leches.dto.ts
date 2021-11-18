/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { CisternasDTO } from './cisternas.dto';

/**
 * A LechesDTO object.
 */
export class LechesDTO extends BaseDTO {
    @ApiModelProperty({ description: 'analisis field' })
    analisis: any;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'calidad field' })
    calidad: number;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'cantidad field' })
    cantidad: number;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'fechaDeIngreso field' })
    fechaDeIngreso: any;

    @ApiModelProperty({ type: CisternasDTO, description: 'cisterna relationship' })
    cisterna: CisternasDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
