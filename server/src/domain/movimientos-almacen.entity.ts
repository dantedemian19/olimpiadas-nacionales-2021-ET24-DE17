/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { TandaQuesos } from './tanda-quesos.entity';
import { EstadoQuesos } from './enumeration/estado-quesos';

import { User } from './user.entity';

/**
 * A MovimientosAlmacen.
 */
@Entity('movimientos_almacen')
export class MovimientosAlmacen extends BaseEntity {
    @Column({ type: 'simple-enum', name: 'desde', enum: EstadoQuesos })
    desde: EstadoQuesos;

    @Column({ type: 'simple-enum', name: 'hacia', enum: EstadoQuesos })
    hacia: EstadoQuesos;

    @Column({ type: 'integer', name: 'peso' })
    peso: number;

    @ManyToOne((type) => TandaQuesos)
    queso: TandaQuesos;

    @ManyToOne((type) => User)
    user: User;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
