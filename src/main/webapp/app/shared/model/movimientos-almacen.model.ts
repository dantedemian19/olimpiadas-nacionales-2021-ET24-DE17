import { ITandaQuesos } from 'app/shared/model/tanda-quesos.model';
import { IUser } from 'app/shared/model/user.model';
import { EstadoQuesos } from 'app/shared/model/enumerations/estado-quesos.model';

export interface IMovimientosAlmacen {
  id?: number;
  desde?: EstadoQuesos;
  hacia?: EstadoQuesos;
  peso?: number;
  queso?: ITandaQuesos | null;
  user?: IUser;
}

export const defaultValue: Readonly<IMovimientosAlmacen> = {};
