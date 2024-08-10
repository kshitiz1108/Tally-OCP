import React, { useEffect, useState } from 'react';
import { Box, Text, VStack, HStack, Badge } from '@chakra-ui/react';

const AllContests = () => {
  const [contests, setContests] = useState([]);

  useEffect(() => {
    // Simulate API call with dummy data
    const dummyContests = [
      {
        _id: '1',
        title: 'Live Coding Challenge',
        start_time: new Date(new Date().getTime() - 30 * 60000).toISOString(), // Started 30 minutes ago
        duration: 60, // 60 minutes
        problems: [
          { problem: { title: 'Problem 1' }, score: 100 },
          { problem: { title: 'Problem 2' }, score: 150 },
        ],
        creator_id: { name: 'Alice' }
      },
      {
        _id: '2',
        title: 'Future Hackathon',
        start_time: new Date(new Date().getTime() + 120 * 60000).toISOString(), // Starts in 2 hours
        duration: 180, // 180 minutes
        problems: [
          { problem: { title: 'Problem 3' }, score: 200 },
          { problem: { title: 'Problem 4' }, score: 250 },
        ],
        creator_id: { name: 'Bob' }
      },
      {
        _id: '3',
        title: 'Ongoing Contest',
        start_time: new Date(new Date().getTime() - 10 * 60000).toISOString(), // Started 10 minutes ago
        duration: 45,
        problems: [
          { problem: { title: 'Problem 5' }, score: 50 },
          { problem: { title: 'Problem 6' }, score: 100 },
        ],
        creator_id: { name: 'Charlie' }
      },
      {
        _id: '4',
        title: 'Upcoming Code Sprint',
        start_time: new Date(new Date().getTime() + 60 * 60000).toISOString(), // Starts in 1 hour
        duration: 120, // 120 minutes
        problems: [
          { problem: { title: 'Problem 7' }, score: 150 },
          { problem: { title: 'Problem 8' }, score: 200 },
        ],
        creator_id: { name: 'Dave' }
      },
    ];

    // Simulate API call delay
    setTimeout(() => {
      // Sort contests so that live contests come first
      const now = new Date();
      const sortedContests = dummyContests.sort((a, b) => {
        const aStartTime = new Date(a.start_time);
        const aEndTime = new Date(aStartTime.getTime() + a.duration * 60000);
        const bStartTime = new Date(b.start_time);
        const bEndTime = new Date(bStartTime.getTime() + b.duration * 60000);

        const aIsLive = aStartTime <= now && now <= aEndTime;
        const bIsLive = bStartTime <= now && now <= bEndTime;

        return bIsLive - aIsLive; // Sort live contests to the top
      });

      setContests(sortedContests);
    }, 500); // Simulate 0.5 second API call delay
  }, []);

  return (
    <VStack spacing={4}>
      {contests.map(contest => (
        <Box key={contest._id} p={5} shadow="md" borderWidth="1px" width="100%">
          <HStack justifyContent="space-between">
            <Text fontSize="xl">{contest.title}</Text>
            <Badge colorScheme={new Date(contest.start_time) <= new Date() ? "red" : "blue"}>
              {new Date(contest.start_time) <= new Date() ? "Live" : `${contest.duration} mins`}
            </Badge>
          </HStack>
          <Text mt={2} color="gray.500">
            Starts at: {new Date(contest.start_time).toLocaleString()}
          </Text>
          <VStack align="start" mt={4}>
            {contest.problems.map((item, index) => (
              <Text key={index}>
                Problem: {item.problem.title} - Score: {item.score}
              </Text>
            ))}
          </VStack>
        </Box>
      ))}
    </VStack>
  );
};

export default AllContests;
