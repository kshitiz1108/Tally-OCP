import React, { useEffect, useState } from 'react';
import { Box, Text, VStack, HStack, Badge, Spinner, Button, Flex, Icon } from '@chakra-ui/react';
import axios from 'axios';
import { FaThumbsUp } from 'react-icons/fa';

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
    return (
      <Flex justify="center" align="center" minHeight="100vh">
        <Spinner size="xl" color="teal.500" />
      </Flex>
    );
  }

  return (
    <VStack spacing={6} py={8} px={4} maxW="5xl" mx="auto" bgGradient="linear(to-r, #0f0a19, #1b1b2f)" borderRadius="md" shadow="xl">
      {problems.map(problem => (
        <Box key={problem._id} p={6} bg="gray.800" borderRadius="md" shadow="md" width="100%" _hover={{ shadow: "lg" }} transition="all 0.3s ease">
          <HStack justifyContent="space-between">
            <Text fontSize="2xl" fontWeight="bold" color="teal.300">{problem.title}</Text>
            <Badge colorScheme="green" fontSize="0.9em" px={3} py={1}>Public</Badge>
          </HStack>
          <Text mt={4} fontSize="lg" color="gray.300">{problem.desc}</Text>
          <Text mt={4} color="gray.400" fontSize="sm" whiteSpace="pre-wrap">Constraints: {problem.constraints}</Text>
          <HStack mt={6} spacing={8}>
            <Text color="gray.400">Time Limit: <strong>{problem.time_limit} ms</strong></Text>
            <Text color="gray.400">Memory Limit: <strong>{problem.memory_limit} MB</strong></Text>
          </HStack>
          <HStack mt={4} spacing={8}>
            <Text color="gray.400">Correct Submissions: <strong>{problem.correct_submissions}</strong></Text>
            <Text color="gray.400">Wrong Submissions: <strong>{problem.wrong_submissions}</strong></Text>
          </HStack>
          <HStack mt={6} justifyContent="space-between">
            <Button size="sm" colorScheme="teal" variant="outline" borderRadius="md">Solve Problem</Button>
            <HStack>
              <Icon as={FaThumbsUp} color="teal.400" />
              <Text color="gray.400">{problem.likes}</Text>
            </HStack>
          </HStack>
        </Box>
      ))}
    </VStack>
  );
};

export default AllProblem;
