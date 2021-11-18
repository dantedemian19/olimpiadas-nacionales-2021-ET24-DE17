import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ILeches, defaultValue } from 'app/shared/model/leches.model';

export const ACTION_TYPES = {
  FETCH_LECHES_LIST: 'leches/FETCH_LECHES_LIST',
  FETCH_LECHES: 'leches/FETCH_LECHES',
  CREATE_LECHES: 'leches/CREATE_LECHES',
  UPDATE_LECHES: 'leches/UPDATE_LECHES',
  PARTIAL_UPDATE_LECHES: 'leches/PARTIAL_UPDATE_LECHES',
  DELETE_LECHES: 'leches/DELETE_LECHES',
  SET_BLOB: 'leches/SET_BLOB',
  RESET: 'leches/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ILeches>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type LechesState = Readonly<typeof initialState>;

// Reducer

export default (state: LechesState = initialState, action): LechesState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_LECHES_LIST):
    case REQUEST(ACTION_TYPES.FETCH_LECHES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_LECHES):
    case REQUEST(ACTION_TYPES.UPDATE_LECHES):
    case REQUEST(ACTION_TYPES.DELETE_LECHES):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_LECHES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_LECHES_LIST):
    case FAILURE(ACTION_TYPES.FETCH_LECHES):
    case FAILURE(ACTION_TYPES.CREATE_LECHES):
    case FAILURE(ACTION_TYPES.UPDATE_LECHES):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_LECHES):
    case FAILURE(ACTION_TYPES.DELETE_LECHES):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_LECHES_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_LECHES):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_LECHES):
    case SUCCESS(ACTION_TYPES.UPDATE_LECHES):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_LECHES):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_LECHES):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.SET_BLOB: {
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType,
        },
      };
    }
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/leches';

// Actions

export const getEntities: ICrudGetAllAction<ILeches> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_LECHES_LIST,
    payload: axios.get<ILeches>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<ILeches> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_LECHES,
    payload: axios.get<ILeches>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ILeches> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_LECHES,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ILeches> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_LECHES,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<ILeches> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_LECHES,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ILeches> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_LECHES,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType,
  },
});

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
