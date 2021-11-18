import dayjs from 'dayjs';
import { ITipoDeQueso } from 'app/shared/model/tipo-de-queso.model';
import { EstadoFermentos } from 'app/shared/model/enumerations/estado-fermentos.model';

export interface IFrascosDeFermentos {
  id?: number;
  calidad?: number;
  fechaAnalisis?: string;
  estado?: EstadoFermentos | null;
  peso?: number | null;
  tipo?: ITipoDeQueso | null;
}

export const defaultValue: Readonly<IFrascosDeFermentos> = {};
