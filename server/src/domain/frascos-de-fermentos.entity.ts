/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { TipoDeQueso } from './tipo-de-queso.entity';
import { EstadoFermentos } from './enumeration/estado-fermentos';

/**
 * A FrascosDeFermentos.
 */
@Entity('frascos_de_fermentos')
export class FrascosDeFermentos extends BaseEntity {
    @Column({ type: 'integer', name: 'calidad' })
    calidad: number;

    @Column({ type: 'datetime', name: 'fecha_analisis' })
    fechaAnalisis: any;

    @Column({ type: 'simple-enum', name: 'estado', enum: EstadoFermentos })
    estado: EstadoFermentos;

    @Column({ type: 'long', name: 'peso', nullable: true })
    peso: number;

    @ManyToOne((type) => TipoDeQueso)
    tipo: TipoDeQueso;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
