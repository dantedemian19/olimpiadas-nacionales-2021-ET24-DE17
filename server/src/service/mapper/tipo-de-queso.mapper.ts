import { TipoDeQueso } from '../../domain/tipo-de-queso.entity';
import { TipoDeQuesoDTO } from '../dto/tipo-de-queso.dto';

/**
 * A TipoDeQueso mapper object.
 */
export class TipoDeQuesoMapper {
    static fromDTOtoEntity(entityDTO: TipoDeQuesoDTO): TipoDeQueso {
        if (!entityDTO) {
            return;
        }
        let entity = new TipoDeQueso();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: TipoDeQueso): TipoDeQuesoDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new TipoDeQuesoDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
