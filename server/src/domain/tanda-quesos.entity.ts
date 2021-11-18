/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Leches } from './leches.entity';
import { TipoDeQueso } from './tipo-de-queso.entity';
import { EstadoQuesos } from './enumeration/estado-quesos';

/**
 * A TandaQuesos.
 */
@Entity('tanda_quesos')
export class TandaQuesos extends BaseEntity {
    @Column({ type: 'simple-enum', name: 'estado', enum: EstadoQuesos })
    estado: EstadoQuesos;

    @Column({ type: 'long', name: 'peso' })
    peso: number;

    @Column({ type: 'long', name: 'peso_inicial' })
    pesoInicial: number;

    @Column({ type: 'datetime', name: 'fecha_entrada_curacion', nullable: true })
    fechaEntradaCuracion: any;

    @Column({ type: 'datetime', name: 'fecha_salida_curacion', nullable: true })
    fechaSalidaCuracion: any;

    @ManyToOne((type) => Leches)
    leche: Leches;

    @ManyToOne((type) => TipoDeQueso)
    tipo: TipoDeQueso;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
