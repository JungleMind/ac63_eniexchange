import React from 'react'

export default function HtmlContent(props) {
  return (
    <div style={style}>
        <div dangerouslySetInnerHTML={{__html: props.content}} />
    </div>
  )
}

const style = {
    backgroundColor: '#B0AEAEA3',
}