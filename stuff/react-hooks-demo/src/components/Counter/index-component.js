import React, { Component } from 'react'

export default class Counter extends Component {

  state = {count: 0, loading: false}

  handleAdd = () => {
      this.setState({loading: true})
      setTimeout(() => {
        this.setState({loading: false})
        this.setState({count: this.state.count + 1})
      }, 1000)
  }

  handleSubstract = () => {
    debugger
    this.setState({loading: true});
    setTimeout(() => {
      this.setState({loading: false}) 
      this.setState({count: this.state.count - 1});
    }, 1000)
  }

  handelReset = () => {
    this.setState({loading: true});
    setTimeout(() => {
      this.setState({loading: false}) 
      this.setState({count: 0});
    }, 1000)
  }

  render() {
    const {handleAdd, handelReset, handleSubstract, state:{loading, count}} = this
    return (
      <div>
        <button onClick={handleSubstract}>-</button>
        <span>{loading ? <span><i className=" favourite__loading fas fa-spinner fa-spin fa-1x" /> </span>: count}</span>
        <button onClick={handleAdd}>+</button>
        <br />
        <button onClick={handelReset}>Reset</button>
      </div>
    )
  }
  
  
}