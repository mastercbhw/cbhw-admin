import React from 'react'
import { Tooltip } from 'antd'


const NodeTooltip = ({ x = 0, y = 0, tooltipTitle = '' }) => (
  <Tooltip visible title={tooltipTitle} placement="topLeft" >
    <span style={{ position: 'absolute', backgroundColor: 'rgba(255, 255, 255, 0.9)', left: x, top: y }} />
  </Tooltip>
)

export default NodeTooltip
