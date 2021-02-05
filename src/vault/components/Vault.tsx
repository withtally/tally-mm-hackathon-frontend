import React, { FC } from 'react';
import { RouteComponentProps } from '@reach/router';
import {
  Heading,
  Flex,
  Text,
  VStack,
  HStack,
  Input,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
} from '@chakra-ui/react';

import { useCloseVault } from 'vault/hooks/useCloseVault';

const Vault: FC<RouteComponentProps> = () => {

// custom hooks
const { closeOwnVault } = useCloseVault();

const handleCloseVault = async (vaultId: number) => {
    await closeOwnVault(vaultId);
}

  return (
    <VStack align="flex-start" justify="flex-start" spacing="30px" w="full">
      <Heading justifySelf="flex-start" as="h3" size="lg">
        Vault No. 1
      </Heading>
      <Flex mb={2} w="full">
        <Text mr={1}>Balance</Text>
        <Text>200 COMP</Text>
      </Flex>
      <HStack mb={2} w="full">
        <Text mr={1}>Underlying governance</Text>
        <Text mr={1}>Compound</Text>
      </HStack>
      <Flex mb={4} w="full">
        <FormControl id="address" w="300px" mr={4}>
          <FormLabel>Address</FormLabel>
          <Input type="address" />
        </FormControl>
        <Button colorScheme="teal" mt="30px">
          Delegate
        </Button>
      </Flex>
      <VStack align="flex-start" justify="flex-start">
        <Flex mb={4}>
          <Text mr={1}>Current Proposal:</Text>
          <Text mr={1}>A proposal made for Compound</Text>
        </Flex>
        <Flex mb={4}>
          <RadioGroup defaultValue="1">
            <VStack mr={16} mt={5}>
              <Radio size="md" value="1" colorScheme="green">
                In favor
              </Radio>
              <Radio size="md" value="2" colorScheme="red">
                Against
              </Radio>
            </VStack>
          </RadioGroup>

          <Button colorScheme="teal" mt="30px" onClick={() => handleCloseVault(1)}>
            Vote
          </Button>
        </Flex>
      </VStack>
      <Flex mt={32} mb={4}>
        <Button colorScheme="red">Close Vault</Button>
      </Flex>
    </VStack>
  );
};

export default Vault;
