import React from 'react';
import { Container } from './layout'
import Calculator from './components/Calculator/Calculator';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Container>
        <Calculator />
      </Container>
    </div>
  );
}

export default App;
