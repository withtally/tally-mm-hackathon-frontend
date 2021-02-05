import React, { FC } from "react";
import { Flex, Text, HStack } from "@chakra-ui/react";

import { useWeb3 } from "../hooks/useWeb3";
type Props = {};

const Footer: FC<Props> = () => {
  const { isWeb3Ready, signerAddress } = useWeb3();
  return (
    <>
      <Flex color="blue" justifyContent="flex-end" alignItems="center">
        <HStack spacing="20px">
          <Text fontSize="s" color="gray.500">
            {isWeb3Ready && signerAddress ? signerAddress : null}
          </Text>
        </HStack>
      </Flex>
    </>
  );
};

export default Footer;
