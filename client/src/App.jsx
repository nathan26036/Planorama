import './App.css';
import React, { useState, useEffect } from 'react';
import { setContext } from '@apollo/client/link/context'
import { Outlet } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';

import Header from './components/Header';
import Footer from './components/Footer';

const httpLink = createHttpLink({
  uri: '/graphql'
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // check if the user is logged in 
  useEffect(() => {
    const token = localStorage.getItem('id_token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <ApolloProvider client={client}>
    <div className="flex-column justify-flex-start min-100-vh">
        <Header />
      <div>
        <Outlet />
      </div>
        <Footer isLoggedIn={isLoggedIn}/>
    </div>
    </ApolloProvider>
  );
}

export default App;

