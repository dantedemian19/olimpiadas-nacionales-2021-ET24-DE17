/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { TandaQuesos } from './tanda-quesos.entity';

/**
 * A SalidasDeAlmacen.
 */
@Entity('salidas_de_almacen')
export class SalidasDeAlmacen extends BaseEntity {
    @Column({ type: 'long', name: 'peso' })
    peso: number;

    @ManyToOne((type) => TandaQuesos)
    tandaDeQueso: TandaQuesos;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
