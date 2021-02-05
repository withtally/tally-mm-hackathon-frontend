// common
import { useVaultFactory } from 'common/hooks/useVaultFactory';

type Values = {
  closeOwnVault: (vaultId: number) => Promise<void>;
  closeExpiredVault: (vaultId: number) => Promise<void>;
};

export const useCloseVault = (): Values => {

  // custom hooks
  const {vaultFactory} = useVaultFactory();

  // methods
  const closeOwnVault = async (vaultId: number): Promise<void> => {
    await vaultFactory?.closeOwnVault(vaultId);
  };

  const closeExpiredVault = async (vaultId: number): Promise<void> => {
    await vaultFactory?.closeExpiredVault(vaultId);
  };


  return {
    closeOwnVault,
    closeExpiredVault,
  };
};
