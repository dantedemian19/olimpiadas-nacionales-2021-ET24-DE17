import { EntityRepository, Repository } from 'typeorm';
import { TipoDeQueso } from '../domain/tipo-de-queso.entity';

@EntityRepository(TipoDeQueso)
export class TipoDeQuesoRepository extends Repository<TipoDeQueso> {}
