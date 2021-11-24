import dayjs from 'dayjs';
import { ICisternas } from 'app/shared/model/cisternas.model';

export interface ILeches {
  id?: number;
  analisis?: string;
  calidad?: number;
  cantidad?: number;
  fechaDeIngreso?: string;
  tambo?: string;
  temperatura?: number;
  cisterna?: ICisternas | null;
}

export const defaultValue: Readonly<ILeches> = {};
