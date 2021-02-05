import React, { FC, useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import {
  Heading,
  Flex,
  Text,
  Select,
  VStack,
  HStack,
  Button,
  useToast,
  Input,
  Box,
} from '@chakra-ui/react';

import VaultTable from 'home/components/VaultTable';
import { useWeb3 } from 'common/hooks/useWeb3';
import { useToken } from 'home/hooks/useToken';

import { parseBigNumber } from 'common/lib/helpers';
import { useCreateVault } from 'home/hooks/useCreateVault';
import { useVaultFactory } from 'common/hooks/useVaultFactory';
import {useListOwnedVaults} from 'home/hooks/useListOwnedVaults';
import {Vault} from 'common/lib/types';

const Home: FC<RouteComponentProps> = () => {
  // react hooks
  const [tokenBalance, setTokenBalance] = useState('0');
  const [amount, setAmount] = useState('0');
  const [ownedVaults, setOwnedVaults] = useState<Vault[]>([]);

  // chakra hooks
  const toast = useToast();

  // custom hooks
  const { signerAddress } = useWeb3();

  const { tokenContract, approveSpending } = useToken();

  const { createVault } = useCreateVault();

  const { vaultFactory } = useVaultFactory();

  const { getVaultsOfAddress } = useListOwnedVaults();

  const asyncBalance = async () => {
    let balance = await tokenContract?.balanceOf(signerAddress);
    let ownedVaults = await getVaultsOfAddress(signerAddress);

    setTokenBalance(parseBigNumber(balance).toString());
    setOwnedVaults(ownedVaults);
  };

  const handleDepositClick = async () => {
    try {
      if (Number(amount) > Number(tokenBalance)) {
        return toast({
          title: 'Warning',
          description: "Vault amount can't surpass wallet amount neither can be zero.",
          status: 'warning',
        });
      }

      await createVault(amount);
      let ownedVaults = await getVaultsOfAddress(signerAddress);
      setOwnedVaults(ownedVaults);

    } catch (e) {
      toast({
        title: 'Error',
        description: 'Error creating Vault',
        status: 'error',
      });
      console.log('Error', e);
    }
  };

  useEffect(() => {
    signerAddress &&
      vaultFactory?.on(
        'VaultCreated',
        (creator: string, amount: number, vaultId: number, vaultAddress: string) => {
          console.log('vault created', { creator, amount, vaultId, vaultAddress });
        },
      );
  });

  useEffect(() => {
    if (!signerAddress) return;

    asyncBalance();
  }, [signerAddress]);

  return (
    <VStack align="flex-start" justify="flex-start" spacing="30px" w="full">
      <Heading justifySelf="flex-start" as="h3" size="lg">
        Deposit
      </Heading>
      {signerAddress ? (
        <>
          <HStack hidden mb={2} w="full">
            <Text mr={1}>Underlying governance</Text>
            <Select placeholder="Select option" w="300px">
              <option value="option1">Compound</option>
              <option value="option2">Uniswap</option>
            </Select>
          </HStack>
          <Flex mb={4} w="full">
            <Text mr={1}>Wallet current balance</Text>
            <Text>{tokenBalance} MT</Text>
          </Flex>
          <Flex mb={4} w="full">
            <Text mr={4}>Amount to deposit</Text>
            <Input type="number" onChange={(input) => setAmount(input.target.value)} w="300px" />
          </Flex>
          <Flex mb={4}>
            <Button mr={4} onClick={() => approveSpending(amount)}>
              Approve Spending
            </Button>
            <Button colorScheme="teal" onClick={handleDepositClick}>
              Deposit
            </Button>
          </Flex>
          <VStack align="flex-start" spacing="24px" w="full">
            <Text fontSize="lg" fontWeight="semibold">
              Owned Vaults
            </Text>
            <Box borderWidth="1px" borderRadius="lg" w="full">
              <VaultTable ownedVaults={ownedVaults} />
            </Box>
          </VStack>
        </>
      ) : (
        <Text>You need to connect you wallet to use this app</Text>
      )}
    </VStack>
  );
};

export default Home;
