import React, { useState, useEffect } from 'react';
import {
  Box, Button, Input, VStack, Select, Text, Textarea, HStack, Heading, SimpleGrid, Divider, IconButton,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import axios from 'axios';

const CreateContest = () => {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState('');
  const [problems, setProblems] = useState([]);
  const [selectedProblems, setSelectedProblems] = useState([]);
  const [newProblem, setNewProblem] = useState({
    title: '',
    desc: '',
    constraints: '',
    time_limit: '',
    memory_limit: '',
    is_public: true,
    testcases: [],
  });

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get('https://tally-ocp-backend.onrender.com/problems');
        setProblems(response.data);
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };

    fetchProblems();
  }, []);

  const handleAddProblem = (problem) => {
    if (selectedProblems.length < 4) {
      setSelectedProblems([...selectedProblems, problem]);
    }
  };

  const handleCreateProblem = async () => {
    if (selectedProblems.length < 4) {
      try {
        console.log(newProblem);
        const response = await axios.post('https://tally-ocp-backend.onrender.com/problems/add', newProblem);
        console.log(response.data.problem);
        const createdProblem = response.data.problem;
        setSelectedProblems([...selectedProblems, createdProblem]);
        setNewProblem({
          title: '',
          desc: '',
          constraints: '',
          time_limit: '',
          memory_limit: '',
          is_public: false,
          testcases: [],
        });
      } catch (error) {
        console.error("Error creating problem:", error);
      }
    }
  };

  const handleNextStep = () => {
    if (step === 1 && title && startTime && duration) {
      setStep(2);
    }
  };

  const handleRemoveProblem = (index) => {
    const updatedProblems = selectedProblems.filter((_, i) => i !== index);
    setSelectedProblems(updatedProblems);
  };

  const handleCreateContest = async () => {
    try {
      const contestData = {
        title,
        start_time: startTime,
        duration,
        problems: selectedProblems.map(problem => ({ problem: problem._id, score: 100 })), // Assuming a default score
      };

      await axios.post('http://localhost:3000/contests/add', contestData);
      setTitle('');
      setStartTime('');
      setDuration('');
      setSelectedProblems([]);
      setStep(1);
    } catch (error) {
      console.error('Error creating contest:', error);
    }
  };

  return (
    <Box p={8} maxW="900px" mx="auto" bg="gray.800" borderRadius="md" shadow="lg" color="white">
      {step === 1 && (
        <VStack spacing={6}>
          <Heading as="h2" size="lg" color="teal.300">Create New Contest</Heading>
          <Input
            placeholder="Contest Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            size="lg"
            bg="gray.700"
            borderColor="teal.500"
            _placeholder={{ color: 'gray.400' }}
          />
          <Input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            size="lg"
            bg="gray.700"
            borderColor="teal.500"
          />
          <Input
            placeholder="Duration (minutes)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            size="lg"
            bg="gray.700"
            borderColor="teal.500"
            _placeholder={{ color: 'gray.400' }}
          />
          <Button colorScheme="teal" onClick={handleNextStep} size="lg" w="full">
            Next
          </Button>
        </VStack>
      )}

      {step === 2 && (
        <VStack spacing={6}>
          <Heading as="h2" size="lg" color="teal.300">Add Problems to Contest</Heading>
          <Text fontSize="md" color="gray.400">You can add up to 4 problems.</Text>

          {selectedProblems.length < 4 && (
            <VStack spacing={4} w="full">
              <Select
                placeholder="Select existing problem"
                onChange={(e) => handleAddProblem(problems.find(p => p._id === e.target.value))}
                size="lg"
                bg="gray.700"
                borderColor="teal.500"
                _placeholder={{ color: 'gray.400' }}
              >
                {problems.map((problem) => (
                  <option key={problem._id} value={problem._id}>{problem.title}</option>
                ))}
              </Select>

              <Text fontSize="md" color="gray.400">Or create a new problem:</Text>
              <VStack spacing={3} w="full" p={4} bg="gray.700" borderRadius="md" shadow="md">
                <Input
                  placeholder="Problem Title"
                  value={newProblem.title}
                  onChange={(e) => setNewProblem({ ...newProblem, title: e.target.value })}
                  size="lg"
                  bg="gray.600"
                  borderColor="teal.500"
                  _placeholder={{ color: 'gray.400' }}
                />
                <Textarea
                  placeholder="Problem Description"
                  value={newProblem.desc}
                  onChange={(e) => setNewProblem({ ...newProblem, desc: e.target.value })}
                  size="lg"
                  bg="gray.600"
                  borderColor="teal.500"
                  _placeholder={{ color: 'gray.400' }}
                />
                <Textarea
                  placeholder="Constraints"
                  value={newProblem.constraints}
                  onChange={(e) => setNewProblem({ ...newProblem, constraints: e.target.value })}
                  size="lg"
                  bg="gray.600"
                  borderColor="teal.500"
                  _placeholder={{ color: 'gray.400' }}
                />
                <HStack spacing={4}>
                  <Input
                    placeholder="Time Limit (ms)"
                    value={newProblem.time_limit}
                    onChange={(e) => setNewProblem({ ...newProblem, time_limit: e.target.value })}
                    size="lg"
                    bg="gray.600"
                    borderColor="teal.500"
                    _placeholder={{ color: 'gray.400' }}
                  />
                  <Input
                    placeholder="Memory Limit (MB)"
                    value={newProblem.memory_limit}
                    onChange={(e) => setNewProblem({ ...newProblem, memory_limit: e.target.value })}
                    size="lg"
                    bg="gray.600"
                    borderColor="teal.500"
                    _placeholder={{ color: 'gray.400' }}
                  />
                </HStack>
                <Button colorScheme="blue" onClick={handleCreateProblem} leftIcon={<AddIcon />}>
                  Add Problem
                </Button>
              </VStack>
            </VStack>
          )}

          <SimpleGrid columns={[1, 2]} spacing={4} w="full">
            {selectedProblems.map((problem, index) => (
              <Box key={index} p={4} bg="gray.600" borderRadius="md" shadow="md" position="relative">
                <IconButton
                  icon={<DeleteIcon />}
                  size="sm"
                  colorScheme="red"
                  position="absolute"
                  top={2}
                  right={2}
                  onClick={() => handleRemoveProblem(index)}
                />
                <Text fontSize="lg" fontWeight="bold">{problem.title}</Text>
              </Box>
            ))}
          </SimpleGrid>

          <Divider />
          <Button
            colorScheme="teal"
            size="lg"
            w="full"
            onClick={handleCreateContest}
          >
            Create Contest
          </Button>
        </VStack>
      )}
    </Box>
  );
};

export default CreateContest;
