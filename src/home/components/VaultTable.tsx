import React, { FC } from 'react';
import { Flex, FlexProps, Text, Table, Thead, Tbody, Tr, Th, Td, Badge } from '@chakra-ui/react';

type Props = {};

const VaultTable: FC<Props & FlexProps> = () => (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Address</Th>
          <Th>Balance</Th>
          <Th>Linked NFT</Th>
          <Th>State</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>0x0</Td>
          <Td>25.4</Td>
          <Td>1</Td>
          <Td><Badge colorScheme="green">Active</Badge></Td>
        </Tr>
        <Tr>
          <Td>0x0</Td>
          <Td>30.48</Td>
          <Td>2</Td>
          <Td><Badge>Inactive</Badge></Td>
        </Tr>
        <Tr>
          <Td>0x0</Td>
          <Td>0.91444</Td>
          <Td>3</Td>
          <Td><Badge colorScheme="red">Expired</Badge></Td>
        </Tr>
      </Tbody>
    </Table>
);

export default VaultTable;
