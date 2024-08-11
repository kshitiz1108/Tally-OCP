import React, { useState } from 'react';
import { Box, Input, Button, VStack, Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import Codeeditor from './CodeEditor';

const encodeBase64 = (string) => {
  return btoa(unescape(encodeURIComponent(string)));
};

const CodePlayground = () => {
  const [testcaseInput, setTestcaseInput] = useState("");
  const [code, setCode] = useState("");
  const [showOutput, setShowOutput] = useState(false);


 

  return (
    <Box minH="100vh" bgGradient="linear(to-r, #0f0a19, #1b1b2f)" color="gray.300" px={6} py={8}>
      <VStack spacing={6} align="start" width="100%">
        <Box width="100%" bg="gray.900" p={4} borderRadius="md" shadow="md">
          <Text fontSize="2xl" fontWeight="bold" color="teal.300" mb={4}>
            Code Playground
          </Text>
          <Codeeditor code={code} setCode={setCode} /> 
        </Box>
      </VStack>
    </Box>
  );
};

export default CodePlayground;
