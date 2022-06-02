import { useTranslation } from 'react-i18next';
import { Modal } from '@root/shared/ui/modal';
import { CopyIcon } from '@root/shared/icons/copy';
import { LoadingIcon } from '@root/shared/icons/loading';
import { Button } from '@root/shared/ui/button';
import { NFTCardUI } from '@root/modules/purchases/components/nft-card-ui';
import { makeOpenSeaURL } from '@root/modules/purchases/utils/make-open-sea-url';
import { getTokenType } from '@root/modules/purchases/utils/get-token-type';

import { useMyAccount } from '../hooks/use-my-account';
import { MyAccountUI } from '../components/my-account-ui';

const { Header, Widget, Actions, Content } = MyAccountUI;

export const MyAccount = () => {
  const { t } = useTranslation('auth', { keyPrefix: 'my-account' });
  const [{ user, balance, purchases, addressCopied }, { close, signOut, copyAddress }] = useMyAccount();

  if (!user) {
    return null;
  }

  return (
    <Modal className='max-w-lg 2xl:max-w-xl' title={t('title')} onCancel={close} isOpen>
      <Header>
        <Widget.Wrapper>
          <Widget.Avatar src='/images/auth/pie-chart.webp' loading='lazy' alt='Profile' />
          <Widget.Body>
            <Widget.Title>{user.username}</Widget.Title>
            <Widget.SubTitle>{user.address}</Widget.SubTitle>
          </Widget.Body>
        </Widget.Wrapper>
        <Widget.Wrapper>
          <Widget.Avatar src='/images/coins/ethereum.webp' loading='lazy' alt='Ethereum Coin' />
          <Widget.Body>
            <Widget.Title>{balance.toFixed(2)} ETH</Widget.Title>
            <Widget.SubTitle>Ethereum Mainnet</Widget.SubTitle>
          </Widget.Body>
        </Widget.Wrapper>
      </Header>
      <Actions.Wrapper>
        <Actions.Button.Wrapper onClick={copyAddress}>
          <Actions.Button.Icon>
            <CopyIcon />
          </Actions.Button.Icon>
          <Actions.Button.Text>{!addressCopied ? t('address.copy') : t('address.copied')}</Actions.Button.Text>
        </Actions.Button.Wrapper>
      </Actions.Wrapper>
      <Content.Wrapper>
        <Content.Title>
          {t('purchases.title')} ({purchases.data.length})
        </Content.Title>
        {!!purchases.data.length && (
          <Content.Grid>
            {purchases.data.map((item) => (
              <NFTCardUI.Wrapper key={item.id.tokenId}>
                <NFTCardUI.Link href={makeOpenSeaURL(item.id.tokenId)} target='_blank' rel='noreferrer noopener' />
                <NFTCardUI.Cover>
                  {!item.error && <NFTCardUI.Image src={item.media[0].raw} alt={item.title} loading='lazy' />}
                  {!!item.error && (
                    <div className='h-full w-full flex flex-col items-center justify-center'>
                      <LoadingIcon className='text-3xl' />
                      <div className='mt-3 text-center'>
                        <p className='text-lg leading-none'>{t('nft.empty.title')}</p>
                        <p>{t('nft.empty.description')}</p>
                      </div>
                    </div>
                  )}
                </NFTCardUI.Cover>
                <NFTCardUI.Title>{getTokenType(item.id.tokenId)}</NFTCardUI.Title>
                <NFTCardUI.SubTitle>Token #{+item.id.tokenId}</NFTCardUI.SubTitle>
              </NFTCardUI.Wrapper>
            ))}
          </Content.Grid>
        )}
        {!purchases.data.length && (
          <Content.Empty.Wrapper>
            <Content.Empty.Cover>
              <img src='/images/common/scorpion-head.webp' loading='lazy' alt='Empty' />
            </Content.Empty.Cover>
            <Content.Empty.Title>{t('purchases.empty.title')}</Content.Empty.Title>
            <Content.Empty.Description>{t('purchases.empty.description')}</Content.Empty.Description>
          </Content.Empty.Wrapper>
        )}
      </Content.Wrapper>
      <Button className='w-full mt-4' onClick={signOut} bordered>
        {t('disconnect')}
      </Button>
    </Modal>
  );
};
