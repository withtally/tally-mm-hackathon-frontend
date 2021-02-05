import React, { FC } from 'react';
import { Flex, FlexProps, Text, Table, Thead, Tbody, Tr, Th, Td, Badge, TableCaption, Link } from '@chakra-ui/react';
import { Vault } from 'common/lib/types';
import { Link as ReachLink } from '@reach/router';

import {ROUTES} from 'common/lib/routes';

type Props = {
  ownedVaults: Vault[];
};

const VaultTable: FC<Props & FlexProps> = ({ownedVaults}) => (
    <Table variant="simple">
      {ownedVaults.length <= 0 ? (<TableCaption>Still no owned vaults</TableCaption>) : (<TableCaption></TableCaption>)}
      <Thead>
        <Tr>
          <Th>Address</Th>
          <Th>Balance</Th>
          <Th>Linked NFT</Th>
          <Th>State</Th>
        </Tr>
      </Thead>
      <Tbody>
        {ownedVaults.map(item => (
          <Tr>
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
            <Td><Badge colorScheme="green">Active</Badge></Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
);

export default VaultTable;
