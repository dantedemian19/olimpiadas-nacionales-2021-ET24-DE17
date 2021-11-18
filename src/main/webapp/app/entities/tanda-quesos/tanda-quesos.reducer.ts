import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITandaQuesos, defaultValue } from 'app/shared/model/tanda-quesos.model';

export const ACTION_TYPES = {
  FETCH_TANDAQUESOS_LIST: 'tandaQuesos/FETCH_TANDAQUESOS_LIST',
  FETCH_TANDAQUESOS: 'tandaQuesos/FETCH_TANDAQUESOS',
  CREATE_TANDAQUESOS: 'tandaQuesos/CREATE_TANDAQUESOS',
  UPDATE_TANDAQUESOS: 'tandaQuesos/UPDATE_TANDAQUESOS',
  PARTIAL_UPDATE_TANDAQUESOS: 'tandaQuesos/PARTIAL_UPDATE_TANDAQUESOS',
  DELETE_TANDAQUESOS: 'tandaQuesos/DELETE_TANDAQUESOS',
  RESET: 'tandaQuesos/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITandaQuesos>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type TandaQuesosState = Readonly<typeof initialState>;

// Reducer

export default (state: TandaQuesosState = initialState, action): TandaQuesosState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TANDAQUESOS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TANDAQUESOS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_TANDAQUESOS):
    case REQUEST(ACTION_TYPES.UPDATE_TANDAQUESOS):
    case REQUEST(ACTION_TYPES.DELETE_TANDAQUESOS):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_TANDAQUESOS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_TANDAQUESOS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TANDAQUESOS):
    case FAILURE(ACTION_TYPES.CREATE_TANDAQUESOS):
    case FAILURE(ACTION_TYPES.UPDATE_TANDAQUESOS):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_TANDAQUESOS):
    case FAILURE(ACTION_TYPES.DELETE_TANDAQUESOS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_TANDAQUESOS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_TANDAQUESOS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_TANDAQUESOS):
    case SUCCESS(ACTION_TYPES.UPDATE_TANDAQUESOS):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_TANDAQUESOS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_TANDAQUESOS):
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

const apiUrl = 'api/tanda-quesos';

// Actions

export const getEntities: ICrudGetAllAction<ITandaQuesos> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_TANDAQUESOS_LIST,
    payload: axios.get<ITandaQuesos>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<ITandaQuesos> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TANDAQUESOS,
    payload: axios.get<ITandaQuesos>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ITandaQuesos> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TANDAQUESOS,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITandaQuesos> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TANDAQUESOS,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<ITandaQuesos> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_TANDAQUESOS,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITandaQuesos> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TANDAQUESOS,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
