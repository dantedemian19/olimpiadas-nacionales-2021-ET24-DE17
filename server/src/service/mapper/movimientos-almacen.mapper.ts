import { MovimientosAlmacen } from '../../domain/movimientos-almacen.entity';
import { MovimientosAlmacenDTO } from '../dto/movimientos-almacen.dto';

/**
 * A MovimientosAlmacen mapper object.
 */
export class MovimientosAlmacenMapper {
    static fromDTOtoEntity(entityDTO: MovimientosAlmacenDTO): MovimientosAlmacen {
        if (!entityDTO) {
            return;
        }
        let entity = new MovimientosAlmacen();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: MovimientosAlmacen): MovimientosAlmacenDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new MovimientosAlmacenDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
