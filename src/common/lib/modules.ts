import MockGovernorAlpha from 'contracts/mocks/mockGovernorAlpha.sol/MockGovernorAlpha.json';
import MockToken from 'contracts/mocks/mockToken.sol/MockToken.json';
import { Governances, GovernanceModule } from 'common/lib/types';

export const GOVERNANCE_MODULES: Governances = {
  mockToken: {
    path: 'mockToken',
    contract: {
      address: '0x655D56C0b469F617d3Cda8F6a807AE7d0b6D2d43',
      abi: MockGovernorAlpha.abi,
    },
    token: {
      name: 'MT',
      contractAddress: '0x20f33324c7cBd6a58177996A63939eFe908FC956',
      abi: MockToken.abi,
    },
  },
};

export const GOVERNANCES_OPTIONS = Object.entries(GOVERNANCE_MODULES)
  .filter(([, governance]) => Boolean(governance.contract.address))
  .reduce(
    (acc, [, governance]): GovernanceModule[] => [...acc, governance],
    [] as GovernanceModule[],
  );

  export const VaultFactory = {
    address: '0x622C2A8f7e31eD12f9A2741D69fEB5d5cDdFcE18'
  }
