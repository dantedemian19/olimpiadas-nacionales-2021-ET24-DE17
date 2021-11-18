import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITipoDeQueso, defaultValue } from 'app/shared/model/tipo-de-queso.model';

export const ACTION_TYPES = {
  FETCH_TIPODEQUESO_LIST: 'tipoDeQueso/FETCH_TIPODEQUESO_LIST',
  FETCH_TIPODEQUESO: 'tipoDeQueso/FETCH_TIPODEQUESO',
  CREATE_TIPODEQUESO: 'tipoDeQueso/CREATE_TIPODEQUESO',
  UPDATE_TIPODEQUESO: 'tipoDeQueso/UPDATE_TIPODEQUESO',
  PARTIAL_UPDATE_TIPODEQUESO: 'tipoDeQueso/PARTIAL_UPDATE_TIPODEQUESO',
  DELETE_TIPODEQUESO: 'tipoDeQueso/DELETE_TIPODEQUESO',
  RESET: 'tipoDeQueso/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITipoDeQueso>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type TipoDeQuesoState = Readonly<typeof initialState>;

// Reducer

export default (state: TipoDeQuesoState = initialState, action): TipoDeQuesoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TIPODEQUESO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TIPODEQUESO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_TIPODEQUESO):
    case REQUEST(ACTION_TYPES.UPDATE_TIPODEQUESO):
    case REQUEST(ACTION_TYPES.DELETE_TIPODEQUESO):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_TIPODEQUESO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_TIPODEQUESO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TIPODEQUESO):
    case FAILURE(ACTION_TYPES.CREATE_TIPODEQUESO):
    case FAILURE(ACTION_TYPES.UPDATE_TIPODEQUESO):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_TIPODEQUESO):
    case FAILURE(ACTION_TYPES.DELETE_TIPODEQUESO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_TIPODEQUESO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_TIPODEQUESO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_TIPODEQUESO):
    case SUCCESS(ACTION_TYPES.UPDATE_TIPODEQUESO):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_TIPODEQUESO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_TIPODEQUESO):
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

const apiUrl = 'api/tipo-de-quesos';

// Actions

export const getEntities: ICrudGetAllAction<ITipoDeQueso> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_TIPODEQUESO_LIST,
    payload: axios.get<ITipoDeQueso>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<ITipoDeQueso> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TIPODEQUESO,
    payload: axios.get<ITipoDeQueso>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ITipoDeQueso> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TIPODEQUESO,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITipoDeQueso> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TIPODEQUESO,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<ITipoDeQueso> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_TIPODEQUESO,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITipoDeQueso> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TIPODEQUESO,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
