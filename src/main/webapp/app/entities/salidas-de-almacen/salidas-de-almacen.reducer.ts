import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ISalidasDeAlmacen, defaultValue } from 'app/shared/model/salidas-de-almacen.model';

export const ACTION_TYPES = {
  FETCH_SALIDASDEALMACEN_LIST: 'salidasDeAlmacen/FETCH_SALIDASDEALMACEN_LIST',
  FETCH_SALIDASDEALMACEN: 'salidasDeAlmacen/FETCH_SALIDASDEALMACEN',
  CREATE_SALIDASDEALMACEN: 'salidasDeAlmacen/CREATE_SALIDASDEALMACEN',
  UPDATE_SALIDASDEALMACEN: 'salidasDeAlmacen/UPDATE_SALIDASDEALMACEN',
  PARTIAL_UPDATE_SALIDASDEALMACEN: 'salidasDeAlmacen/PARTIAL_UPDATE_SALIDASDEALMACEN',
  DELETE_SALIDASDEALMACEN: 'salidasDeAlmacen/DELETE_SALIDASDEALMACEN',
  RESET: 'salidasDeAlmacen/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISalidasDeAlmacen>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type SalidasDeAlmacenState = Readonly<typeof initialState>;

// Reducer

export default (state: SalidasDeAlmacenState = initialState, action): SalidasDeAlmacenState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SALIDASDEALMACEN_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SALIDASDEALMACEN):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_SALIDASDEALMACEN):
    case REQUEST(ACTION_TYPES.UPDATE_SALIDASDEALMACEN):
    case REQUEST(ACTION_TYPES.DELETE_SALIDASDEALMACEN):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_SALIDASDEALMACEN):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_SALIDASDEALMACEN_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SALIDASDEALMACEN):
    case FAILURE(ACTION_TYPES.CREATE_SALIDASDEALMACEN):
    case FAILURE(ACTION_TYPES.UPDATE_SALIDASDEALMACEN):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_SALIDASDEALMACEN):
    case FAILURE(ACTION_TYPES.DELETE_SALIDASDEALMACEN):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_SALIDASDEALMACEN_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_SALIDASDEALMACEN):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_SALIDASDEALMACEN):
    case SUCCESS(ACTION_TYPES.UPDATE_SALIDASDEALMACEN):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_SALIDASDEALMACEN):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_SALIDASDEALMACEN):
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

const apiUrl = 'api/salidas-de-almacens';

// Actions

export const getEntities: ICrudGetAllAction<ISalidasDeAlmacen> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_SALIDASDEALMACEN_LIST,
    payload: axios.get<ISalidasDeAlmacen>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<ISalidasDeAlmacen> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SALIDASDEALMACEN,
    payload: axios.get<ISalidasDeAlmacen>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ISalidasDeAlmacen> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SALIDASDEALMACEN,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ISalidasDeAlmacen> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SALIDASDEALMACEN,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<ISalidasDeAlmacen> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_SALIDASDEALMACEN,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISalidasDeAlmacen> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SALIDASDEALMACEN,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
