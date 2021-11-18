import { EntityRepository, Repository } from 'typeorm';
import { Cisternas } from '../domain/cisternas.entity';

@EntityRepository(Cisternas)
export class CisternasRepository extends Repository<Cisternas> {}
