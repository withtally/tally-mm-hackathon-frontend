import React, { FC } from "react";
import { Flex, Button, Text, HStack } from "@chakra-ui/react";

import { useWeb3 } from "../hooks/useWeb3";

type Props = {}

const Header: FC<Props> = () => {
  const { etherBalance, isWeb3Ready, openMetamask, signerAddress } = useWeb3();

  return (
      <Flex justifyContent="flex-end" alignItems="center" margin="15px">
        <HStack spacing="20px">
          <Text>
            {etherBalance ? Number(etherBalance).toFixed(2) : '0.0'} ETH
          </Text>
          <Button colorScheme="teal" onClick={() => openMetamask()}>
            {isWeb3Ready ? "Connected" : "Connect Metamask"}
          </Button>
        </HStack>
      </Flex>
  );
}

export default Header;