import { EntityRepository, Repository } from 'typeorm';
import { FrascosDeFermentos } from '../domain/frascos-de-fermentos.entity';

@EntityRepository(FrascosDeFermentos)
export class FrascosDeFermentosRepository extends Repository<FrascosDeFermentos> {}
