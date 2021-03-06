import {
  REQUEST_CONNECTED_SEARCH,
  RECEIVE_CONNECTED_SEARCH,
  RECEIVE_CONNECTED_SEARCH_ERROR,
  RESET_CONNECTED_SEARCH,
} from '../actions/connectedPage';


const connectEntity = (state = {
  isFetching: false,
  title: '',
  id: '',
  isURL: false,
  parseSuccess: false,
  messages: [],
}, action) => {
  switch (action.type) {
    case REQUEST_CONNECTED_SEARCH: {
      return {
        ...state,
        isFetching: true,
        messages: [],
      };
    }
    case RESET_CONNECTED_SEARCH: {
      return {
        ...state,
        isURL: false,
        parseSuccess: false,
        isFetching: false,
        messages: [],
      };
    }
    case RECEIVE_CONNECTED_SEARCH: {
      const {
        id,
        title,
        isURL,
        parseSuccess
      } = action;
      return {
        ...state,
        isURL,
        parseSuccess,
        id,
        title,
        isFetching: false,
      };
    }
    case RECEIVE_CONNECTED_SEARCH_ERROR: {
      const {
        messages,
      } = action;
      return {
        ...state,
        messages,
        isURL: false,
        parseSuccess: false,
        isFetching: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default connectEntity;
