
// common
import { useVault } from 'common/hooks/useVault';

type Values = {
  vote: (proposalId: number, support: boolean) => Promise<void>;
};

type Props = {
    vaultAddress: string;
  };

export const useCastVote = ({ vaultAddress }: Props): Values => {
  // custom hooks
  const {vault} = useVault({vaultAddress});

  // methods
  const vote = async (proposalId: number, support: boolean): Promise<void> => {
    await vault?.vote(proposalId, support);
  };

  return { vote };
};
