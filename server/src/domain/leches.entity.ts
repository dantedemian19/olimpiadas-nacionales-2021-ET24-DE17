/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Cisternas } from './cisternas.entity';

/**
 * A Leches.
 */
@Entity('leches')
export class Leches extends BaseEntity {
    @Column({ name: 'analisis' })
    analisis: string;

    @Column({ type: 'integer', name: 'calidad' })
    calidad: number;

    @Column({ type: 'integer', name: 'cantidad' })
    cantidad: number;

    @Column({ type: 'datetime', name: 'fecha_de_ingreso' })
    fechaDeIngreso: any;

    @Column({ name: 'tambo' })
    tambo: string;

    @Column({ type: 'integer', name: 'temperatura' })
    temperatura: number;

    @ManyToOne((type) => Cisternas)
    cisterna: Cisternas;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
