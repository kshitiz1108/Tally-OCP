import React, { useEffect, useState } from 'react';
import {
  Box, Text, VStack, Badge, Button, Input, Textarea, HStack, Divider,
} from '@chakra-ui/react';
import Codeeditor from '../components/codeeditor';

const ProblemPage = () => {
  const [problem, setProblem] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newTestCase, setNewTestCase] = useState({ input: '', output: '' });

  useEffect(() => {
    // Simulate fetching the problem with dummy data
    const dummyProblem = {
      _id: '1',
      title: 'Two Sum',
      desc: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to the target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.',
      constraints: '2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9\nOnly one valid answer exists.',
      testcases: [
        { input: '[2, 7, 11, 15], target = 9', output: '[0, 1]' },
        { input: '[3, 2, 4], target = 6', output: '[1, 2]' },
      ],
      time_limit: 1, // 1 second
      memory_limit: 256, // 256 MB
      is_public: true,
      wrong_submissions: 50,
      correct_submissions: 150,
      code_stubs: ['function twoSum(nums, target) { /* your code here */ }'],
      creator_id: 'user123',
      likes: 42,
    };

    setProblem(dummyProblem);
  }, []);

  const handleAddTestCase = () => {
    if (newTestCase.input && newTestCase.output) {
      setProblem((prevProblem) => ({
        ...prevProblem,
        testcases: [...prevProblem.testcases, newTestCase],
      }));
      setNewTestCase({ input: '', output: '' });
    }
  };

  const handleEditTestCase = (index) => {
    const testCase = problem.testcases[index];
    setNewTestCase(testCase);
    setEditingIndex(index);
  };

  const handleSaveTestCase = () => {
    const updatedTestCases = [...problem.testcases];
    updatedTestCases[editingIndex] = newTestCase;
    setProblem((prevProblem) => ({
      ...prevProblem,
      testcases: updatedTestCases,
    }));
    setNewTestCase({ input: '', output: '' });
    setEditingIndex(null);
  };

  const handleCancelEdit = () => {
    setNewTestCase({ input: '', output: '' });
    setEditingIndex(null);
  };

  return (
    <Box minH="100vh" bgGradient="linear(to-r, #0f0a19, #1b1b2f)" color="gray.300" px={6} py={8}>
      <Box bg="gray.800" p={8} borderRadius="md" shadow="md" maxW="4xl" mx="auto">
        {problem && (
          <>
            <Text fontSize="3xl" fontWeight="bold" color="teal.300" mb={4}>{problem.title}</Text>
            <Text fontSize="lg" mb={6}>{problem.desc}</Text>

            <VStack align="start" spacing={3}>
              <Text fontSize="md" color="teal.400">Constraints:</Text>
              <Box bg="gray.900" p={4} borderRadius="md" width="100%">
                <Text whiteSpace="pre-wrap">{problem.constraints}</Text>
              </Box>
              <HStack spacing={6} mt={4}>
                <Text>Time Limit: <strong>{problem.time_limit} second(s)</strong></Text>
                <Text>Memory Limit: <strong>{problem.memory_limit} MB</strong></Text>
              </HStack>
              <HStack spacing={6} mt={4}>
                <Text>Correct Submissions: <strong>{problem.correct_submissions}</strong></Text>
                <Text>Wrong Submissions: <strong>{problem.wrong_submissions}</strong></Text>
              </HStack>
              <Text mt={2}>Likes: <strong>{problem.likes}</strong></Text>
              {problem.is_public ? (
                <Badge colorScheme="green" mt={2}>Public</Badge>
              ) : (
                <Badge colorScheme="red" mt={2}>Private</Badge>
              )}

              <Box mt={6} width="100%">
                <Text fontSize="lg" fontWeight="bold" color="teal.400">Test Cases:</Text>
                {problem.testcases.map((testcase, index) => (
                  <Box key={index} p={4} borderWidth="1px" borderRadius="md" mt={4} bg="gray.700">
                    <HStack justifyContent="space-between">
                      <Text fontWeight="semibold">Test Case {index + 1}:</Text>
                      <Button size="sm" colorScheme="teal" variant="outline" onClick={() => handleEditTestCase(index)}>Edit</Button>
                    </HStack>
                    <Text mt={2}><strong>Input:</strong> {testcase.input}</Text>
                    <Text mt={1}><strong>Expected Output:</strong> {testcase.output}</Text>
                  </Box>
                ))}
              </Box>

              <Box mt={6} width="100%">
                <Text fontSize="lg" fontWeight="bold" color="teal.400">
                  {editingIndex !== null ? 'Edit Test Case' : 'Add New Test Case'}
                </Text>
                <Input
                  mt={3}
                  placeholder="Input"
                  value={newTestCase.input}
                  onChange={(e) => setNewTestCase({ ...newTestCase, input: e.target.value })}
                  bg="gray.700"
                  color="white"
                  _placeholder={{ color: 'gray.400' }}
                  focusBorderColor="teal.400"
                  borderRadius="md"
                />
                <Textarea
                  mt={3}
                  placeholder="Expected Output"
                  value={newTestCase.output}
                  onChange={(e) => setNewTestCase({ ...newTestCase, output: e.target.value })}
                  bg="gray.700"
                  color="white"
                  _placeholder={{ color: 'gray.400' }}
                  focusBorderColor="teal.400"
                  borderRadius="md"
                />
                <HStack spacing={3} mt={3}>
                  {editingIndex !== null ? (
                    <>
                      <Button colorScheme="teal" onClick={handleSaveTestCase} borderRadius="md">Save</Button>
                      <Button colorScheme="gray" onClick={handleCancelEdit} borderRadius="md">Cancel</Button>
                    </>
                  ) : (
                    <Button colorScheme="teal" onClick={handleAddTestCase} borderRadius="md">Add Test Case</Button>
                  )}
                </HStack>
              </Box>
            </VStack>
          </>
        )}
      </Box>

      {problem && (
        <Box mt={8}>
          <Codeeditor
            problemId={problem._id}
            testcases={problem.testcases}
          />
        </Box>
      )}
    </Box>
  );
};

export default ProblemPage;
