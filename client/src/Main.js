import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from "./components/Home";
// import Upload from './components/Upload';
// import FootBar from './components/FootBar';

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
        </Switch>
    </main>
);

export default Main

// <Home/>
// <Upload scheduleId={this.getScheduleId}/>
// <FootBar/>