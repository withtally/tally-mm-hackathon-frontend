import { Contract } from 'ethers';

// common
import { useWeb3 } from 'common/hooks/useWeb3';

// Vault factory ABI
import vaultToken from 'contracts/VaultToken.sol/VaultToken.json';
import { useVaultFactory } from 'common/hooks/useVaultFactory';

type Values = {
  approveSpending: () => Promise<boolean>;
};

export const useVaultToken = (): Values => {

  // custom hooks
  const { signer } = useWeb3();
  const { vaultFactory } = useVaultFactory();


  const approveSpending = async (): Promise<boolean> => {
    const vaultTokenAddress = await vaultFactory?.vaultToken();

    // constant
    const tokenContract = new Contract(vaultTokenAddress, vaultToken.abi, signer);

    return await tokenContract?.approve(vaultTokenAddress, '1000');
  };

  return { approveSpending };
};
