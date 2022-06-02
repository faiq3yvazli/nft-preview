import { FC } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

import { SignUp } from '@root/modules/auth/containers/sign-up';
import { MyAccount } from '@root/modules/auth/containers/my-account';
import { SelectWallet } from '@root/modules/auth/containers/select-wallet';
import { MetaMaskAppModal } from '@root/modules/auth/containers/meta-mask-app-modal';
import { SignatureModal } from '@root/modules/auth/containers/signature-modal';
import { connectSelector } from '@root/modules/auth/store/connect/selector';
import { authSelector } from '@root/modules/auth/store/selector';

import { Header } from './header';
import { Footer } from './footer';
import { LayoutUI } from './ui/layout';

const { Wrapper, Main } = LayoutUI;

export type LayoutProps = { safeArea?: boolean };

export const Layout: FC<LayoutProps> = ({ safeArea = true, children }) => {
  const selectWalletIsOpen = useSelector(connectSelector.selectWalletIsOpen);
  const metaMask = useSelector(connectSelector.metaMask);
  const signUpIsOpen = useSelector(connectSelector.signUpIsOpen);
  const signatureModalIsOpen = useSelector(connectSelector.signatureModalIsOpen);
  const myAccountIsOpen = useSelector(authSelector.myAccountIsOpen);

  return (
    <Wrapper className={clsx('lazy-bg', { 'pt-44 lg:pt-32': safeArea })}>
      <Header />
      <Main>{children}</Main>
      <Footer />
      {signUpIsOpen && <SignUp />}
      {myAccountIsOpen && <MyAccount />}
      {selectWalletIsOpen && <SelectWallet />}
      {metaMask.appModalIsOpen && <MetaMaskAppModal />}
      {signatureModalIsOpen && <SignatureModal />}
    </Wrapper>
  );
};
