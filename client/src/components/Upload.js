import React from 'react'
import axios from 'axios'

class Upload extends React.Component{
    state = {
        selectedFile: null,
        scheduleId: null,
        date: null
    };

    fileSelectHandler = event =>{
        this.setState({
           selectedFile: event.target.files[0]
        });
    };

    dateSelectHandler = event =>{
      this.setState({date: event.target.value});
    };

    FileUploadHandler = event =>{
        const file = new FormData();
        file.append('ScheduleFile', this.state.selectedFile, this.state.selectedFile.name);
        file.append('DateEffective', this.state.date);
        axios.post('http://localhost:3001/schedule/submit', file)
            .then (res =>{
                this.setState({scheduleId: res.data._id});
                this.props.getScheduleId(this.state.scheduleId);

            });
    };

    render(){
        return(
            <div>
                <form action='/schedules'>
                    <input type='file' required onChange={this.fileSelectHandler}/>
                    <br/>
                    <p>Enter the date that this schedule will be active:</p>
                    <input type='date' name='effectiveDate' onChange={this.dateSelectHandler}/>
                    <br/>
                    <br/>
                    <button onClick={this.FileUploadHandler} >Submit</button>
                </form>
            </div>
        );
    }
}

export default Upload;