import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
import { FaClock, FaPlus } from 'react-icons/fa';

const AllContests = () => {
  const [contests, setContests] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedContest, setSelectedContest] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await axios.get('http://localhost:3000/contests');
        console.log(response.data); 
        const fetchedContests = response.data;

        const now = new Date();
        const sortedContests = fetchedContests.sort((a, b) => {
          const aStartTime = new Date(a.start_time);
          const aEndTime = new Date(aStartTime.getTime() + a.duration * 60000);
          const bStartTime = new Date(b.start_time);
          const bEndTime = new Date(bStartTime.getTime() + b.duration * 60000);

          const aIsLive = aStartTime <= now && now <= aEndTime;
          const bIsLive = bStartTime <= now && now <= bEndTime;

          return bIsLive - aIsLive;
        });

        setContests(sortedContests);
      } catch (error) {
        console.error('Error fetching contests:', error);
      }
    };

    fetchContests();
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
    <Box p={5} bg="gray.900" minHeight="100vh">
      <Text fontSize="3xl" fontWeight="bold" mb={6} color="white">
        All Contests
      </Text>
      <HStack justifyContent="space-between" mb={6}>
        <Button
          colorScheme="teal"
          leftIcon={<FaPlus />}
          onClick={() => navigate('/create-contest')}
        >
          Create Contest
        </Button>
      </HStack>
      <VStack spacing={6} maxW="900px" mx="auto">
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
                  Problem: {item.problem.title} - Score: 100
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
    </Box>
  );
};

export default AllContests;
