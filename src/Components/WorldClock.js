import React, { Component } from 'react'

export class WorldClock extends Component {
    render() {
        return (
            <div>
            <div className={"clock"}>
            <h3>Clock</h3>
            <div className={"analog-clock"}>
            <div className={"dial seconds"} />
            <div className={"dial minutes"} />
            <div className={"dial hours"} />
            </div>
            <div className={"digital-clock"}></div>
            </div>
            </div>
  )
}


}
    
export default WorldClock
