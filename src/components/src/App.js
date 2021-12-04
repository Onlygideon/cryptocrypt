import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import{ Layout, Typography, Space, Avatar  } from 'antd';
import Logo from './images/crypto.png'

import './App.css'

import store from './app/store';
import { Provider } from 'react-redux';

import { Navbar, Home, Exchanges, Cryptocurrencies, CryptoDetails, News } from './components'


function App() {
  return (
    <Router>
      <Provider store={store}>
          <div className="app">
            <div className="navbar">
              <Navbar />
            </div>
            
            <div className="main">
                <Layout>
                  <div className="routes">
                    <Switch>
                      <Route exact path="/">
                        <Home />
                      </Route>

                      <Route exact path="/exchanges">
                        <Exchanges />
                      </Route>

                      <Route exact path="/cryptocurrencies">
                        <Cryptocurrencies />
                      </Route>

                      <Route exact path="/cryptocurrency/:coinId">
                        <CryptoDetails/>
                      </Route>

                      <Route exact path="/news">
                        <News />
                      </Route>
                    </Switch>
                  </div>
                </Layout>

                <div className="footer">
                  <Typography.Title level={5} style={{color: 'white', textAlign: 'center'}}>
                      CryptoCrypt <br />
                      All rights reserved.
                  </Typography.Title>
                  <Space>
                    <Avatar src={Logo} size='large' style={{cursor: 'pointer  '}} alt="footer"/>
                  </Space>
                </div>
              </div>
          </div>
      </Provider>
    </Router>
  );
}

export default App;
