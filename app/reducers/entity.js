import {
  REQUEST_SEARCH,
  RECEIVE_ENTITY,
  //RECEIVE_ERROR,
} from '../actions/entity';

const entity = (state = {
  isFetching: false,
  entityCount: 0,
  title: '',
  superEdges: [],
  queryLink: '',
  canonicalLink: '',
}, action) => {
  switch (action.type) {
    case REQUEST_SEARCH: {
      return {
        ...state,
        isFetching: true
      };
    }
    case RECEIVE_ENTITY: {
      const {
        entityCount,
        title,
        superEdges,
        queryLink,
        canonicalLink,
      } = action;
      return {
        ...state,
        entityCount,
        title,
        superEdges,
        queryLink,
        canonicalLink,
      };
    }
    default: {
      return state;
    }
  }
};

export default entity;