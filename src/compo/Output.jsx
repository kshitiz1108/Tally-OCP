import React, { useState } from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import axios from 'axios';

const encodeBase64 = (string) => {
  return btoa(unescape(encodeURIComponent(string)));
};

const Output = ({ language, problemId, submittedCode, testcases, userId }) => {
  const [output, setOutput] = useState('');
  userId = '66b74a322f11130cbdb2a188';

  const runCode = async () => {
    const submissionTimestamp = new Date().toISOString();
    const base64Code = encodeBase64(submittedCode);

    const base64Testcases = testcases.map((testcase) => ({
      test_case: {
        input: encodeBase64(testcase.input),
        expected_output: encodeBase64(testcase.expected_output),
      },
      passed: null,
    }));

    console.log('Encoded Test Cases:', base64Testcases);

    const data = {
      problem_id: problemId,
      user_id: userId,
      submission_timestamp: submissionTimestamp,
      code: base64Code,
      language,
      status: 'submitted',
      type: 'run',
      test_cases: base64Testcases,
    };

    console.log('Submitting code with the following data:', data);

    try {
      const response = await axios.post('http://localhost:3000/submission/add', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const submissionId = response.data._id;
      console.log('Response:', submissionId);

      let compilationEndpoint = '';
      if (language === 'cpp') {
        compilationEndpoint = 'cpp';
      } else if (language === 'java') {
        compilationEndpoint = 'java';
      } else if (language === 'python') {
        compilationEndpoint = 'python';
      }

      const compilationResponse = await axios.post(`http://localhost:3000/api/compilation/compile/${compilationEndpoint}`, {
        submission_id: submissionId
      });

      console.log('Compilation Response:', compilationResponse.data);
      setOutput('Congratulations your all test cases are passed!!');

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
        Submit
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
    </Box>
  );
};

export default Output;
