import React, { useEffect, useState } from 'react';
import { Box, Flex, Text, VStack, Badge } from '@chakra-ui/react';

const HomePage = () => {
  const [contests, setContests] = useState([]);

  useEffect(() => {
    // Simulate API call with dummy data
    const dummyContests = [
      {
        _id: '1',
        title: 'Algorithm Challenge',
        start_time: '2024-08-09T12:00:00Z',
        duration: 120, // 120 minutes
      },
      {
        _id: '2',
        title: 'Frontend Masters',
        start_time: '2024-08-10T15:30:00Z',
        duration: 180, // 180 minutes
      },
      {
        _id: '3',
        title: 'Backend Bonanza',
        start_time: '2024-08-08T09:00:00Z',
        duration: 90, // 90 minutes
      },
      {
        _id: '4',
        title: 'Fullstack Frenzy',
        start_time: '2024-08-11T16:00:00Z',
        duration: 240, // 240 minutes
      },
      {
        _id: '5',
        title: 'Algorithm Challenge',
        start_time: '2024-08-09T12:00:00Z',
        duration: 120, // 120 minutes
      },
      {
        _id: '6',
        title: 'Frontend Masters',
        start_time: '2024-08-10T15:30:00Z',
        duration: 180, // 180 minutes
      },
      {
        _id: '7',
        title: 'Backend Bonanza',
        start_time: '2024-08-08T09:00:00Z',
        duration: 90, // 90 minutes
      },
      {
        _id: '8',
        title: 'Fullstack Frenzy',
        start_time: '2024-08-11T16:00:00Z',
        duration: 240, // 240 minutes
      },
    ];

    // Filter and sort live or recent contests
    const recentContests = dummyContests
      .filter(contest => {
        const currentTime = new Date();
        const contestEndTime = new Date(contest.start_time);
        contestEndTime.setMinutes(contestEndTime.getMinutes() + contest.duration);
        return currentTime < contestEndTime; // Return live contests
      })
      .sort((a, b) => new Date(b.start_time) - new Date(a.start_time))
      .slice(0, 3); // Limit to 3 contests

    setContests(recentContests);
  }, []);

  return (
    <Box p={5}>
      <Text fontSize="2xl" mb={4}>Live or Recent Contests</Text>
      <Flex overflowX="scroll" gap={4}>
        {contests.map(contest => (
          <Box key={contest._id} p={5} shadow="md" borderWidth="1px" width="300px" minWidth="300px" borderRadius="md">
            <Text fontSize="xl" fontWeight="bold">{contest.title}</Text>
            <Text mt={2} color="gray.500">Starts: {new Date(contest.start_time).toLocaleString()}</Text>
            <Text mt={2} color="gray.600">Duration: {contest.duration} minutes</Text>
            <Badge colorScheme="green" mt={2}>Live</Badge>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default HomePage;