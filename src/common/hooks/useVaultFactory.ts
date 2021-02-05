import { Contract , utils} from 'ethers';

// governance
import { VaultFactory, GOVERNANCE_MODULES } from 'common/lib/modules';
import { GovernanceModule } from 'common/lib/types';

// common
import { useWeb3 } from 'common/hooks/useWeb3';

// Vault factory ABI
import VaultFactoryAbi from 'contracts/VaultFactory.sol/VaultFactory.json';

type Values = {
  vaultFactory: Contract | undefined;
  selectedGovernance: GovernanceModule | undefined;
};

export const useVaultFactory = (): Values => {
  // mock Token
  const mockToken = GOVERNANCE_MODULES.mockToken;

  // custom hooks
  const { signer } = useWeb3();

  // constant
  const vaultFactory = new Contract(VaultFactory.address, VaultFactoryAbi.abi, signer);



  return {
    vaultFactory,
    selectedGovernance: mockToken,
  }
};
