import { Contract, utils } from 'ethers';

// common
import { useWeb3 } from 'common/hooks/useWeb3';

// Vault factory ABI
import MockTokenAbi from 'contracts/mocks/mockToken.sol/MockToken.json';
import { GOVERNANCE_MODULES, VaultFactory } from 'common/lib/modules';

type Values = {
  tokenContract: Contract | undefined;
  approveSpending: (amount: string, callback?: (amount: string) => void) => Promise<void>;
};

export const useToken = (): Values => {

  // custom hooks
  const { signer } = useWeb3();
  const tokenAddress = GOVERNANCE_MODULES.mockToken.token.contractAddress;
  const vaultFactoryAddress = VaultFactory.address;

  // constant
  const tokenContract = new Contract(tokenAddress, MockTokenAbi.abi, signer);

  const approveSpending = async (amount: string): Promise<void> => {
    await tokenContract?.approve(vaultFactoryAddress, utils.parseEther(amount));
  };

  return { tokenContract, approveSpending };
};
