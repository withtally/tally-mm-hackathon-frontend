import { useMemo } from 'react';
import Notify, { API } from 'bnc-notify';

type Values = { notify: API };

type Props = {
  chainId: number;
};

export const useNotify = ({ chainId }: Props): Values => {
  const notify = useMemo(
    () =>
      Notify({
        dappId: 'e92b2934-86e1-4d98-8b3c-8188c99f6bda',
        networkId: chainId,
      }),
    [],
  );

  return { notify };
};
