import dayjs from 'dayjs';
import { ILeches } from 'app/shared/model/leches.model';
import { IFrascosDeFermentos } from 'app/shared/model/frascos-de-fermentos.model';
import { ITipoDeQueso } from 'app/shared/model/tipo-de-queso.model';
import { EstadoQuesos } from 'app/shared/model/enumerations/estado-quesos.model';

export interface ITandaQuesos {
  id?: number;
  estado?: EstadoQuesos | null;
  peso?: number;
  pesoInicial?: number;
  fechaEntradaCuracion?: string | null;
  fechaSalidaCuracion?: string | null;
  leche?: ILeches | null;
  fermento?: IFrascosDeFermentos | null;
  tipo?: ITipoDeQueso | null;
}

export const defaultValue: Readonly<ITandaQuesos> = {};
