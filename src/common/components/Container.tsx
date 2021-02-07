import React, { FC } from 'react';
import { Router, RouteComponentProps } from '@reach/router';
import { Flex, FlexProps } from '@chakra-ui/react';

import Home from 'home/components/Home';
import Vault from 'vault/components/Vault';

const Container: FC<RouteComponentProps & FlexProps> = ({ ...flexProps }) => {
  return (
    <Flex as="main" flex={1} minHeight="calc(100vh - 8em)" w="full" bg='white'>
      <Flex direction="column" mt={16} justify='flex-start' maxW="70rem" mx="auto" w="full" {...flexProps}>
        <Router basepath="/">
          <Vault path="/vault/:vaultId" />
          <Home path="/" />
        </Router>
      </Flex>
    </Flex>
  );
};

export default Container;
