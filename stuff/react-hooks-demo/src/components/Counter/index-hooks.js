import React, { useReducer } from 'react'

export default function Counter() {

  const [{ count, loading }, setCount] = useReducer((state, action) => {

    switch (action) {
      case 'add':
        return {...state, count: state.count + 1, loading: false}
      case 'substract':
        return {...state, count: state.count - 1, loading: false}
      case 'reset':
        return { ...state, count: 0, loading: false }
      case 'loading':
        return { ...state, loading: true }
      default:
        return state
    }
  }, {
    loading: false,
    count: 0,
  })
  
  return (
    <div>
      <button onClick={() => {
        setCount('loading' ) 
        setTimeout(function() {setCount('substract')}, 1000)
        }}>-</button>
      <span>{loading ? <span><i className=" favourite__loading fas fa-spinner fa-spin fa-1x" /> </span>: count}</span>
      <button onClick={() => {
        setCount('loading') 
        setTimeout(function() {setCount('add')}, 1000)
        }}>+</button>
      <br />
      <button onClick={() => {
        setCount('loading') 
        setTimeout(function() {setCount('reset')}, 1000)
      }}>Reset</button>
    </div>
  )
}