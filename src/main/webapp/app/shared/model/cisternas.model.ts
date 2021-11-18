import { EstadoCisterna } from 'app/shared/model/enumerations/estado-cisterna.model';

export interface ICisternas {
  id?: number;
  capacidad?: number;
  estado?: EstadoCisterna | null;
  reserva?: number;
}

export const defaultValue: Readonly<ICisternas> = {};
