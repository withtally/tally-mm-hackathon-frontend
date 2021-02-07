import React, { FC } from 'react';
import {
  FlexProps,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  TableCaption,
  Link,
  IconButton,
} from '@chakra-ui/react';
import { Vault } from 'common/lib/types';
import { Link as ReachLink } from '@reach/router';
import { CloseIcon, CheckIcon } from '@chakra-ui/icons';

import { ROUTES } from 'common/lib/routes';

import { useCloseVault } from 'vault/hooks/useCloseVault';
import { useVaultToken } from 'home/hooks/useVaultToken';

type Props = {
  ownedVaults: Vault[];
  epochExpiry: number;
};

const VaultTable: FC<Props & FlexProps> = ({ ownedVaults, epochExpiry }) => {
  const { closeOwnVault, closeExpiredVault } = useCloseVault();
  const { approveSpending } = useVaultToken();

  const handleCloseVault = async (vaultId: number) => {
    try{
      await closeOwnVault(vaultId);
    } catch (e) {
      console.log('error closing vault', e)
    }

  };


  const approveVaultTokenHandlers = async () => {
    try{
      await approveSpending();
    } catch (e) {
      console.log('error approving spending', e)
    }

  };


  return (
    <Table variant="simple">
      {ownedVaults.length <= 0 ? (
        <TableCaption>Still no owned vaults</TableCaption>
      ) : (
        <TableCaption></TableCaption>
      )}
      <Thead>
        <Tr>
          <Th>Address</Th>
          <Th>Votes</Th>
          <Th>Linked NFT</Th>
          <Th>State</Th>
          <Th>Epoch Expire</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {ownedVaults.map((item) => (
          <Tr key={item.vaultId}>
            <Td>
              <Link
                // @ts-ignore
                as={ReachLink}
                to={ROUTES.vault(item.vaultId.toString())}
              >
                {item.vaultAddress}
              </Link>
            </Td>
            <Td>{item.vaultBalance}</Td>
            <Td>{item.vaultId}</Td>
            <Td>
              {epochExpiry > Number(item.vaultEpochExpiry) ? (
                <Badge colorScheme="red">Expired</Badge>
              ) : (
                <Badge colorScheme="green">Active</Badge>
              )}
            </Td>
            <Td>{item.vaultEpochExpiry}</Td>
            <Td w="300px">
              <IconButton
                  colorScheme="green"
                  aria-label="approve transfer"
                  icon={<CheckIcon />}
                  onClick={approveVaultTokenHandlers}
                  mr={4}
                />
              <IconButton
                  colorScheme="red"
                  aria-label="close vault"
                  icon={<CloseIcon />}
                  onClick={() => handleCloseVault(item.vaultId)}
                />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default VaultTable;
