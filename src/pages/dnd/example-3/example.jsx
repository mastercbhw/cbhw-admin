import React from 'react'
import Dustbin from './Dustbin'
import Box from './Box'

const Container = () => (
  <div>
    <div style={{ overflow: 'hidden', clear: 'both', margin: '-1rem' }}>
      <Dustbin greedy id="1">
        <Dustbin greedy id="2">
          <Dustbin greedy id="3" />
        </Dustbin>
      </Dustbin>
      <Dustbin id="4">
        <Dustbin id="5">
          <Dustbin id="6" />
        </Dustbin>
      </Dustbin>
    </div>

    <div style={{ overflow: 'hidden', clear: 'both', marginTop: '1.5rem' }}>
      <Box />
    </div>
  </div>
)
export default Container
