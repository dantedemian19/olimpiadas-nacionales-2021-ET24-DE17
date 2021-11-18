import { Leches } from '../../domain/leches.entity';
import { LechesDTO } from '../dto/leches.dto';

/**
 * A Leches mapper object.
 */
export class LechesMapper {
    static fromDTOtoEntity(entityDTO: LechesDTO): Leches {
        if (!entityDTO) {
            return;
        }
        let entity = new Leches();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: Leches): LechesDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new LechesDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
