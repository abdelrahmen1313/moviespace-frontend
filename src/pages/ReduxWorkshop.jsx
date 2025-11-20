import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Add from '../components/workshop/Add'
import Minus from '../components/workshop/Minus'
import { decrement, increment } from '../redux/actions/counter'

const ReduxWorkshop = () => {
    const count  = useSelector(state => state.count)
    const dispatch = useDispatch()
  return (
    <div className='p-8 text-center'>
        <p>{count}</p>
        <Add label={"INCREMENT"} onClick={() => dispatch(increment())}/>&nbsp;&nbsp;
        <Add label={"DECREMENT"} onClick={() => dispatch(decrement())} />
      
    </div>
  )
}

export default ReduxWorkshop