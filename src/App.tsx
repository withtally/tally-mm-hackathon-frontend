import React from 'react';
import { ChakraProvider, Box, Grid, theme } from '@chakra-ui/react';

// Components
import Header from 'common/components/Header';
import Footer from 'common/components/Footer';
import Container from 'common/components/Container';

// Hooks
import { Web3Provider } from 'common/hooks/useWeb3';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Web3Provider>
        <Box textAlign="center" fontSize="xl">
          <Grid minH="100vh" templateRows="50px 1fr 50px" p={3} bg='gray.50'>
            <Header />
            <Container />
            <Footer />
          </Grid>
        </Box>
      </Web3Provider>
    </ChakraProvider>
  );
}

export default App;
