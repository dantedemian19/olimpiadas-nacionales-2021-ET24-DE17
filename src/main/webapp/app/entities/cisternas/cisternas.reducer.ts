import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICisternas, defaultValue } from 'app/shared/model/cisternas.model';

export const ACTION_TYPES = {
  FETCH_CISTERNAS_LIST: 'cisternas/FETCH_CISTERNAS_LIST',
  FETCH_CISTERNAS: 'cisternas/FETCH_CISTERNAS',
  CREATE_CISTERNAS: 'cisternas/CREATE_CISTERNAS',
  UPDATE_CISTERNAS: 'cisternas/UPDATE_CISTERNAS',
  PARTIAL_UPDATE_CISTERNAS: 'cisternas/PARTIAL_UPDATE_CISTERNAS',
  DELETE_CISTERNAS: 'cisternas/DELETE_CISTERNAS',
  RESET: 'cisternas/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICisternas>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type CisternasState = Readonly<typeof initialState>;

// Reducer

export default (state: CisternasState = initialState, action): CisternasState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CISTERNAS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CISTERNAS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_CISTERNAS):
    case REQUEST(ACTION_TYPES.UPDATE_CISTERNAS):
    case REQUEST(ACTION_TYPES.DELETE_CISTERNAS):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_CISTERNAS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_CISTERNAS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CISTERNAS):
    case FAILURE(ACTION_TYPES.CREATE_CISTERNAS):
    case FAILURE(ACTION_TYPES.UPDATE_CISTERNAS):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_CISTERNAS):
    case FAILURE(ACTION_TYPES.DELETE_CISTERNAS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_CISTERNAS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_CISTERNAS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_CISTERNAS):
    case SUCCESS(ACTION_TYPES.UPDATE_CISTERNAS):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_CISTERNAS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_CISTERNAS):
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

const apiUrl = 'api/cisternas';

// Actions

export const getEntities: ICrudGetAllAction<ICisternas> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_CISTERNAS_LIST,
    payload: axios.get<ICisternas>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<ICisternas> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CISTERNAS,
    payload: axios.get<ICisternas>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ICisternas> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CISTERNAS,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICisternas> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CISTERNAS,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<ICisternas> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_CISTERNAS,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICisternas> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CISTERNAS,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
