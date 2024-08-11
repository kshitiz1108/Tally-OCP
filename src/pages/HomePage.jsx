import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Text, VStack, Badge, Spinner } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await axios.get('http://localhost:3000/contests'); // Replace with your API endpoint
        const fetchedContests = response.data;
        const currentTime = new Date();

        const recentContests = fetchedContests
          .filter(contest => {
            const contestEndTime = new Date(contest.start_time);
            contestEndTime.setMinutes(contestEndTime.getMinutes() + contest.duration);
            return currentTime < contestEndTime;
          })
          .sort((a, b) => new Date(b.start_time) - new Date(a.start_time))
          .slice(0, 3);

        setContests(recentContests);
      } catch (error) {
        console.error("Error fetching contests:", error);
        setError("Failed to load contests. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  if (loading) {
    return (
      <Flex justify="center" align="center" minHeight="100vh">
        <Spinner size="xl" color="teal.500" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex justify="center" align="center" minHeight="100vh">
        <Text color="red.500">{error}</Text>
      </Flex>
    );
  }

  return (
    <Box p={5} bg="gray.800" color="white" minH="100vh">
      <VStack spacing={8} align="center">
        <Text fontSize="4xl" fontWeight="bold" mb={4}>Welcome to CodeArena</Text>
        
        <Flex direction={{ base: 'column', md: 'row' }} wrap="wrap" justify="center" gap={6}>
          <Button as={Link} to="/all-contests" colorScheme="teal" size="lg">
            View All Contests
          </Button>
          <Button as={Link} to="/all-problem" colorScheme="blue" size="lg">
            View All Problems
          </Button>
          <Button as={Link} to="/code-playground" colorScheme="purple" size="lg">
            Code Playground
          </Button>
        </Flex>

        <Text fontSize="2xl" fontWeight="bold" mb={4}>Live or Recent Contests</Text>
        <Flex overflowX="auto" gap={4} pb={4}>
          {contests.map(contest => (
            <Box
              key={contest._id}
              p={5}
              shadow="md"
              borderWidth="1px"
              borderRadius="md"
              bg="gray.700"
              width={{ base: '100%', sm: '300px' }}
              minWidth="300px"
            >
              <Text fontSize="xl" fontWeight="bold">{contest.title}</Text>
              <Text mt={2} color="gray.400">Starts: {new Date(contest.start_time).toLocaleString()}</Text>
              <Text mt={2} color="gray.300">Duration: {contest.duration} minutes</Text>
              <Badge colorScheme="green" mt={2}>Live</Badge>
            </Box>
          ))}
        </Flex>
      </VStack>
    </Box>
  );
};

export default HomePage;
