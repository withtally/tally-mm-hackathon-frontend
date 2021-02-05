import { utils} from 'ethers';

// common
import { useVaultFactory } from 'common/hooks/useVaultFactory';

type Values = {
  createVault: (amount: string) => Promise<void>;
};

export const useCreateVault = (): Values => {

  // custom hooks
  const {vaultFactory} = useVaultFactory();

  // methods
  const createVault = async (amount: string): Promise<void> => {
    await vaultFactory?.createVault(utils.parseEther(amount));
  };

  return {
    createVault,
  };
};
