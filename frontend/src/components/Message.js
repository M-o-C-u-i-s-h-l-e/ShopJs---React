import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';

// Stays for a given period of time (default 5 sec)
const Message = ({ variant, children, delay }) => {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, delay);
  }, [delay]);

  return (visible &&
    <Alert variant={variant}>
      {children}
    </Alert>
  );
};

// Always stays
export const PermanentMessage = ({ variant, children }) => {
  return (
    <Alert variant={variant}>
      {children}
    </Alert>
  );
};

Message.defaultProps = {
  variant: 'info',
  delay: 5000
};

PermanentMessage.defaultProps = {
  variant: 'info'
};

export default Message;
