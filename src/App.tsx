import React from 'react';
import { Container } from './layout'
import { Calculator, Header } from './components/';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Container>
        <Header />
        <Calculator />
      </Container>
    </div>
  );
}

export default App;
