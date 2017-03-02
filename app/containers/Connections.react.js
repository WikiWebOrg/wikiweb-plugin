import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import TransitionGroup from 'react-addons-transition-group';
import { TweenMax } from 'gsap';
import Add from './Add.react';
import Message from '../components/Message.react';
import { fetchPostEdge } from '../actions/edge';

const startIndex = 0;
const endIndex = 3;

const mapStateToProps = (state) => {
  const {
    user: {
      isLoggedIn,
    },
    edge,
    connectEntity,
    currentPage: { 
      id,
      entityCount,
      isFetching,
      title,
      superEdges,
      queryLink,
      canonicalLink,
    },
  } = state;
  
  const connectEntityId = connectEntity.id;
  const isFetchingEdge = edge.isFetching;
  const messages = edge.messages;
  
  return {
    isLoggedIn,
    edge,
    id,
    connectEntityId,
    entityCount,
    title,
    isFetching,
    isFetchingEdge,
    superEdges,
    queryLink,
    canonicalLink,
    messages,
  };
};

class Connections extends Component {
  state = {
    connectionDisplayIndex: 0,
    isAddConnectionToggledOn: false,
    shouldShowConnectionBox: true,
    dummyRecommendations: 183,
    dummyData: {
      recommendations: 183,
      connectionsIndex: 0,
      connections: [
        {
          title: 'Gone with the Wind, a hunters classic',
          connection_url: 'http://paulgraham.com/ds.html',
          base_url: 'https://www.wsj.com/',
          connected_by: 'Nick Sinai',
          connected_by_handle: 'NickSinai',
          connected_by_handle_url: 'http://twitter.com/NickSinai',
        },
        {
          title: 'Only a Savant Would Click Like a Reindeer',
          connection_url: 'http://paulgraham.com/ds.html',
          base_url: 'https://eoinmcmillan.com',
          connected_by: 'Eoin McMillan',
          connected_by_handle: 'mceoin',
          connected_by_handle_url: 'http://twitter.com/mceoin',
        },
        {
          title: 'John Travolta Aint Got Nothin on Me, said Testosterone',
          connection_url: 'http://paulgraham.com/ds.html',
          base_url: 'http://sfdevlabs.com/',
          connected_by: 'Jeff Jenkins',
          connected_by_handle: 'jeffj',
          connected_by_handle_url: 'http://twitter.com/jeffj',
        }
      ]
    }
  };

  toggleBox = () => {
    this.setState({
      shouldShowConnectionBox: !this.state.shouldShowConnectionBox
    });
  };

  incrementConnectionsIndex = (e) => {
    console.log(this.props.entityCount, "this.props.entityCount")
    console.log(this.state.connectionDisplayIndex, "this.state.connectionDisplayIndex")
    if (this.state.connectionDisplayIndex < this.props.entityCount) {
      this.setState({
        connectionDisplayIndex: this.state.connectionDisplayIndex + 1
      })
    }
  }

  decrementConnectionsIndex = (e) => {
    if (this.state.connectionDisplayIndex > 0) {
      this.setState({
        connectionDisplayIndex: this.state.connectionDisplayIndex - 1
      })
    }
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    superEdges: PropTypes.array.isRequired,
    entityCount: PropTypes.number.isRequired,
    id: PropTypes.string,
  }

  componentDidMount() {
    //no opp
  }

  // @TODO DATA PULLED FROM API! THERE ARE {superEdges? superEdges.length: 0} connections(s) ON THIS PAGE!

  render() {
    const {
      isLoggedIn,
      superEdges,
      entityCount,
      id,
      isFetching,
      title,
      isFetchingEdge,
      messages,
    } = this.props;

    const {
      connectionDisplayIndex,
      dummyRecommendations,
      isAddConnectionToggledOn
    } = this.state;

    let incrementButtonStyle;
    let decrementButtonStyle;

    if (entityCount > 0) {  
      incrementButtonStyle = { color: 'rgba(0,0,0,.6)' };
      decrementButtonStyle = { color: 'rgba(0,0,0,.6)' };
      if (connectionDisplayIndex === entityCount) {
        decrementButtonStyle = { color: 'rgba(0,0,0,.33)' };
      } else if (connectionDisplayIndex === 0) {
        incrementButtonStyle = { color: 'rgba(0,0,0,.33)' };
      }
    } else {
      incrementButtonStyle = { display: 'none' };
      decrementButtonStyle = { display: 'none' };
    }

    const showLoginInfo = isAddConnectionToggledOn && !isLoggedIn ? 'flex' : 'none';
    /* TODO: make this login link dynamic */
    const loginButton = (
      <span className={'loginButton'} style={{ display: showLoginInfo }}>
        <a href="http://localhost:3000/login">Login</a>
      </span>);

    const loginTextJSX = (
      <div className={'loginText'} style={{ display: showLoginInfo }}>
        <span>You must be logged in to make a connection</span>
      </div>
    )

    const inputBoxJSX = isLoggedIn && isAddConnectionToggledOn ? (
      <div className={'inputBox'}>
        <Add onSave={this.onSave}/>
      </div>) : null;

    const showRecommendationBox = isAddConnectionToggledOn ? 'none' : 'flex';
    const recommendationBoxJSX = entityCount > 0 ?
      (<div className={'recommendationBox'} style={{display: showRecommendationBox}}>
          <div style={{ width: 480 }}>
            <div className={'readNext'}>
              <span className={'noOverflow'}>
                <a href={superEdges[connectionDisplayIndex].entity.canonicalLink}>Read next</a>
              </span>
            </div>
            <div className={'nextRead'}>
              <span className={'noOverflow'}>
                <a href={superEdges[connectionDisplayIndex].entity.canonicalLink}>{superEdges[connectionDisplayIndex].entity.title}</a>
              </span>
            </div>
          </div>
          <div className={'changeRecommendationBox'}>
            <i onClick={this.incrementConnectionsIndex.bind(this)} style={decrementButtonStyle} className={'fa fa-caret-up recommendationToggleCaret'}></i>
            <i onClick={this.decrementConnectionsIndex.bind(this)} style={incrementButtonStyle} className={'fa fa-caret-down recommendationToggleCaret'}></i>
          </div>
        </div>) : 
        ( <div className={'recommendationBox'} style={{display: showRecommendationBox}}>
            <div style={{ width: 480 }}>
              Bro. Bro! Add a link. And style this section while you&#39;re at it.
            </div>
          </div>)
    return (
      <div className={'wikiwebFooter'} style={{ height: 45 }} >
        <div className={'centerBox'}>

        <div id='leftCol'>
          <div className={'addMetaBox'}>
            <div className={'heartBox'} style={{ alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
              <div onMouseEnter={enterHeartIcon} onMouseLeave={leaveHeartIcon} >
                <i id='heartIcon' className={'fa fa-heart-o heartIcon'} style={{ fontSize: 22, paddingRight: 4 }} />
              </div>
              <div onMouseEnter={enterHeartText} onMouseLeave={leaveHeartText} >
                <span id='heartText' className={'heartText'}>{dummyRecommendations}</span>
              </div>
            </div>
            <div className={'addBox'} style={{ alignItems: 'center', display: 'flex', flexDirection: 'row', marginLeft: 20 }}>
              <div onMouseEnter={enterConnectionBox} onMouseLeave={leaveConnectionBox} className={'addConnectionBox'} >
                <i id='addConnectionIcon' onClick={toggleMiddleSection.bind(this)} className={'fa fa-plus-square-o'} style={{ color: 'rgba(0,0,0,.33)', fontSize: 27, paddingTop: 3 }} />
              </div>
            </div>
            <div className={'verticalDivider'} style={{ marginLeft: 20 }}></div>
          </div>
        </div>
          
          <div id='middleCol'>
            <Message messages={messages} />
            <span>{isFetchingEdge?'isFetchingEdge':''}</span>
            {recommendationBoxJSX}
            {loginTextJSX}
            {inputBoxJSX}
          </div>
          
          <div id='rightCol'>
            <div className={'verticalDivider'} style={{ justifyContent: 'flex-end' }}></div>
            {loginButton}
          </div>

        </div>
      </div>
    );
  }

  onSave = (e) => {
    const { dispatch, id, connectEntityId } = this.props;

    //const { description, tags } = this.state;
    dispatch(fetchPostEdge(
      id,
      connectEntityId,
      '',
      []
    ));
    this.setState({
      isAddConnectionToggledOn: !this.state.isAddConnectionToggledOn
    });
    e.preventDefault();
  }
}

export default connect(mapStateToProps)(Connections);

// Functons and constants
const styles = {
  /* currently blank... styles moved to stylesheet */
}

function enterHeartIcon(e) {
  var el = document.getElementById('heartIcon');
  el.classList.remove('leaveHeartIcon');
  el.className += ' enterHeartIcon';
  e.preventDefault();
}

function leaveHeartIcon(e) {
  var el = document.getElementById('heartIcon');
  el.classList.remove('enterHeartIcon');
  el.className += ' leaveHeartIcon';
  e.preventDefault();
}

function enterHeartText(e) {
  var el = document.getElementById('heartText');
  el.classList.remove('leaveHeartText');
  el.className += ' enterHeartText';
  e.preventDefault();
}

function leaveHeartText(e) {
  var el = document.getElementById('heartText');
  el.classList.remove('enterHeartText');
  el.className += ' leaveHeartText';
  e.preventDefault();
}

function enterConnectionBox(e) {

}

function leaveConnectionBox(e) {
}

function toggleMiddleSection(e) {
  this.setState({
    isAddConnectionToggledOn: !this.state.isAddConnectionToggledOn
  });
  e.preventDefault();
}

window.onkeyup = function(e) {
  if (e.keyCode == 27) { /* escape key */
    /* Yo Jeff - I'm too tired to think this one through, but how do I pass state through to a function on keypress? */
    /* thoughts are to attach this to body and pass state "this" through on all keystrokes, ... seems excessive */
  }
}
