import React, { Component } from 'react'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import HtmlContent from './HtmlContent';

export default class TextEditor extends Component {
    state = {
        editorState : EditorState.createEmpty(),
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        })
    }
  render() {
    const {editorState} = this.state;
    // console.log(convertToRaw(editorState.getCurrentContent()))
    let html = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    // this.props.x = html;
    // console.log(html)
    return (
        <div style={style}>
        <div style={{width: '100%', height: '300px',   overflow: 'scroll',
    scrollBehavior: 'smooth'}}>
              <Editor
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={this.onEditorStateChange}
              />
                {/* html content converter bellow */}
              {/* <HtmlContent content={html}
              
              /> */}
        </div>
      </div>
    )
  }
}

const style = {
    width: '100%', 
    height: '300px',
    backgroundColor: 'white',
    border:'1px solid rgba(90,90,90,0.3)',  
    paddingTop: '10px', 
    paddingLeft: '10px',
    paddingRight: '10px',
    overflow:'hidden',
    borderRadius:'5px',
    marginTop:'25px',
 
    
}
