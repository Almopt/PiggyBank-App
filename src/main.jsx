import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import App from './App.jsx';
import './index.css';

const theme = extendTheme({
  colors: {
    primaryRed: 'hsl(10, 79%, 65%)',
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);
