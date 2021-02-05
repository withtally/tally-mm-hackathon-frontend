export type GovernanceKey = 'mockToken' | 'compound' | 'uniswap';
export type GovernanceContract = {
  address: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abi: any;
};
export type GovernanceToken = {
  name: string;
  contractAddress: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abi: any;
};

export type GovernanceModule = {
  path: GovernanceKey;
  contract: GovernanceContract;
  token: GovernanceToken;
};

export type Governances = { [governance in GovernanceKey]: GovernanceModule };