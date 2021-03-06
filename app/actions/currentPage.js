import request from 'superagent';
import config from '../config';
import analytics from '../analytics';

const env = process.env.NODE_ENV || 'development';
const { rootURL } = config;

export const REQUEST_SEARCH = 'REQUEST_SEARCH';
export const RECEIVE_CURRENT_PAGE = 'RECEIVE_CURRENT_PAGE';
export const REQUEST_CURRENT_PAGE = 'REQUEST_CURRENT_PAGE';

export const REQUEST_CURRENT_PAGE_LINKS = 'REQUEST_CURRENT_PAGE_LINKS';
export const RECEIVE_CURRENT_PAGE_LINKS = 'RECEIVE_CURRENT_PAGE_LINKS';

export const RECEIVE_SEARCH_ERROR = 'RECEIVE_SEARCH_ERROR';

const receiveSearchError = messages => ({
  type: RECEIVE_SEARCH_ERROR,
  messages,
});

export const requestSearch = (url) => ({
  type: REQUEST_SEARCH,
  url
});

export const requestCurrentPage = () => ({
  type: REQUEST_CURRENT_PAGE
});

export const requestCurrentPageLinks = () => ({
  type: REQUEST_CURRENT_PAGE_LINKS
});

export const receiveCurrentPageLinks = (links, isParsed, timedOut) => ({
  type: RECEIVE_CURRENT_PAGE_LINKS,
  links,
  isParsed,
  timedOut,
});


const receiveCurrentPage = (id, entityCount, title, superEdges, queryLink, canonicalLink, heartValue, heartCount, isURL, links, isParsed) => ({
  type: RECEIVE_CURRENT_PAGE,
  id,
  entityCount,
  title,
  superEdges,
  queryLink,
  canonicalLink,
  heartValue,
  heartCount,
  isURL,
  links,
  isParsed
});

/* This demands a more efficent API.
   We have almost two identical functions fetchCurrentPage fetchConnectEntity.
   @TODO Consolidate functions around a single efficent API Call @jeffj
*/

export const fetchCurrentPage = (id, cb) => dispatch => {
  dispatch(requestCurrentPage());
  request
    .get(`${rootURL}/api/node/${id}`)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) {
        dispatch(receiveSearchError([{
          type: 'error',
          text: 'Error in Response'
        }]));
      } else {
        const { isParsed, entityCount, title, links, superEdges, queryLink, canonicalLink, _id, heart:{ value, count} } = res.body;
        const isURL = true;
        analytics('pageConnectionDisplayed', String(entityCount));
        dispatch(receiveCurrentPage(
          _id,
          entityCount,
          title,
          superEdges,
          queryLink,
          canonicalLink,
          value,
          count,
          isURL,
          links,
          isParsed,
        ));
        if (cb) { cb() }; // Hack for ending edge when we refresh the page
      }
    });
}


export const fetchCurrentPageLinks = (id, attempts) => (dispatch) => {
  dispatch(requestCurrentPageLinks());
  request
    .get(`${rootURL}/api/node/${id}`)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) {
        dispatch(receiveSearchError([{
          type: 'error',
          text: 'Error in Response'
        }]));
      } else {
        const { isParsed, links } = res.body;
        dispatch(receiveCurrentPageLinks(
          links,
          isParsed,
        ));

        // Refetch if all the links are not parsed
        if (isParsed === false && attempts < 3) {
          setTimeout(() => {
            dispatch(fetchCurrentPageLinks(id, attempts + 1 ));
          }, 2000)
        } else {
          const timedOut = true;
          dispatch(receiveCurrentPageLinks(
            links,
            true,
            timedOut
          ));
        }
      }
    });
}


export const fetchSearch = (url, tabId) => (dispatch) => {
  dispatch(requestSearch(url, tabId));
  return request
    .get(`${rootURL}/api/searchurl?q=${url}`)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) {
        return dispatch(receiveSearchError([{
          type: 'error',
          message: 'There was an error, Please try again'
        }]));
      } // Stop here on err
      const { body: { isURL, node, parseSuccess, messages } } = res;
      if (isURL === false || parseSuccess === false) {
        dispatch(receiveSearchError(messages));
      } else {
        const { _id } = node;
        dispatch(fetchCurrentPage(_id));
      }
    });
};
