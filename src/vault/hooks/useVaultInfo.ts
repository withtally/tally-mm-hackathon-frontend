// common
import { useVaultFactory } from 'common/hooks/useVaultFactory';
import { useToken } from 'home/hooks/useToken';

import {parseBigNumber} from 'common/lib/helpers';

import {Vault} from 'common/lib/types';

type Values = {
    getVaultInfo: (address: string) => Promise<Vault>;
};

export const useVaultInfo = (): Values => {

  // custom hooks
  const { vaultFactory } = useVaultFactory();
  const { tokenContract } = useToken();

  const getVaultInfo = async (vaultId: string): Promise<Vault> => {
    const vaultAddress = (await vaultFactory?.vaultMapping(vaultId)) as string;
    const ownerAddress = (await vaultFactory?.vaultToAddress(vaultId)) as string;
    const vaultBalance = await tokenContract?.balanceOf(vaultAddress);

    return { vaultAddress, vaultId: Number.parseInt(vaultId), vaultBalance: parseBigNumber(Number.parseInt(vaultBalance)), ownerAddress };
  };

  return { getVaultInfo };
};
