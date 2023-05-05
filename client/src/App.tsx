import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      {/*TODO: before its just html code. DONT NEED TO CREATE COMPONENTS MAN*/}
      <header>
        <div className="header-wrapper">
            <div className="header-container">
                <div className="header-item header-profile">
                    <div className="league_logo"></div>
                    <div className="text">
                        <div className="username">Dulatbay</div>
                        <div className="league_name">Khan</div>
                    </div>
                </div>
                <div className="header-item header-module">
                    <div className="previous_button">
                        <img src="" alt=""/>
                    </div>
                    <div className="current_module">Казахское ханство (1465-1730)</div>
                    <div className="next_button">
                        <img src="" alt=""/>
                    </div>
                </div>
                <div className="header-item header-tools">
                    <div className="header-fire_days fire_days">
                        <div className="fire_logo">
                            <img src="" alt=""/>
                        </div>
                        <div className="fire_count">77</div>
                    </div>
                    <div className="header-quiz">
                        <img src="" alt=""/>
                    </div>
                </div>
            </div>
        </div>
      </header>
    </div>
  );
}

export default App;
