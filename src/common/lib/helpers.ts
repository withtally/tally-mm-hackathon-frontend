export const shortAddress = (
    address: string,
    initialLength = 6,
    endLength = -4
  ): string => `${address.slice(0, initialLength)}...${address.slice(endLength)}`;
  
  export const parseBigNumber = (number: number): number => number / 1e18;