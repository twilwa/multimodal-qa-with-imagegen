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
import { FaPaperPlane, FaUpload } from 'react-icons/fa';
import FeedbackSelector from '../components/FeedbackSelector';

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const { isOpen, onToggle } = useDisclosure();

  // Simulated function for making API call to litellm server with vision and function call models
  const sendMessageToGPT4 = async (message) => {
    // Check if message contains an image URL to determine if it's a vision model request
    if (message.url) {
      // Simulate sending a vision model request to litellm server with additional properties
      // Since feedbackSettings is not defined, we'll remove the reference to it
      // and instead use a placeholder object for the feedbackEnabled structure
      const app_id = 'unique_app_identifier'; // Replace with logic to generate unique app identifiers per conversation
      // Placeholder for feedback enabled settings, replace with actual logic to get feedback settings
      const feedbackEnabled = {
        "feature1": "enabled",
        "feature2": "disabled"
      };
      const visionResponse = {
        model: "vertex_ai/gemini-pro-vision",
        app_id: app_id,
        feedback: feedbackEnabled,
        messages: [
          {
            "role": "user",
            "content": [
              {
                "type": "text",
                "text": "Whats in this image?"
              },
              {
                "type": "image_url",
                "image_url": {
                  "url": message.url
                }
              }
            ]
          }
        ],
      };
      console.log('Vision model request:', visionResponse);
    } else {
      // Simulate sending a function call request to litellm server
      const functionCallResponse = {
        model: "claude-2",
        messages: [
          {"role": "user", "content": message.text}
        ],
        functions: [
          {
            "name": "get_current_weather",
            "description": "Get the current weather in a given location",
            "parameters": {
              "type": "object",
              "properties": {
                "location": {
                  "type": "string",
                  "description": "The city and state, e.g. San Francisco, CA"
                },
                "unit": {
                  "type": "string",
                  "enum": ["celsius", "fahrenheit"]
                }
              },
              "required": ["location"]
            }
          }
        ]
      };
      console.log('Function call request:', functionCallResponse);
    }
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          seed: 176400, // Example seed value, replace with actual if needed
        }),
      });
      const data = await response.json();
      if (data.url) {
        console.log('Generated image URL:', data.url);
      }
    } catch (error) {
      console.error('Error in generate_image:', error);
    }
  };
  // Rest of the code remains unchanged

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = { type: 'user', content: inputValue };
      // Here we would normally send the message to the backend
      setMessages([...messages, newMessage]);
      sendMessageToGPT4({ text: inputValue, url: 'URL_OF_THE_IMAGE' }); // Replace with actual image URL
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
    <Flex h="100vh" overflow="hidden">
      <Box w="350px" h="calc(100vh - 40px)" borderRight="1px" borderColor="gray.200" overflowY="auto" pl={2}>
        <Tabs isFitted variant="enclosed">
          <TabList>
            <Tab>Eval</Tab>
            <Tab>Chat</Tab>
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
                <FeedbackSelector />
              </VStack>
            </TabPanel>
            <TabPanel>
              {/* Placeholder for SQL Query Results Panel */}
              <Textarea placeholder="Enter SQL query..." />
              <Button mt={2}>Run Query</Button>
              {/* Assume backend executes SQL and returns results */}
              <Box mt={4} p={3} borderWidth="1px" borderRadius="lg">
                {/* Placeholder for displaying SQL query results */}
                {/* Actual query results should replace this placeholder after backend integration */}
                <pre>SQL query results will be displayed here.</pre>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>

      <Box flex="1" p={4}>
        {/* Placeholder for Image Display */}
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" mb={4} h="512px" w="512px" ml="auto" mr="auto">
          <Image src="https://images.unsplash.com/photo-1576158113928-4c240eaaf360?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxwbGFjZWhvbGRlciUyMGZvciUyMGdlbmVyYXRlZCUyMGltYWdlfGVufDB8fHx8MTcwMzU3NDUwOXww&ixlib=rb-4.0.3&q=80&w=1080" boxSize="512px" objectFit="cover" />
        </Box>

        <InputGroup>
          <Input
            pr="4.5rem"
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <InputRightElement width="7rem">
            <IconButton
              aria-label="Upload image"
              icon={<FaUpload />}
              onClick={() => document.getElementById('file-upload').click()}
            />
            <input
              id="file-upload"
              type="file"
              hidden
              accept="image/*"
              onChange={handleFileUpload}
            />
            <IconButton
              aria-label="Send message"
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
