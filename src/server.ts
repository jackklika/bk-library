import express from 'express';

import { TwilioMock } from './sms/twilioMock';

const twilio = new TwilioMock();

twilio.messages.send({
  body: 'Hello, this is a test message!',
  from: '+1234567890',
  to: '+0987654321',
})
  .then(response => console.log('Message sent!', response.sid))
  .catch(error => console.log('Error sending message:', error.message));

const app = express();
const port = process.env.PORT || 1337;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
