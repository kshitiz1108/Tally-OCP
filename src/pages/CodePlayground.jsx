import React, { useState } from 'react';
import { Box, Input, Button, VStack, HStack, Text, Divider, IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
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

  const handleDeleteTestCase = (index) => {
    setTestcases(testcases.filter((_, i) => i !== index));
  };

  return (
    <Box minH="100vh" bgGradient="linear(to-r, #0f0a19, #1b1b2f)" color="gray.300" px={6} py={8}>
      <VStack spacing={6} align="start" width="100%">
        <Box width="100%" bg="gray.900" p={4} borderRadius="md" shadow="md">
          <Text fontSize="2xl" fontWeight="bold" color="teal.300" mb={4}>
            Code Playground
          </Text>
          <Codeeditor testcases={testcases} />
        </Box>

        <VStack spacing={4} align="start" width="100%" bg="gray.800" p={6} borderRadius="md" shadow="md">
          <Text fontSize="xl" color="teal.300">Add Test Cases:</Text>
          <HStack spacing={4} width="100%">
            <Input
              placeholder="Enter test case input"
              value={testcaseInput}
              onChange={(e) => setTestcaseInput(e.target.value)}
              bg="gray.700"
              color="white"
              _placeholder={{ color: 'gray.400' }}
              focusBorderColor="teal.400"
              borderRadius="md"
              borderColor="gray.600"
            />
            <Button colorScheme="teal" onClick={handleAddTestCase} borderRadius="md" px={6}>
              Add
            </Button>
          </HStack>
        </VStack>

        <Box width="100%" bg="gray.800" p={6} borderRadius="md" shadow="md" mt={4}>
          {testcases.length > 0 ? (
            <VStack spacing={4} align="start" width="100%">
              <Text fontSize="xl" color="teal.300">Test Cases:</Text>
              <Divider borderColor="gray.600" />
              {testcases.map((testcase, index) => (
                <HStack
                  key={index}
                  p={3}
                  borderWidth="1px"
                  borderRadius="md"
                  borderColor="gray.600"
                  width="100%"
                  bg="gray.700"
                  justify="space-between"
                >
                  <Box>
                    <Text fontWeight="bold" color="teal.300">Test Case {index + 1}:</Text>
                    <Text color="gray.300">{testcase}</Text>
                  </Box>
                  <IconButton
                    aria-label="Delete Test Case"
                    icon={<DeleteIcon />}
                    onClick={() => handleDeleteTestCase(index)}
                    variant="ghost"
                    colorScheme="red"
                    size="sm"
                  />
                </HStack>
              ))}
            </VStack>
          ) : (
            <Text color="gray.400">No test cases added yet.</Text>
          )}
        </Box>
      </VStack>
    </Box>
  );
};

export default CodePlayground;
