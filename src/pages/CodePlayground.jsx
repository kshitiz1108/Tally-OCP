import React, { useState } from 'react';
import { Box, Input, Button, VStack, HStack, Text } from '@chakra-ui/react';
import Codeeditor from '../components/codeeditor';

const CodePlayground = () => {
  const [testcaseInput, setTestcaseInput] = useState("");
  const [testcases, setTestcases] = useState([]);

  const handleAddTestCase = () => {
    if (testcaseInput.trim()) {
      setTestcases([...testcases, testcaseInput.trim()]);
      setTestcaseInput("");
    }
  };

  return (
    <Box minH="100vh" bg="#0f0a19" color="gray.500" px={6} py={8}>
      <VStack spacing={6} align="start">
        <Box width="100%">
          <Codeeditor testcases={testcases} />
        </Box>
        <VStack spacing={4} align="start" width="100%">
          <Text fontSize="lg" mb={2}>Add Test Cases:</Text>
          <HStack spacing={4} width="100%">
            <Input
              placeholder="Enter test case input"
              value={testcaseInput}
              onChange={(e) => setTestcaseInput(e.target.value)}
              width="80%"
            />
            <Button colorScheme="teal" onClick={handleAddTestCase}>
              Add Test Case
            </Button>
          </HStack>
          <Box width="100%" mt={4}>
            {testcases.length > 0 && (
              <VStack spacing={2} align="start">
                <Text fontSize="lg" mb={2}>Test Cases:</Text>
                {testcases.map((testcase, index) => (
                  <Box key={index} p={2} borderWidth="1px" borderRadius="md" width="100%">
                    <Text fontWeight="semibold">Test Case {index + 1}:</Text>
                    <Text>{testcase}</Text>
                  </Box>
                ))}
              </VStack>
            )}
          </Box>
        </VStack>
      </VStack>
    </Box>
  );
};

export default CodePlayground;
