
// common
import { useVault } from 'common/hooks/useVault';

type Values = {
  delegate: (address: string) => Promise<void>;
};

type Props = {
    vaultAddress: string;
  };

export const useDelegateVote = ({ vaultAddress }: Props): Values => {
  // custom hooks
  const {vault} = useVault({vaultAddress});

  // methods
  const delegate = async (address: string): Promise<void> => {
    await vault?.delegate(address);
  };

  return { delegate };
};
