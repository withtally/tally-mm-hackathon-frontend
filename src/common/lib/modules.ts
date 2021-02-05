import MockGovernorAlpha from 'contracts/mocks/mockGovernorAlpha.sol/MockGovernorAlpha.json';
import MockToken from 'contracts/mocks/mockToken.sol/MockToken.json';
import { Governances, GovernanceModule } from 'common/lib/types';

export const GOVERNANCE_MODULES: Governances = {
  mockToken: {
    path: 'mockToken',
    contract: {
      address: '0x86671329F3c3b10eC30983ED7435aBc1da853339',
      abi: MockGovernorAlpha.abi,
    },
    token: {
      name: 'MT',
      contractAddress: '0x9B6c0C52A0B5259398D21BC334Ef1aA3Df0A6450',
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
    address: '0xDeb2677aE8C29038F128fB911da33970265675D4'
  }
