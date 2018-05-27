import React from 'react';

const CitylistEntry = (props) => (
    <div className="clima">
        <div className="city">{props.city.city}</div>
        <img src={props.city.iconURL} alt=""/>
        <div className="weather">{props.city.weather}</div>
        <div className="temp">{Math.round(props.city.temp)} ℃</div>
       
    </div>

)

export default CitylistEntry