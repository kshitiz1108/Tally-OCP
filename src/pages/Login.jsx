// Login.js
import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  Text,
  Link,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Login = () => {
  return (
    <Box
      w="100%"
      maxW="md"
      mx="auto"
      mt={10}
      p={6}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
    >
      <Heading as="h2" size="lg" textAlign="center" mb={6}>
        Login
      </Heading>
      <form>
        <Stack spacing={4}>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="Enter your email" />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" placeholder="Enter your password" />
          </FormControl>
          <Button colorScheme="green" type="submit">
            Login
          </Button>
        </Stack>
      </form>
      <Text textAlign="center" mt={4}>
        Don't have an account?{' '}
        <Link as={RouterLink} to="/register" color="teal.500">
          Register here
        </Link>
      </Text>
    </Box>
  );
};

export default Login;