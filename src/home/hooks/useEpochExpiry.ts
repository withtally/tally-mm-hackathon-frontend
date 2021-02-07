// common
import { useVaultFactory } from 'common/hooks/useVaultFactory';

type Values = {
  getEpochExpiry: () => Promise<number>;
};

export const useEpochExpiry = (): Values => {

  // custom hooks
  const {vaultFactory} = useVaultFactory();

  // methods
  const getEpochExpiry = async (): Promise<number> => {
    return await vaultFactory?.currentEpochExpiry();
  };

  return {
    getEpochExpiry,
  };
};
