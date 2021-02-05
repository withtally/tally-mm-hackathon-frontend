import { Contract } from 'ethers';

// common
import { useWeb3 } from 'common/hooks/useWeb3';

// Vault factory ABI
import VaultAbi from 'contracts/Vault.sol/Vault.json';

type Values = {
  vault: Contract | undefined;
  delegate: (address: string) => Promise<void>;
  vote: (proposalId: number, support: boolean) => Promise<void>;
};

type Props = {
  vaultAddress: string;
};

export const useVault = ({ vaultAddress }: Props): Values => {
  // custom hooks
  const { signer } = useWeb3();

  // constant
  const vault = new Contract(vaultAddress, VaultAbi.abi, signer);

  // methods
  const delegate = async (address: string): Promise<void> => {
    await vault?.delegate(address);
  };

  const vote = async (proposalId: number, support: boolean): Promise<void> => {
    await vault?.vote(proposalId, support);
  };

  return { vault, delegate, vote };
};
