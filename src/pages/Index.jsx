import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Textarea,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { FaImage, FaPaperPlane, FaUpload } from 'react-icons/fa';

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const { isOpen, onToggle } = useDisclosure();

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      // Here we would normally send the message to the backend
      setMessages([...messages, { type: 'user', content: inputValue }]);
      setInputValue('');
    }
  };

  const handleFileUpload = (event) => {
    // Normally we would upload the file here and send it to the backend
    const file = event.target.files[0];
    if (file) {
      // Placeholder for file upload logic
      console.log('Uploaded file:', file.name);
    }
  };

  return (
    <Flex h="100vh">
      <Box w="300px" borderRight="1px" borderColor="gray.200">
        <Tabs isFitted variant="enclosed">
          <TabList>
            <Tab>Chat</Tab>
            <Tab>Eval</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <VStack spacing={4}>
                {messages.map((message, index) => (
                  <Box
                    key={index}
                    alignSelf={message.type === 'user' ? 'flex-end' : 'flex-start'}
                    bg={message.type === 'user' ? 'blue.100' : 'gray.100'}
                    p={3}
                    borderRadius="md"
                  >
                    {message.content}
                  </Box>
                ))}
              </VStack>
            </TabPanel>
            <TabPanel>
              {/* Placeholder for Evaluation Panel */}
              <Textarea placeholder="Enter evaluation script..." />
              <Button mt={2}>Run Evaluation</Button>
              {/* Evaluation results would be displayed here */}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>

      <Box flex="1" p={4}>
        {/* Placeholder for Image Display */}
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" mb={4}>
          <Image src="https://images.unsplash.com/photo-1576158113928-4c240eaaf360?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxwbGFjZWhvbGRlciUyMGZvciUyMGdlbmVyYXRlZCUyMGltYWdlfGVufDB8fHx8MTcwMzU3NDUwOXww&ixlib=rb-4.0.3&q=80&w=1080" />
        </Box>

        <InputGroup>
          <Input
            pr="4.5rem"
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <InputRightElement width="4.5rem">
            <IconButton
              icon={<FaUpload />}
              onClick={() => document.getElementById('file-upload').click()}
            />
            <input
              id="file-upload"
              type="file"
              hidden
              onChange={handleFileUpload}
            />
            <IconButton
              ml={2}
              icon={<FaPaperPlane />}
              onClick={handleSendMessage}
            />
          </InputRightElement>
        </InputGroup>
      </Box>
    </Flex>
  );
};

export default Index;
