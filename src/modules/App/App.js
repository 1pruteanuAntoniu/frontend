import React from 'react';
import '../../css/modules/App/App.css';
import Navigation from '../Navigation/index';
import Home from '../Home/index';
import Footer from '../Footer/index';
import Events from '../Events/index';

function onChange(path) {
  window.location.pathname = path;
}

function App() {
  return (
    <div className="App">
      {
        window.location.pathname === '/home'
        ?<><Navigation 
          onChange={onChange}
        />
        <Home />
        <Footer /></>
        :
        <><Navigation
        onChange={onChange} 
        />
        <Events />
        <Footer /></>
      }
      
    </div>
  );
}

export default App;
