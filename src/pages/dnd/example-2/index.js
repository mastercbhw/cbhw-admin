
import React from 'react'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Example from './example'

const Example2 = () => (
  <DndProvider backend={HTML5Backend}>
    <Example />
  </DndProvider>
)


export default Example2
