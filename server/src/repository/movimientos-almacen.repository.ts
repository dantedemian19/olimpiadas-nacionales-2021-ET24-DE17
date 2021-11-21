import { EntityRepository, Repository } from 'typeorm';
import { MovimientosAlmacen } from '../domain/movimientos-almacen.entity';

@EntityRepository(MovimientosAlmacen)
export class MovimientosAlmacenRepository extends Repository<MovimientosAlmacen> {}
