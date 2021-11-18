import { EntityRepository, Repository } from 'typeorm';
import { SalidasDeAlmacen } from '../domain/salidas-de-almacen.entity';

@EntityRepository(SalidasDeAlmacen)
export class SalidasDeAlmacenRepository extends Repository<SalidasDeAlmacen> {}
