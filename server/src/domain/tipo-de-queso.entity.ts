/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A TipoDeQueso.
 */
@Entity('tipo_de_queso')
export class TipoDeQueso extends BaseEntity {
    @Column({ name: 'nombre' })
    nombre: string;

    @Column({ type: 'bigint',name: 'tiempo_de_curado' })
    tiempoDeCurado: any;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
