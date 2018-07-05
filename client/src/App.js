import React from 'react';
import TitleBar from './components/TitleBar';

import Main from "./Main"

class App extends React.Component {

    render() {
    return (
        <div className="App">
            <TitleBar/>
            <Main/>
        </div>
    );
  }
}

// const App = () => (
//         <div className="App">
//             <TitleBar/>
//             <Main/>
//         </div>
// );

export default App;
