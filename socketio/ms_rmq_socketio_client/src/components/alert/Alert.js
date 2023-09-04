import React, { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';

export const SuccessAlert = ({ message, isOpen, timeout=5000 }) => {
  const [showAlert, setShowAlert] = useState(isOpen);

  useEffect(() => {
    if (timeout > 0) {
      const timeoutId = setTimeout(() => {
        setShowAlert(false);
      }, timeout);

      return () => clearTimeout(timeoutId);
    }
  }, [timeout]);

  return (
    showAlert && (
      <Alert variant="filled" severity="success">
        {message}
      </Alert>
    )
  );
};

