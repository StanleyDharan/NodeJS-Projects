import React from 'react'
import '../App.css';

class TitleBar extends React.Component{
    render(){
        return(
            <div>
                <header className="App-header">
                    <h1 className="App-title">HBC Schedule Release</h1>
                </header>
            </div>
        );
    }
}

export default TitleBar;