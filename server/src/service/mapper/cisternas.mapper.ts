import { Cisternas } from '../../domain/cisternas.entity';
import { CisternasDTO } from '../dto/cisternas.dto';

/**
 * A Cisternas mapper object.
 */
export class CisternasMapper {
    static fromDTOtoEntity(entityDTO: CisternasDTO): Cisternas {
        if (!entityDTO) {
            return;
        }
        let entity = new Cisternas();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: Cisternas): CisternasDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new CisternasDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
