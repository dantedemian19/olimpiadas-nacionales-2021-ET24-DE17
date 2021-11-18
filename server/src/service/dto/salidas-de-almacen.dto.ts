/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { TandaQuesosDTO } from './tanda-quesos.dto';

/**
 * A SalidasDeAlmacenDTO object.
 */
export class SalidasDeAlmacenDTO extends BaseDTO {
    @IsNotEmpty()
    @ApiModelProperty({ description: 'peso field' })
    peso: number;

    @ApiModelProperty({ type: TandaQuesosDTO, description: 'tandaDeQueso relationship' })
    tandaDeQueso: TandaQuesosDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
