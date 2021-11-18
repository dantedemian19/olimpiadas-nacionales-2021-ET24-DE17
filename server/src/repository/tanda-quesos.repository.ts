import { EntityRepository, Repository } from 'typeorm';
import { TandaQuesos } from '../domain/tanda-quesos.entity';

@EntityRepository(TandaQuesos)
export class TandaQuesosRepository extends Repository<TandaQuesos> {}
