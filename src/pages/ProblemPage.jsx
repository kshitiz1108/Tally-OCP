import React, { useEffect, useState } from 'react';
import {
  Box, Text, VStack, Badge, Button, Input, Textarea, HStack,
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
    <>
      <Box p={5}>
        {problem && (
          <>
            <Text fontSize="2xl" fontWeight="bold">{problem.title}</Text>
            <Text mt={4}>{problem.desc}</Text>
            <VStack align="start" mt={4} spacing={3}>
              <Text>Constraints:</Text>
              <pre>{problem.constraints}</pre>
              <Text>Time Limit: {problem.time_limit} second(s)</Text>
              <Text>Memory Limit: {problem.memory_limit} MB</Text>
              <Text>Correct Submissions: {problem.correct_submissions}</Text>
              <Text>Wrong Submissions: {problem.wrong_submissions}</Text>
              <Text>Likes: {problem.likes}</Text>
              {problem.is_public ? <Badge colorScheme="green">Public</Badge> : <Badge colorScheme="red">Private</Badge>}

              <Box mt={4} width="100%">
                <Text fontSize="lg" fontWeight="bold">Test Cases:</Text>
                {problem.testcases.map((testcase, index) => (
                  <Box key={index} p={3} borderWidth="1px" borderRadius="md" mt={2}>
                    <HStack justifyContent="space-between">
                      <Text fontWeight="semibold">Test Case {index + 1}:</Text>
                      <Button size="sm" onClick={() => handleEditTestCase(index)}>Edit</Button>
                    </HStack>
                    <Text mt={2}><strong>Input:</strong> {testcase.input}</Text>
                    <Text mt={1}><strong>Expected Output:</strong> {testcase.output}</Text>
                  </Box>
                ))}
              </Box>

              <Box mt={6}>
                <Text fontSize="lg" fontWeight="bold">
                  {editingIndex !== null ? 'Edit Test Case' : 'Add New Test Case'}
                </Text>
                <Input
                  mt={2}
                  placeholder="Input"
                  value={newTestCase.input}
                  onChange={(e) => setNewTestCase({ ...newTestCase, input: e.target.value })}
                />
                <Textarea
                  mt={2}
                  placeholder="Expected Output"
                  value={newTestCase.output}
                  onChange={(e) => setNewTestCase({ ...newTestCase, output: e.target.value })}
                />
                <HStack spacing={3} mt={2}>
                  {editingIndex !== null ? (
                    <>
                      <Button colorScheme="teal" onClick={handleSaveTestCase}>Save</Button>
                      <Button colorScheme="gray" onClick={handleCancelEdit}>Cancel</Button>
                    </>
                  ) : (
                    <Button colorScheme="teal" onClick={handleAddTestCase}>Add Test Case</Button>
                  )}
                </HStack>
              </Box>
            </VStack>
          </>
        )}
      </Box>
      {problem && (
        <Codeeditor
          problemId={problem._id}
          testcases={problem.testcases}
        />
      )}
    </>
  );
};

export default ProblemPage;
