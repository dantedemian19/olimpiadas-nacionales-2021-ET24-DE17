import { EntityRepository, Repository } from 'typeorm';
import { Leches } from '../domain/leches.entity';

@EntityRepository(Leches)
export class LechesRepository extends Repository<Leches> {}
