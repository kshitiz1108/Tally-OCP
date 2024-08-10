import React, { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { Box, HStack, Button } from '@chakra-ui/react';
import LanguageSelector from './LanguageSelector';
import Output from './Output';

const Codeeditor = ({ problemId, testcases }) => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
  };

  const handleRunCode = () => {
    const dataToSave = {
      problemId,
      submittedCode: editorRef.current.getValue(),
      testcases,
    };

    console.log('Data being saved:', dataToSave);
    return dataToSave;
  };

  return (
    <Box>
      <HStack spacing={4}>
        <Box w="50%">
          <LanguageSelector language={language} onSelect={onSelect} />
          <Editor
            height="75vh"
            theme="vs-dark"
            language={language}
            defaultValue="//some comment"
            onMount={onMount}
            value={value}
            onChange={(value) => setValue(value)}
          />
        </Box>
        <Output 
          language={language} 
          problemId={problemId} 
          submittedCode={value} 
          testcases={testcases} 
        />
      </HStack>
    </Box>
  );
};

export default Codeeditor;
