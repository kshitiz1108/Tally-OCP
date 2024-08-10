import React, { useEffect, useState } from 'react';
import { Box, Text, VStack, HStack, Badge, Button, Icon, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { FaClock, FaStar } from 'react-icons/fa';

const ContestPage = () => {
  const { contestId } = useParams();
  const [contest, setContest] = useState(null);

  useEffect(() => {
    const dummyContests = [
      {
        _id: '1',
        title: 'Live Coding Challenge',
        start_time: new Date(new Date().getTime() - 30 * 60000).toISOString(), // Started 30 minutes ago
        duration: 60,
        problems: [
          { problem: { title: 'Problem 1', desc: 'Description for Problem 1' }, score: 100 },
          { problem: { title: 'Problem 2', desc: 'Description for Problem 2' }, score: 150 },
        ],
        creator_id: { name: 'Alice' }
      },
      {
        _id: '2',
        title: 'Future Hackathon',
        start_time: new Date(new Date().getTime() + 120 * 60000).toISOString(), // Starts in 2 hours
        duration: 180,
        problems: [
          { problem: { title: 'Problem 3', desc: 'Description for Problem 3' }, score: 200 },
          { problem: { title: 'Problem 4', desc: 'Description for Problem 4' }, score: 250 },
        ],
        creator_id: { name: 'Bob' }
      },
      {
        _id: '3',
        title: 'Ongoing Contest',
        start_time: new Date(new Date().getTime() - 10 * 60000).toISOString(), // Started 10 minutes ago
        duration: 45,
        problems: [
          { problem: { title: 'Problem 5', desc: 'Description for Problem 5' }, score: 50 },
          { problem: { title: 'Problem 6', desc: 'Description for Problem 6' }, score: 100 },
        ],
        creator_id: { name: 'Charlie' }
      },
      {
        _id: '4',
        title: 'Upcoming Code Sprint',
        start_time: new Date(new Date().getTime() + 60 * 60000).toISOString(), // Starts in 1 hour
        duration: 120,
        problems: [
          { problem: { title: 'Problem 7', desc: 'Description for Problem 7' }, score: 150 },
          { problem: { title: 'Problem 8', desc: 'Description for Problem 8' }, score: 200 },
        ],
        creator_id: { name: 'Dave' }
      },
    ];

    const contestData = dummyContests.find(contest => contest._id === contestId);
    setContest(contestData);
  }, [contestId]);

  if (!contest) return <Text color="white">Loading...</Text>;

  return (
    <Box p={8} maxW="900px" mx="auto" bg="gray.900" color="white" borderRadius="md" shadow="lg">
      <Text fontSize="3xl" fontWeight="bold" mb={4} textAlign="center">
        {contest.title}
      </Text>

      <HStack justifyContent="space-between" mb={6}>
        <HStack>
          <Icon as={FaClock} color="teal.300" />
          <Text fontSize="lg" fontWeight="bold">
            Starts at: {new Date(contest.start_time).toLocaleString()}
          </Text>
        </HStack>
        <Badge colorScheme="green" px={3} py={1}>
          {contest.duration} min
        </Badge>
      </HStack>

      <Box bg="gray.800" p={6} borderRadius="md">
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Problems
        </Text>
        <VStack spacing={4}>
          {contest.problems.map((item, index) => (
            <Box key={index} p={4} bg="gray.700" borderRadius="md" width="full" shadow="md" _hover={{ shadow: 'lg' }} transition="all 0.3s ease">
              <HStack justifyContent="space-between">
                <Text fontSize="xl" fontWeight="bold">
                  {item.problem.title}
                </Text>
                <HStack>
                  <Icon as={FaStar} color="yellow.400" />
                  <Text>{item.score}</Text>
                </HStack>
              </HStack>
              <Text mt={2} color="gray.300">
                {item.problem.desc}
              </Text>
            </Box>
          ))}
        </VStack>
      </Box>

      <Flex mt={8} justifyContent="center">
        <Button colorScheme="teal" size="lg" borderRadius="md">
          Start Contest
        </Button>
      </Flex>
    </Box>
  );
};

export default ContestPage;
