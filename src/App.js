import React from 'react';
import './styles/App.css';
import Header from './components/Header';
import Main from './components/Main';


const App = () => {
  return (
    <div className="app">
      <header>
        <Header/>
      </header>
      <main>
        <Main/>
      </main>
    </div>
  );
}

export default App;
