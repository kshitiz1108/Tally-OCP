import React, { useRef, useState } from 'react'
import Editor from '@monaco-editor/react';
import {Box} from '@chakra-ui/react'
import LanguageSelector from './LanguageSelector';

const Codeeditor = () => {
    const editorRef = useRef();
    const [value, setValue] = useState("")

    const onMount = (editor) => {
        editorRef.current = editor;
        editor.focus();
      };


  return (
    <Box>
        <LanguageSelector/>
        <Editor  height="90vh"
           theme='vs-dark'
           defaultLanguage="javascript" 
           defaultValue="// some comment"
           onMount={onMount}
           value={value}
           onChange={(value) => {setValue(value)}} /> 
           {console.log(value)};
  </Box>
  )
}

export default Codeeditor