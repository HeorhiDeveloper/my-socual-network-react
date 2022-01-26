import {initializeApp} from './redux/app-reducer';
import {connect} from 'react-redux';
import React, { Suspense } from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import {Route } from 'react-router-dom';
import PeopleContainer from './components/People/PeopleContainer';
import Login from './components/login/Login.jsx';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { compose } from 'redux';
import Preloader from './components/common/Preloader/Preloader';
import store from './redux/redux-store';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {withSuspense} from './hog/withSuspense';


const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
//import DialogsContainer from './components/Dialogs/DialogsContainer';
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
//import ProfileContainer from './components/Profile/ProfileContainer.jsx';


class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp()
  }

  render() {
    if(!this.props.initialized){
       return <Preloader/>
    }
    return (
      <div className='app-wrapper'>
        <HeaderContainer />
        <Navbar />
        <div className='app-wrapper-content'>
       
          <Route path='/dialogs' 
          render={withSuspense(DialogsContainer)}/>
        
          <Route path='/profile/:peopleId?' 
          render={withSuspense(ProfileContainer)}/>
      
          <Route path='/news' render={() => { return (<News />) }} />
          <Route path='/music' render={() => { return (<Music />) }} />
                    
          <Route path='/settings' render={() => { return (<Settings />) }} />

          {/* Редирект   */}
          <Route path='/login' render={() => { return (<Login />) }} />
          <Route path='/people' render={() => { return (<PeopleContainer />) }} />
        </div>
      </div>
    )
  }
}
  
const mapStateToProps = (state) => ({
      initialized: state.app.initialized
})

let AppContainer = compose (
  withRouter,
connect(mapStateToProps, { initializeApp }))(App);

const SamuraiJSApp = (props) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  )
}

export default SamuraiJSApp;