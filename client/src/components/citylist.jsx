import React from 'react';
import CitylistEntry from './citylistEntry.jsx';

class Citylist extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        let id = 0;
        return (
            <div>
                {this.props.cities.map((city) => <CitylistEntry key={++id} city={city}/>)}
            </div>
        
        )
    } 

} 

export default Citylist