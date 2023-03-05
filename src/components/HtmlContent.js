import React from 'react'

export default function HtmlContent(props) {
  return (
    <div style={style}>
        <div dangerouslySetInnerHTML={{__html: props.content}} />
    </div>
  )
}

const style = {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    border: '1px solid black',
    width: '100%',
    paddingLeft: '20px',
    paddingRight: '20px',
    textAlign: 'left',
}