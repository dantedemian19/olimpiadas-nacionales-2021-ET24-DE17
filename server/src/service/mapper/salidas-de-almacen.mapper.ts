import { SalidasDeAlmacen } from '../../domain/salidas-de-almacen.entity';
import { SalidasDeAlmacenDTO } from '../dto/salidas-de-almacen.dto';

/**
 * A SalidasDeAlmacen mapper object.
 */
export class SalidasDeAlmacenMapper {
    static fromDTOtoEntity(entityDTO: SalidasDeAlmacenDTO): SalidasDeAlmacen {
        if (!entityDTO) {
            return;
        }
        let entity = new SalidasDeAlmacen();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: SalidasDeAlmacen): SalidasDeAlmacenDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new SalidasDeAlmacenDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
