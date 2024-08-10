import React, { useEffect, useState } from 'react';
import { Box, Text, VStack, HStack, Badge, Spinner } from '@chakra-ui/react';
import axios from 'axios';

const AllProblem = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get('https://tally-ocp-backend.onrender.com/problems');
        const publicProblems = response.data.filter(problem => problem.is_public);
        setProblems(publicProblems);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching problems:", error);
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  if (loading) {
    return <Spinner size="xl" />;
  }

  return (
    <VStack spacing={4}>
      {problems.map(problem => (
        <Box key={problem._id} p={5} shadow="md" borderWidth="1px" width="100%">
          <HStack justifyContent="space-between">
            <Text fontSize="xl">{problem.title}</Text>
            <Badge colorScheme="green">Public</Badge>
          </HStack>
          <Text mt={2} color="gray.500">{problem.desc}</Text>
          <Text mt={2} color="gray.600">Constraints: {problem.constraints}</Text>
          <HStack mt={4} spacing={6}>
            <Text>Time Limit: {problem.time_limit} ms</Text>
            <Text>Memory Limit: {problem.memory_limit} MB</Text>
          </HStack>
          <HStack mt={4} spacing={6}>
            <Text>Correct Submissions: {problem.correct_submissions}</Text>
            <Text>Wrong Submissions: {problem.wrong_submissions}</Text>
          </HStack>
          <Text mt={2}>Likes: {problem.likes}</Text>
        </Box>
      ))}
    </VStack>
  );
};

export default AllProblem;
