import React from 'react'
import axios from 'axios'

class Upload extends React.Component{
    state = {
        selectedFile: null,
        scheduleId: null
    };

    fileSelectHandler = event =>{
        this.setState({
           selectedFile: event.target.files[0]
        });
    };

    FileUploadHandler = event =>{
        const fd = new FormData();
        fd.append('ScheduleFile', this.state.selectedFile, this.state.selectedFile.name);
        axios.post('http://localhost:3001/schedule/submit', fd)
            .then(res =>{
                this.props.scheduleId(res.data._id);
            });
    };

    render(){
        return(
            <div>
                <input type='file' required onChange={this.fileSelectHandler}/>
                <br/>
                <br/>
                <button onClick={this.FileUploadHandler} >Submit</button>
            </div>
        );
    }
}

export default Upload;