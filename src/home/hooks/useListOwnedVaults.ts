import { useVaultFactory } from 'common/hooks/useVaultFactory';

type Values = {
  getVaultsOfAddress: (address: string) => Promise<void>;
};

export const useListOwnedVaults = (): Values => {
  // custom hooks
  const { vaultFactory } = useVaultFactory();

  const getVaultsOfAddress = async (address: string): Promise<void> => {
    await vaultFactory?.vaultByAddress(address);
  };

  return {
    getVaultsOfAddress,
  };
};
