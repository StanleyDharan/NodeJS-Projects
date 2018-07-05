import React from 'react'
import axios from "axios/index";
import queryString from 'query-string';

class Schedules extends React.Component{

    componentDidMount(){
        window.addEventListener('load', this.getSingleSchedules);
    }

    getSingleSchedules = () =>{
        const query = queryString.parse(this.props.location.search);
        console.log(query);
    };

    render() {
        return (
            <h1>HELLO WORLD!!</h1>
        )
    }
}

export default Schedules;