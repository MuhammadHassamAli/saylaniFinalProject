import React from 'react';


class Account extends React.Component {


  render() {
    return (
      <div>
        <div className="container" style={{ marginTop: 30, }}>
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8" style={{ boxShadow: '2px 13px 63px -23px rgba(0,0,0,0.68)', backgroundColor: "white", padding: '30px 0px 80px 0px' }}>
              <div className="row">
                <div style={{ margin: 'auto' }}><h1>User Profile</h1></div>
              </div>
              <div className="container" style={{marginTop: 20}}>
                <div className="row" style={{padding: 10}}>
                  <div className="col-md-4"></div>
                  <div className="col-md-2"><strong>Name:</strong></div>
                  <div className="col-md-3">Hassam Ali</div>
                  <div className="col-md-2"></div>
                </div>
                <div className="row" style={{padding: 10}}>
                  <div className="col-md-4"></div>
                  <div className="col-md-2"><strong>Email:</strong></div>
                  <div className="col-md-3">hassamali@gmail.com</div>
                  <div className="col-md-2"></div>
                </div>
                <div className="row" style={{padding: 10}}>
                  <div className="col-md-4"></div>
                  <div className="col-md-2"><strong>Mobile:</strong></div>
                  <div className="col-md-3">+92 303 6887448</div>
                  <div className="col-md-2"></div>
                </div>
                <div className="row" style={{padding: 10}}>
                  <div className="col-md-4"></div>
                  <div className="col-md-2"><strong>Age:</strong></div>
                  <div className="col-md-3">23</div>
                  <div className="col-md-2"></div>
                </div>
              </div>
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>
      </div>
    )
  }
}

export default Account;




