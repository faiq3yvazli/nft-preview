import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Layout } from '@root/infra/layout';
import { NFTCard } from '@root/shared/ui/nft-card';
import { LoadingSection } from '@root/shared/ui/loading-section';
import { Timeline } from '@root/modules/timelines/containers/timeline';
import { TimelineType } from '@root/modules/timelines/types/timeline';
import { timelinesSelector } from '@root/modules/timelines/store/selector';

import { useMint } from '../hooks/use-mint';
import { MintUI } from '../components/mint-ui';

const { Wrapper, Container, Grid, Description, Title, CounterWidget, Products } = MintUI;

export const MintPage = () => {
  const { t } = useTranslation(['mint', 'nft-card']);
  const [{ defender, conqueror, isLoading, isLocked }, handlers] = useMint();
  const timeline = useSelector(timelinesSelector.current);

  if (isLoading) {
    return <LoadingSection />;
  }

  if (isLocked) {
    return <Navigate to='/' replace />;
  }

  return (
    <Layout safeArea={false}>
      <Wrapper className='lazy-bg'>
        <Container>
          <Grid>
            <Description>
              {timeline?.type === TimelineType.PreSale && (
                <Fragment>
                  <Title>{t('mint:counters.pre-sale')}</Title>
                  <CounterWidget>
                    <Timeline />
                  </CounterWidget>
                </Fragment>
              )}
              {timeline?.type === TimelineType.PublicSale && (
                <Fragment>
                  <Title>{t('mint:counters.public-sale')}</Title>
                  <CounterWidget>
                    <Timeline />
                  </CounterWidget>
                </Fragment>
              )}
            </Description>
            <Products>
              {!!defender && (
                <NFTCard
                  title={t('nft-card:heroes.defender')}
                  total={defender.purchaseLimit || 0}
                  imageUrl='/images/characters/defender/cropped.webp'
                  totalPurchased={defender.purchased}
                  price={defender.priceInEth}
                  quantity={defender.quantity}
                  onQuantityChange={handlers.defender.updateQuantity}
                  maxQuantity={defender.maxQuantity}
                  onMint={handlers.defender.purchase}
                  soldOut={defender.soldOut}
                  mintIsLoading={defender.isLoading}
                  mintIsDisabled={defender.mintIsDisabled}
                />
              )}
              {!!conqueror && (
                <NFTCard
                  title={t('nft-card:heroes.conqueror')}
                  total={8888}
                  imageUrl='/images/characters/swordsman/cropped.webp'
                  totalPurchased={conqueror.purchased}
                  price={conqueror.priceInEth}
                  quantity={conqueror.quantity}
                  onQuantityChange={handlers.conqueror.updateQuantity}
                  maxQuantity={conqueror.maxQuantity}
                  onMint={handlers.conqueror.purchase}
                  soldOut={conqueror.soldOut}
                  mintIsLoading={conqueror.isLoading}
                  mintIsDisabled={conqueror.mintIsDisabled}
                />
              )}
            </Products>
          </Grid>
        </Container>
      </Wrapper>
    </Layout>
  );
};
