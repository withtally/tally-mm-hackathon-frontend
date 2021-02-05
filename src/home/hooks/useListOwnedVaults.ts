import { useVaultFactory } from 'common/hooks/useVaultFactory';

import {parseBigNumber} from 'common/lib/helpers';
import { useToken } from './useToken';
import {Vault} from 'common/lib/types';

type Values = {
  getVaultsOfAddress: (address: string) => Promise<Vault[]>;
};

export const useListOwnedVaults = (): Values => {
  // custom hooks
  const { vaultFactory } = useVaultFactory();
  const { tokenContract } = useToken();

  const getVaultsOfAddress = async (address: string): Promise<Vault[]> => {
  const addressNFTBalance = await vaultFactory?.addressNFTBalance(address);
  const nftCurrentSupply = await vaultFactory?.nftSupply();

  let result = [] as Vault[];
  if (addressNFTBalance.toNumber() === 0) {
    return [];
  } else {
    
    for (let vaultId = 1; vaultId <= nftCurrentSupply; vaultId++) {
        const vaultAddress = await vaultFactory?.vaultMapping(vaultId) as string;
        const ownerAddress = await vaultFactory?.vaultToAddress(vaultId) as string;

        if (ownerAddress === address) {
          const vaultBalance = await tokenContract?.balanceOf(vaultAddress);
          result.push({vaultId, vaultAddress, vaultBalance: parseBigNumber(Number.parseInt(vaultBalance))});
        }
    }
    
  }
  return result;

  };

  return {
    getVaultsOfAddress,
  };
};
