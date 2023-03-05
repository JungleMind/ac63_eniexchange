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
    borderTop: '1px solid rgba(90,90,90,0.5)',
    width: '100%',
    paddingLeft: '20px',
    paddingRight: '20px',
    textAlign: 'left',
    paddingTop:'20px'
}