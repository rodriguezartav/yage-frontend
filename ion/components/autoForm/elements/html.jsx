import React from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg'
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "./style.css";


class HTMLEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }

  componentDidMount(){
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(nextProps){
    if(!nextProps.value) return;
    const html = nextProps.value;
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.setState({
        editorState,
      });
    }
  }

  onChange(e){
    var html = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    this.props.onChange(this.props.datakey, html);
  }

  onEditorStateChange(editorState){
    this.setState({
      editorState
    });
  };

  render() {
    const { editorState } = this.state;
    return <div
      onMouseLeave={this.onChange.bind(this)}
      ><Editor
      editorState={editorState}
      onEditorStateChange={this.onEditorStateChange.bind(this)}
      editorClassName="editor-class"
      toolbar={{ options: ['inline', 'link', 'emoji','list','blockType'] }}
    />
    </div>
  }
}

export default HTMLEditor;
