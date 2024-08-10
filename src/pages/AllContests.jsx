import React, { useEffect, useState } from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Badge,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Icon,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaClock } from 'react-icons/fa';

const AllContests = () => {
  const [contests, setContests] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedContest, setSelectedContest] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const dummyContests = [
      {
        _id: '1',
        title: 'Live Coding Challenge',
        start_time: new Date(new Date().getTime() - 30 * 60000).toISOString(), // Started 30 minutes ago
        duration: 60, 
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
        duration: 180,
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
        duration: 120, 
        problems: [
          { problem: { title: 'Problem 7' }, score: 150 },
          { problem: { title: 'Problem 8' }, score: 200 },
        ],
        creator_id: { name: 'Dave' }
      },
    ];

    setTimeout(() => {
      const now = new Date();
      const sortedContests = dummyContests.sort((a, b) => {
        const aStartTime = new Date(a.start_time);
        const aEndTime = new Date(aStartTime.getTime() + a.duration * 60000);
        const bStartTime = new Date(b.start_time);
        const bEndTime = new Date(bStartTime.getTime() + b.duration * 60000);

        const aIsLive = aStartTime <= now && now <= aEndTime;
        const bIsLive = bStartTime <= now && now <= bEndTime;

        return bIsLive - aIsLive; 
      });

      setContests(sortedContests);
    }, 500);
  }, []);

  const handleContestClick = (contest) => {
    const now = new Date();
    const contestStartTime = new Date(contest.start_time);
    if (contestStartTime <= now) {
      navigate(`/contest/${contest._id}`);
    } else {
      setSelectedContest(contest);
      onOpen();
    }
  };

  return (
    <>
    <Text fontSize="3xl" fontWeight="bold" mb={6} color="white">
      All Contests
    </Text>
    <VStack spacing={6} maxW="800px" mx="auto" mt={8}>
      {contests.map((contest) => (
        <Box
          key={contest._id}
          p={6}
          shadow="lg"
          borderWidth="1px"
          borderRadius="lg"
          width="100%"
          bg="gray.700"
          color="white"
          cursor={new Date(contest.start_time) <= new Date() ? "pointer" : "not-allowed"}
          _hover={{
            transform: new Date(contest.start_time) <= new Date() ? "scale(1.02)" : "none",
            boxShadow: new Date(contest.start_time) <= new Date() ? "0 0 10px rgba(255,255,255,0.6)" : "none",
          }}
          transition="all 0.3s"
          onClick={() => handleContestClick(contest)}
        >
          <HStack justifyContent="space-between">
            <Text fontSize="2xl" fontWeight="bold">
              {contest.title}
            </Text>
            <Badge colorScheme={new Date(contest.start_time) <= new Date() ? "red" : "blue"}>
              {new Date(contest.start_time) <= new Date() ? "Live" : `${contest.duration} mins`}
            </Badge>
          </HStack>
          <HStack mt={2} color="gray.400" fontSize="sm">
            <Icon as={FaClock} />
            <Text>Starts at: {new Date(contest.start_time).toLocaleString()}</Text>
          </HStack>
          <VStack align="start" mt={4} spacing={2}>
            {contest.problems.map((item, index) => (
              <Text key={index} fontSize="md" fontWeight="medium">
                Problem: {item.problem.title} - Score: {item.score}
              </Text>
            ))}
          </VStack>
        </Box>
      ))}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="gray.800" color="white">
          <ModalHeader>Contest Not Live Yet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>The contest "{selectedContest?.title}" will start at {new Date(selectedContest?.start_time).toLocaleString()}.</Text>
            <Text mt={4}>Time remaining: {Math.max(0, Math.ceil((new Date(selectedContest?.start_time) - new Date()) / (1000 * 60))) + " minutes"}</Text>
            <Button mt={6} colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>

    </>
  );
};

export default AllContests; 