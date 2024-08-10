import { Box, Button, Text } from '@chakra-ui/react';
import React from 'react';

const Output = ({ language, problemId, submittedCode, testcases }) => {

  const runCode = async () => {
    const data = {
      language,
      problemId,
      submittedCode,
      testcases
    };

    console.log('Running code with the following data:', data);

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
        borderRadius={4}
        overflow="auto"
      >
        Click "Run Code" to see the output here
      </Box>
    </Box>
  );
};

export default Output;