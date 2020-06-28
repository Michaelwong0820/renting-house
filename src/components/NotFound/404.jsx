import React, { Component } from 'react'
import Img from '../../static/image/404.jpg'
export default class NotFound extends Component {
    render() {
        return (
            <div>
                <img src={Img} alt="" style={{width:'100%',height:500}}/>
            </div>
        )
    }
}
