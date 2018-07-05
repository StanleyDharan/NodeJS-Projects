import React from 'react'
import axios from 'axios'

class singleSchedule extends React.Component{
    constructor(){
        super();
        this.state = {
            scheduleIds: null
        };
    }

    componentDidMount(){
        window.addEventListener('load', this.getSingleSchedules);
    }

    getSingleSchedules = () =>{
        axios.get('http://localhost:3001/schedule/current')
            .then(res =>{
                this.setState({scheduleIds: res.data});
                console.log(this.state.scheduleIds);
            })
            .catch( function (error){
                console.log(error);
            });
    };

    render(){
        return(
            <div>
                <h1>TEST</h1>
            </div>
        )
    }
}

export default singleSchedule;