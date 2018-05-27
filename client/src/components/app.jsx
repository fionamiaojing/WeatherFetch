import React from 'react';
import Search from './search.jsx';
import $ from 'jquery';
import Citylist from './citylist.jsx'

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            server: "http://localhost:3000",
            cities: []
        }
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        this.fetch();
    }

    handleClick(input) {
       this.send({data: input})
    }

    send(data) {
        $.ajax({
            type: "POST",
            url: this.state.server + '/climate',
            data: JSON.stringify(data),
            contentType: "application/json",
            success: (res) => {
                this.fetch()
            },
            error: (error) => {
                console.log(error)
            }
        })
    }

    fetch() {
        $.ajax({
            type: "GET",
            url: this.state.server + '/climate',
            success: (res) => {
                this.setState({
                    cities: res
                })
            },
            error: (error) => {
                console.log(error)
            }
        })
    }


    render() {
        return (
            <div>
                <h1>Climate Search</h1>
                <Search handleClick={this.handleClick}/>
                <Citylist cities={this.state.cities}/>
            </div>
        )
    }

}