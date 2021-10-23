import React from 'react'

function TextError(props) {
  return <div style={{ color: "red", fontSize: "12px" }} className='error'>{props.children}</div>
}

export default TextError
