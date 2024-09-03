import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import 'antd/dist/antd.less';
import { NotFoundPage } from './components/pages/NotFound';
import { LandingPage } from './components/pages/Landing';
import PrivateRoute from './components/PrivateRoute';

import { FooterContent, SubFooter } from './components/Layout/Footer';
import { HeaderContent } from './components/Layout/Header';

import { Layout } from 'antd';
import GraphsContainer from './components/pages/DataVisualizations/GraphsContainer';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import reducer from './state/reducers';
import { colors } from './styles/data_vis_colors';

import Auth0ProviderWithHistory from './auth0-provider-with-history';
import LoginButton from './components/login-button';
import LogoutButton from './components/logout-button';
import { useAuth0 } from '@auth0/auth0-react';

const { primary_accent_color } = colors;

const store = configureStore({ reducer: reducer });

ReactDOM.render(
  <Router>
    <Auth0ProviderWithHistory>
      <Provider store={store}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Provider>
    </Auth0ProviderWithHistory>
  </Router>,
  document.getElementById('root')
);

export function App() {
  const { Footer, Header } = Layout;
  const { isAuthenticated } = useAuth0(); // Access authentication status

  return (
    <Layout>
      <Header
        style={{
          height: '10vh',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: primary_accent_color,
          justifyContent: 'space-between', // Adjust alignment
        }}
      >
        <HeaderContent />
        {/* Conditionally render buttons based on authentication status */}
        <div>
          {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </div>
      </Header>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <PrivateRoute path="/graphs" component={GraphsContainer} />
        <Route component={NotFoundPage} />
      </Switch>
      <Footer
        style={{
          backgroundColor: primary_accent_color,
          color: '#E2F0F7',
        }}
      >
        <FooterContent />
      </Footer>
      <Footer
        style={{
          backgroundColor: primary_accent_color,
          padding: 0,
        }}
      >
        <SubFooter />
      </Footer>
    </Layout>
  );
}
