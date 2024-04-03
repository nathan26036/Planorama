import './App.css';
import { Outlet } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import Header from './components/Header';
import Footer from './components/Footer';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
    <div className="flex-column justify-flex-start min-100-vh">
        <Header />
      <div>
        <Outlet />
      </div>
        <Footer />
    </div>
    </ApolloProvider>
  );
}

export default App;

