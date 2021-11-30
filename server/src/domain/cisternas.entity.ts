/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { EstadoCisterna } from './enumeration/estado-cisterna';

/**
 * A Cisternas.
 */
@Entity('cisternas')
export class Cisternas extends BaseEntity {
    @Column({ type: 'integer', name: 'capacidad' })
    capacidad: number;

    @Column({ type: 'simple-enum', name: 'estado', enum: EstadoCisterna })
    estado: EstadoCisterna;

    @Column({ type: 'integer', name: 'reserva', nullable: true })
    reserva: number;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
