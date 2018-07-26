import React from 'react'
import axios from "axios/index";
import queryString from 'query-string';
import ReactTable from 'react-table';
import "/home/stanley/projects/schedules-to-go/client/node_modules/react-table/react-table.css";

class Schedules extends React.Component{

    state = {
      shifts: null
    };

    componentDidMount() {
        window.addEventListener('load', this.getShiftsByDate);
    }

    componentDidUpdate(){
        if(this.state.schedules !== null){

        }
    }

    getShiftsByDate = async () =>{
        const query = queryString.parse(this.props.location.search);
        await axios.get(`http://localhost:3001/schedule/date?date=${query.effectiveDate}`).then(function (res) {
            this.setState({
                shifts: res.data
            });
            console.log(res.data);
        }.bind(this));
    };

    render() {
        return (
            <div>
                {
                    this.state.shifts &&
                    <ReactTable
                        data={this.state.shifts}
                        columns = {[
                            {
                                Header: "Name",
                                columns: [
                                    {
                                        Header: 'Email',
                                        accessor: 'email'
                                    },
                                    {
                                        Header : 'First Name',
                                        accessor : 'firstName'
                                    },
                                    {
                                        Header: 'Last Name',
                                        accessor: 'lastName'
                                    }
                                ]
                            },
                            {
                                Header: "Shifts",
                                columns: [
                                    {
                                        Header: 'Monday',
                                        accessor: 'monday'
                                    },
                                    {
                                        Header: 'Tuesday',
                                        accessor: 'tuesday'
                                    },
                                    {
                                        Header: 'Wednesday',
                                        accessor: 'wednesday'
                                    },
                                    {
                                        Header: 'Thursday',
                                        accessor: 'thursday'
                                    },
                                    {
                                        Header: 'Friday',
                                        accessor: 'friday'
                                    },
                                    {
                                        Header: 'Saturday',
                                        accessor: 'saturday'
                                    },
                                    {
                                        Header: 'Sunday',
                                        accessor: 'sunday'
                                    }
                                ]
                            }
                        ]}
                        defaultPageSize={10}
                        className="-striped -highlight"
                    />
                }
            </div>
        )
    }
}

export default Schedules;