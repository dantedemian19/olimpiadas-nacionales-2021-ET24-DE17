import { TandaQuesos } from '../../domain/tanda-quesos.entity';
import { TandaQuesosDTO } from '../dto/tanda-quesos.dto';

/**
 * A TandaQuesos mapper object.
 */
export class TandaQuesosMapper {
    static fromDTOtoEntity(entityDTO: TandaQuesosDTO): TandaQuesos {
        if (!entityDTO) {
            return;
        }
        let entity = new TandaQuesos();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: TandaQuesos): TandaQuesosDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new TandaQuesosDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
