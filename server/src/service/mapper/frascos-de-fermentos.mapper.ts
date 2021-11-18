import { FrascosDeFermentos } from '../../domain/frascos-de-fermentos.entity';
import { FrascosDeFermentosDTO } from '../dto/frascos-de-fermentos.dto';

/**
 * A FrascosDeFermentos mapper object.
 */
export class FrascosDeFermentosMapper {
    static fromDTOtoEntity(entityDTO: FrascosDeFermentosDTO): FrascosDeFermentos {
        if (!entityDTO) {
            return;
        }
        let entity = new FrascosDeFermentos();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: FrascosDeFermentos): FrascosDeFermentosDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new FrascosDeFermentosDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
