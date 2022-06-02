import { useSelector } from 'react-redux';
import { authSelector } from '@root/modules/auth/store/selector';

import { SubmitWalletAddress } from './submit-wallet-address';
import { whitelistSelector } from '../store/whitelist/selector';
import { WhitelistResult } from './whitelist-result';
import { WhitelistStatus } from './whitelist-status';

export const Whitelist = () => {
  const isAuthed = useSelector(authSelector.isAuthed);
  const isSubmitted = useSelector(whitelistSelector.isSubmitted);

  if (isAuthed) {
    if (!isSubmitted) {
      return <SubmitWalletAddress />;
    }

    return <WhitelistResult />;
  }

  return <WhitelistStatus />;
};
