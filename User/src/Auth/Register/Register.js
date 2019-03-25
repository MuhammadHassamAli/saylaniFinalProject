import React from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Link} from 'react-router-dom';
import IntlMessages from 'util/IntlMessages';



class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      displayName: '',
      email: '',
      password: '',
      phone: ''
    }
  }

  componentDidUpdate() {
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideMessage();
      }, 3000);
    }
    if (this.props.authUser !== null) {
      //this.props.history.push('/');
    }
  }
  

  
  render() {
    // const {
    //   displayName,
    //   email,
    //   password,
    //   phone
    // } = this.state;
    const {showMessage, loader, alertMessage} = this.props;
  
    return (
    
      <div className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
      <div className="app-login-main-content">
        <div className="app-logo-content d-flex align-items-center justify-content-center">
          <Link className="logo-lg" to="/" title="Jambo">
            <img src={require("assets/images/logo.png")} alt="jambo" title="jambo"/>
          </Link>
        </div>

        <div className="app-login-content">
          <div className="app-login-header">
            <h1>Sign Up</h1>
          </div>

          <div className="mb-4">
            <h2><IntlMessages id="appModule.createAccount"/></h2>
          </div>

          <div className="app-login-form">
        
            <form action="https://www.paypal.com/cgi-bin/webscr" method="post">
              <input type="hidden" name="cmd" value="_s-xclick" />
              <input type="hidden" name="hosted_button_id" value="WKQ3FDS7RKU8U" />
              <input type="image" src="https://www.paypalobjects.com/en_US/MX/i/btn/btn_subscribeCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" />
              <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1" />
                
            </form>

        



          </div>
        </div>

      </div>
      {
          loader &&
          <div className="loader-view">
            <CircularProgress/>
          </div>
        }
        {showMessage && NotificationManager.error(alertMessage)}
        <NotificationContainer/>
      </div>

    )
  }
}

export default Register;