import React, { useState } from 'react';
import {
  Stack,
  Switch,
  FormControl,
  FormLabel,
  FormHelperText,
} from '@chakra-ui/react';

const feedbackTypes = [
  'coherence',
  'conciseness',
  'controversiality',
  'correctness',
  'criminality',
  'harmfulness',
  'helpfulness',
  'insensitivity',
  'maliciousness',
  'misogyny',
  'model_agreement',
  'qs_relevance',
  'relevance',
  'sentiment',
  'stereotypes',
  'summary',
];

const FeedbackSelector = () => {
  const [feedbackSettings, setFeedbackSettings] = useState(
    feedbackTypes.reduce((settings, type) => {
      settings[type] = { off: true, on: false, cot: false };
      return settings;
    }, {})
  );

  const handleSwitchChange = (type, value) => {
    setFeedbackSettings((prevSettings) => ({
      ...prevSettings,
      [type]: { off: value === 'off', on: value === 'on', cot: value === 'cot' },
    }));
  };

  return (
    <Stack spacing={4}>
      {feedbackTypes.map((type) => (
        <FormControl display="flex" alignItems="center" key={type}>
          <FormLabel htmlFor={type} mb="0">
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </FormLabel>
          <Switch
            id={`${type}-off`}
            isChecked={feedbackSettings[type].off}
            onChange={() => handleSwitchChange(type, 'off')}
          />
          <FormHelperText>Off</FormHelperText>
          <Switch
            id={`${type}-on`}
            isChecked={feedbackSettings[type].on}
            onChange={() => handleSwitchChange(type, 'on')}
          />
          <FormHelperText>On</FormHelperText>
          <Switch
            id={`${type}-cot`}
            isChecked={feedbackSettings[type].cot}
            onChange={() => handleSwitchChange(type, 'cot')}
          />
          <FormHelperText>COT</FormHelperText>
        </FormControl>
      ))}
    </Stack>
  );
};

export default FeedbackSelector;