import MockGovernorAlpha from 'contracts/mocks/mockGovernorAlpha.sol/MockGovernorAlpha.json';
import MockToken from 'contracts/mocks/mockToken.sol/MockToken.json';
import { Governances, GovernanceModule } from 'common/lib/types';

export const GOVERNANCE_MODULES: Governances = {
  mockToken: {
    path: 'mockToken',
    contract: {
      address: '0xa47046651AeD22232D7342180f07b0e022c8ec43',
      abi: MockGovernorAlpha.abi,
    },
    token: {
      name: 'MT',
      contractAddress: '0x375Bda29fc72E9F5423Ac3e756f957C03555604e',
      abi: MockToken.abi,
    },
  },
  compound: {
    path: 'compound',
    contract: {
      address: '0x3FB82Cbb9C538B992F91110cB5d040C3b49Da66a',
      abi: MockGovernorAlpha.abi,
    },
    token: {
      name: 'MT',
      contractAddress: '0xc1E3a484f48d4dc6B126f26A70CA9706b8e585Cb',
      abi: MockToken.abi,
    },
  },
  uniswap: {
    path: 'compound',
    contract: {
      address: '0x3FB82Cbb9C538B992F91110cB5d040C3b49Da66a',
      abi: MockGovernorAlpha.abi,
    },
    token: {
      name: 'MT',
      contractAddress: '0xc1E3a484f48d4dc6B126f26A70CA9706b8e585Cb',
      abi: MockToken.abi,
    },
  }
};

export const GOVERNANCES_OPTIONS = Object.entries(GOVERNANCE_MODULES)
  .filter(([, governance]) => Boolean(governance.contract.address))
  .reduce(
    (acc, [, governance]): GovernanceModule[] => [...acc, governance],
    [] as GovernanceModule[],
  );

  export const VaultFactory = {
    address: '0xb4d0c77Fa44FDDb7821aeF5BEEbc7521d54dd9b9'
  }
