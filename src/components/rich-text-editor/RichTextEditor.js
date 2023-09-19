// import React from 'react';
// import {Editor, EditorState, RichUtils} from 'draft-js';
 
// const RichTextEditor = () => {
//   const [editorState, setEditorState] = React.useState(
//     EditorState.createEmpty()
//   );
 
//   const editor = React.useRef(null);
 
//   function focusEditor() {
//     editor.current.focus();
//   }
 
//   React.useEffect(() => {
//     focusEditor()
//   }, []);

//   const handleChange = editorState => setEditorState(editorState)

//   const handleKeyCommand = (command, editorState) => {
//     const newState = RichUtils.handleKeyCommand(editorState, command);

//     if (newState) {
//       handleChange(newState);
//       return 'handled';
//     }

//     return 'not-handled';
//   }
 
//   return (
//     <div onClick={focusEditor}>
//       <Editor
//         ref={editor}
//         editorState={editorState}
//         handleKeyCommand={handleKeyCommand}
//         onChange={handleChange}
//       />
//     </div>
//   );
// }

// export default RichTextEditor;

import React, { useState } from "react";

import { convertToRaw, EditorState, RichUtils } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";

import PropTypes from 'prop-types'

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";
import './RichEditor.css';

const RichTextEditor = ({ showDraftToHtml }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleChange = value => setEditorState(value)

  const handleKeyCommand = (command, value) => {
    const newState = RichUtils.handleKeyCommand(value, command);
    if (newState) {
      handleChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  return (
    <>
      <Editor
        defaultEditorState={editorState}
        onEditorStateChange={handleChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
      { showDraftToHtml &&
        <div className="code-view">
          <p>HTML View </p>
          <textarea
            className="text-area"
            disabled
            value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
          />
        </div>
      }
    </>
  );
};

RichTextEditor.defaultProps = {
  showDraftToHtml: false,
}

RichTextEditor.propTypes = {
  showDraftToHtml: PropTypes.bool,
}

export default RichTextEditor;