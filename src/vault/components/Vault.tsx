import React, { FC, useEffect, useState } from 'react';
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
import { useParams } from '@reach/router';

import { useCloseVault } from 'vault/hooks/useCloseVault';
import { useVaultInfo } from 'vault/hooks/useVaultInfo';
import { useDelegateVote } from 'vault/hooks/useDelegateVotes';
import { useVault } from 'common/hooks/useVault';
import { useWeb3 } from 'common/hooks/useWeb3';

const Vault: FC<RouteComponentProps> = () => {
  // react hooks
  const [vaultBalance, setVaultBalance] = useState<number>(0);
  const [vaultAddress, setVaultAddress] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  // router hooks
  const { vaultId } = useParams();

  // custom hooks
  const { getVaultInfo } = useVaultInfo();
  const { signerAddress } = useWeb3();
  const { delegate } = useDelegateVote({ vaultAddress });
  const { vault } = useVault({ vaultAddress });

  // effects
  useEffect(() => {
    if (!vaultId) return;

    const asyncVaultInfo = async () => {
      const result = await getVaultInfo(vaultId);
      setVaultBalance(result.vaultBalance);
      setVaultAddress(result.vaultAddress);
    };

    asyncVaultInfo();
  }, [vaultId]);

  // custom hooks
  const { closeOwnVault } = useCloseVault();

  // handlers
  const handleCloseVault = async () => {
    await closeOwnVault(vaultId);
  };

  const handleDelegateVotes = async () => {
    await delegate(address);
  };

  // effects
  useEffect(() => {
    signerAddress &&
      vault?.on('Delegation', (delegator: string, delegatee: string) => {
        console.log('Delegation made', { delegator, delegatee });
      });

    return function cleanup() {
      vault?.off('VaultCreated', () => {
        console.log('unsubscribed');
      });
    };
  });

  return !signerAddress ? (
    <Text>Loading...</Text>
  ) : (
    <VStack align="flex-start" justify="flex-start" spacing="30px" w="full">
      <Heading justifySelf="flex-start" as="h3" size="lg">
        Vault No. {vaultId}
      </Heading>
      <Flex mb={2} w="full">
        <Text mr={1}>Balance</Text>
        <Text>{vaultBalance} MT</Text>
      </Flex>
      <HStack hidden mb={2} w="full">
        <Text mr={1}>Underlying governance</Text>
        <Text mr={1}>Compound</Text>
      </HStack>
      <Flex mb={4} w="full">
        <FormControl id="address" w="300px" mr={4}>
          <FormLabel>Address</FormLabel>
          <Input type="address" onChange={(event) => setAddress(event.target.value)} />
        </FormControl>
        <Button colorScheme="teal" mt="30px" onClick={handleDelegateVotes}>
          Delegate
        </Button>
      </Flex>
      <VStack hidden align="flex-start" justify="flex-start">
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

          <Button colorScheme="teal" mt="30px" onClick={handleCloseVault}>
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
