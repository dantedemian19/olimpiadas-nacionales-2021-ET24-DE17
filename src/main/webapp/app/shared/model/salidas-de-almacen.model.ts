import { ITandaQuesos } from 'app/shared/model/tanda-quesos.model';

export interface ISalidasDeAlmacen {
  id?: number;
  peso?: number;
  tandaDeQueso?: ITandaQuesos | null;
}

export const defaultValue: Readonly<ISalidasDeAlmacen> = {};
