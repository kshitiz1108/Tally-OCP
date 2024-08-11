import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  Checkbox,
  Stack,
  Text,
  IconButton,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddProblem = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [constraints, setConstraints] = useState('');
  const [testCases, setTestCases] = useState([{ input: '', expected_output: '', isHidden: false }]);
  const [timeLimit, setTimeLimit] = useState(1);
  const [memoryLimit, setMemoryLimit] = useState(256);
  const [isPublic, setIsPublic] = useState(false);
  const [codeStubs, setCodeStubs] = useState(['']);
  const navigate = useNavigate();

  const handleAddTestCase = () => {
    setTestCases([...testCases, { input: '', expected_output: '', isHidden: false }]);
  };

  const handleRemoveTestCase = (index) => {
    const updatedTestCases = [...testCases];
    updatedTestCases.splice(index, 1);
    setTestCases(updatedTestCases);
  };

  const handleAddCodeStub = () => {
    setCodeStubs([...codeStubs, '']);
  };

  const handleRemoveCodeStub = (index) => {
    const updatedCodeStubs = [...codeStubs];
    updatedCodeStubs.splice(index, 1);
    setCodeStubs(updatedCodeStubs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const creatorId = '66b74a322f11130cbdb2a188'; 

    const problemData = {
      title,
      desc,
      constraints,
      testcases: testCases,
      time_limit: timeLimit,
      memory_limit: memoryLimit,
      is_public: isPublic,
      code_stubs: codeStubs,
      creator_id: creatorId,
    };

    try {
      await axios.post('https://tally-ocp-backend.onrender.com/problems/add', problemData);
      console.log('Problem Data:', problemData);
      navigate('/all-problem'); 
    } catch (error) {
      console.error('Error submitting problem:', error);
    }
  };

  return (
    <Box w="70%" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl id="title" isRequired>
            <FormLabel>Title</FormLabel>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter problem title" />
          </FormControl>
          <FormControl id="desc" isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Enter problem description" />
          </FormControl>
          <FormControl id="constraints">
            <FormLabel>Constraints</FormLabel>
            <Textarea value={constraints} onChange={(e) => setConstraints(e.target.value)} placeholder="Enter problem constraints" />
          </FormControl>

          <Text fontSize="lg" fontWeight="bold">Test Cases</Text>
          {testCases.map((testCase, index) => (
            <Box key={index} borderWidth={1} p={4} borderRadius="md">
              <FormControl id={`test-case-input-${index}`}>
                <FormLabel>Input</FormLabel>
                <Textarea
                  value={testCase.input}
                  onChange={(e) => {
                    const updatedTestCases = [...testCases];
                    updatedTestCases[index].input = e.target.value;
                    setTestCases(updatedTestCases);
                  }}
                  placeholder="Enter test case input"
                />
              </FormControl>
              <FormControl id={`test-case-output-${index}`}>
                <FormLabel>Expected Output</FormLabel>
                <Textarea
                  value={testCase.expected_output}
                  onChange={(e) => {
                    const updatedTestCases = [...testCases];
                    updatedTestCases[index].expected_output = e.target.value;
                    setTestCases(updatedTestCases);
                  }}
                  placeholder="Enter expected output"
                />
              </FormControl>
              <Checkbox
                isChecked={testCase.isHidden}
                onChange={(e) => {
                  const updatedTestCases = [...testCases];
                  updatedTestCases[index].isHidden = e.target.checked;
                  setTestCases(updatedTestCases);
                }}
              >
                Hidden Test Case
              </Checkbox>
              <IconButton
                aria-label="Remove Test Case"
                icon={<DeleteIcon />}
                colorScheme="red"
                size="sm"
                mt={2}
                onClick={() => handleRemoveTestCase(index)}
              />
            </Box>
          ))}
          <Button leftIcon={<AddIcon />} onClick={handleAddTestCase}>
            Add Test Case
          </Button>

          <FormControl id="time_limit">
            <FormLabel>Time Limit (in seconds)</FormLabel>
            <NumberInput value={timeLimit} onChange={(value) => setTimeLimit(Number(value))} min={1}>
              <NumberInputField />
            </NumberInput>
          </FormControl>
          <FormControl id="memory_limit">
            <FormLabel>Memory Limit (in MB)</FormLabel>
            <NumberInput value={memoryLimit} onChange={(value) => setMemoryLimit(Number(value))} min={16}>
              <NumberInputField />
            </NumberInput>
          </FormControl>
          <FormControl id="is_public">
            <Checkbox isChecked={isPublic} onChange={(e) => setIsPublic(e.target.checked)}>
              Public Problem
            </Checkbox>
          </FormControl>

          <Text fontSize="lg" fontWeight="bold">Code Stubs</Text>
          {codeStubs.map((codeStub, index) => (
            <Box key={index} borderWidth={1} p={4} borderRadius="md">
              <FormControl id={`code-stub-${index}`}>
                <Textarea
                  value={codeStub}
                  onChange={(e) => {
                    const updatedCodeStubs = [...codeStubs];
                    updatedCodeStubs[index] = e.target.value;
                    setCodeStubs(updatedCodeStubs);
                  }}
                  placeholder="Enter code stub"
                />
              </FormControl>
              <IconButton
                aria-label="Remove Code Stub"
                icon={<DeleteIcon />}
                colorScheme="red"
                size="sm"
                mt={2}
                onClick={() => handleRemoveCodeStub(index)}
              />
            </Box>
          ))}
          <Button leftIcon={<AddIcon />} onClick={handleAddCodeStub}>
            Add Code Stub
          </Button>

          <Button type="submit" colorScheme="teal">
            Add Problem
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AddProblem;
