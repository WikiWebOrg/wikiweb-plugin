import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
// import { fetchSearch } from '../actions/entity';
// import { fetchProfile } from '../actions/user';

const startIndex = 0;
const endIndex = 3;

const mapStateToProps = (state) => {
  const { entity:
    { id,
      entityCount,
      isFetching,
      title,
      superEdges,
      queryLink,
      canonicalLink,
    },
  } = state;

  return {
    id,
    entityCount,
    title,
    isFetching,
    superEdges,
    queryLink,
    canonicalLink,
  };
};

class Connections extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    superEdges: PropTypes.array.isRequired,
    location: PropTypes.object,
    entityCount: PropTypes.number.isRequired,
    id: PropTypes.string,
  }

  componentDidMount() {

  }

  render() {
    const {
      superEdges,
      entityCount,
      id,
      isFetching,
      location: {
        search,
      },
    } = this.props;

    const styles = {
      main: {
        height: 45, 
        backgroundColor: 'white',
        display: 'flex',
        fontFamily: '"Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Geneva, Arial, sans-serif !important',
        color: 'rgba(0,0,0,.8)',
        fontSize: '16px',
      },
      edgeBox: {
        /* Left Blank until data */
      },
      noEdges: {
        color: 'rgba(0,0,0,.8)',
        flexDirection: 'row',
        listStyle: 'none',
        display: '-webkit-box',
        display: '-moz-box',
        display: '-ms-flexbox',
        display: '-webkit-flex',
        display: 'flex',
        '-webkit-flex-flow': 'row wrap',
      },
    }

    // @TODO This should be outside the function
    function noEdgesJSX() {
      return (
        <div style={ styles.noEdges }>
          <div>Page has no connections</div>
          <div>Page has no connections</div>
          <div>Page has no connections</div>
        </div>
      );
    }

    function edgeBoxJSX(data){
      return (
        <div style={ styles.edgeBox }>
          <div>Page Has Connections</div>
          <div>Page Has Connections</div>
          <div>Page Has Connections</div>
        </div>
      );
    }

    const pageJSX = superEdges.length > 0 ? edgeBoxJSX(superEdges) : noEdgesJSX(superEdges);

    return (
      <div className={'wikiwebFooter'} style={ styles.main } >
        {isFetching ?
          (
            <div style={{ height: 45 }} >
              <span>FETCHING, yo</span>
            </div>
          ) :
          pageJSX
        }
      </div>
    );
  }
}

export default connect(mapStateToProps)(Connections);
