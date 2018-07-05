import React from 'react'
import Upload from '../components/Upload'
import './css/footer.css';

class Home extends React.Component{
    render(){
        return(
            <div className="Home">
                <p><strong>Welcome to the HBC Schedule release, please upload a .CSV file of the schedule to continue.</strong></p>
                <Upload getScheduleId={this.props.getScheduleId}/>
            </div>
        );
    }
}

export default Home;