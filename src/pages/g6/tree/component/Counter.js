import React, { useState, createContext, useContext } from 'react';
import { CountContext } from '../index'

function Counter() {
  const count = useContext(CountContext) // 一句话就可以得到count
  return (<h2>{count}</h2>)
}

export default Counter
