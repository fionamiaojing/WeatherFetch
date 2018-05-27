import React from 'react';

export default class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            input: '',
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.setState({
            input: e.target.value
        })
    }

    render() {
        return (
            <div>
                <input 
                    type="text" 
                    placeholder="please enter city name..."
                    onChange={this.handleChange}/>
                <button 
                    type="button" 
                    onClick={() => {this.props.handleClick(this.state.input)}}>
                    Search
                </button>
            </div>
        )
    }

}