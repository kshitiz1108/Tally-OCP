import React, { useState } from 'react';
import { Box, Button, Text, Textarea, VStack } from '@chakra-ui/react';
import axios from 'axios';

const encodeBase64 = (string) => {
  return btoa(unescape(encodeURIComponent(string)));
};

const Output = ({ language, problemId, submittedCode }) => {
  const [output, setOutput] = useState('');
  const [testcaseInput, setTestcaseInput] = useState('');

  const handleInputChange = (e) => {
    setTestcaseInput(e.target.value);
  };

  const runCode = async () => {
    const _id = "66b74a322f11130cbdb2a188";
    const base64Code = encodeBase64(submittedCode);
    const base64Testcase = encodeBase64(testcaseInput); 

    const data = {
      codeBase64: base64Code,
      testcaseBase64: base64Testcase,
      submission_id: _id,
    };

    console.log('Running code with the following data:', data);

    try {
      const response = await axios.post('http://localhost:3000/api/compilation/execute', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Response:', response.data);
      setOutput(response.data.output);
    } catch (error) {
      console.error('Error running code:', error.response || error.message);
      setOutput('Error: Unable to run code.');
    }
  };

  return (
    <Box w="50%">
      <Text mb={2} fontSize="lg">
        Output
      </Text>
      <Button
        variant="outline"
        colorScheme="green"
        mb={4}
        onClick={runCode}
      >
        Run Code
      </Button>
      <Box
        id="output-box"
        height="75vh"
        p={2}
        border="1px solid"
        borderRadius="4px"
        overflow="auto"
      >
        {output || 'Click "Run Code" to see the output here'} 
      </Box>
      <VStack spacing={4} align="start" width="100%" bg="gray.800" p={6} borderRadius="md" shadow="md">
        <Text fontSize="xl" color="teal.300">Add Test Case:</Text>
        <Textarea
          placeholder="Enter test case inputs, each on a new line"
          value={testcaseInput} 
          onChange={handleInputChange}
          bg="gray.700"
          color="white"
          _placeholder={{ color: 'gray.400' }}
          focusBorderColor="teal.400"
          borderRadius="md"
          borderColor="gray.600"
          rows={4}
        />
      </VStack> 
    </Box>
  );
};

export default Output;
