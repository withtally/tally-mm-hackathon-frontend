import { useState, useEffect } from 'react';
import { Contract } from 'ethers';

// common
import { useWeb3 } from 'common/hooks/useWeb3';

// Vault factory ABI
import VaultAbi from 'contracts/Vault.sol/Vault.json';

type Values = {
  vault: Contract | undefined;
};

type Props = {
  vaultAddress: string;
};

export const useVault = ({ vaultAddress }: Props): Values => {
  const [contractInstance, setcontractInstance] = useState<Contract | undefined>(undefined);

  // custom hooks
  const { signer } = useWeb3();

  useEffect(() => {
    if(!vaultAddress) return;
    const vault = new Contract(vaultAddress, VaultAbi.abi, signer);

    setcontractInstance(vault);
  }, [vaultAddress])
  


  return { vault: contractInstance };
};
