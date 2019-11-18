import React from 'react';
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Container from './Container'

export default function Demo2() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Container />
    </DndProvider>
  )
}
