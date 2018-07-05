import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from "./components/Home";
import Schedules from "./components/Schedules"

class Main extends React.Component {
    constructor(){
        super();
        this.state = {
            scheduleId: null
        }
    }

    setScheduleId = (id) =>{
        this.setState({
            scheduleId: id
        });
        console.log(this.state.scheduleId);
    };

    render(){
        return(
            <main>
                <Switch>
                    {/*Function getScheduleId gets passed to the HOME component, from there it is passed to UPLOAD
                    component!!!*/}
                    <Route exact path='/' render={() => <Home getScheduleId={this.setScheduleId}/>}/>
                    <Route path='/schedules' component={Schedules}/>
                </Switch>
            </main>
        )
    }
}

//     this.state = {
//         scheduleId: null
//     };
//
//     getScheduleId = (id) =>{
//         this.setState({
//             scheduleId: id
//         });
//         console.log(this.state.scheduleId);
//     };
//
// let Main = () => (
//
//     <main>
//         <Switch>
//             <Route exact path='/' render={() => <Home scheduleId={getScheduleId}/>}/>
//         </Switch>
//     </main>
// );

export default Main

// <Home/>
// <Upload scheduleId={this.getScheduleId}/>
// <FootBar/>