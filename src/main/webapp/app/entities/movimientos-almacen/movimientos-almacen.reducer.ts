import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IMovimientosAlmacen, defaultValue } from 'app/shared/model/movimientos-almacen.model';

export const ACTION_TYPES = {
  FETCH_MOVIMIENTOSALMACEN_LIST: 'movimientosAlmacen/FETCH_MOVIMIENTOSALMACEN_LIST',
  FETCH_MOVIMIENTOSALMACEN: 'movimientosAlmacen/FETCH_MOVIMIENTOSALMACEN',
  CREATE_MOVIMIENTOSALMACEN: 'movimientosAlmacen/CREATE_MOVIMIENTOSALMACEN',
  UPDATE_MOVIMIENTOSALMACEN: 'movimientosAlmacen/UPDATE_MOVIMIENTOSALMACEN',
  PARTIAL_UPDATE_MOVIMIENTOSALMACEN: 'movimientosAlmacen/PARTIAL_UPDATE_MOVIMIENTOSALMACEN',
  DELETE_MOVIMIENTOSALMACEN: 'movimientosAlmacen/DELETE_MOVIMIENTOSALMACEN',
  RESET: 'movimientosAlmacen/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMovimientosAlmacen>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type MovimientosAlmacenState = Readonly<typeof initialState>;

// Reducer

export default (state: MovimientosAlmacenState = initialState, action): MovimientosAlmacenState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MOVIMIENTOSALMACEN_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MOVIMIENTOSALMACEN):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_MOVIMIENTOSALMACEN):
    case REQUEST(ACTION_TYPES.UPDATE_MOVIMIENTOSALMACEN):
    case REQUEST(ACTION_TYPES.DELETE_MOVIMIENTOSALMACEN):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_MOVIMIENTOSALMACEN):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_MOVIMIENTOSALMACEN_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MOVIMIENTOSALMACEN):
    case FAILURE(ACTION_TYPES.CREATE_MOVIMIENTOSALMACEN):
    case FAILURE(ACTION_TYPES.UPDATE_MOVIMIENTOSALMACEN):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_MOVIMIENTOSALMACEN):
    case FAILURE(ACTION_TYPES.DELETE_MOVIMIENTOSALMACEN):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_MOVIMIENTOSALMACEN_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_MOVIMIENTOSALMACEN):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_MOVIMIENTOSALMACEN):
    case SUCCESS(ACTION_TYPES.UPDATE_MOVIMIENTOSALMACEN):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_MOVIMIENTOSALMACEN):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_MOVIMIENTOSALMACEN):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/movimientos-almacens';

// Actions

export const getEntities: ICrudGetAllAction<IMovimientosAlmacen> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_MOVIMIENTOSALMACEN_LIST,
    payload: axios.get<IMovimientosAlmacen>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IMovimientosAlmacen> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MOVIMIENTOSALMACEN,
    payload: axios.get<IMovimientosAlmacen>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IMovimientosAlmacen> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MOVIMIENTOSALMACEN,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IMovimientosAlmacen> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MOVIMIENTOSALMACEN,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IMovimientosAlmacen> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_MOVIMIENTOSALMACEN,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMovimientosAlmacen> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MOVIMIENTOSALMACEN,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
