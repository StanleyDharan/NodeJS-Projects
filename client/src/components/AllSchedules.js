import React from 'react'
import axios from 'axios'

class AllSchedules extends React.Component{
    constructor(){
        super();
        this.state = {
            scheduleIds: null
        };
    }

    componentDidMount(){
        window.addEventListener('load', this.getAllSchedules);
    }

    getAllSchedules = () =>{
        axios.get('http://localhost:3001/schedule/all')
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

export default AllSchedules;