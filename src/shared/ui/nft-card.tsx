import { Fragment, FC } from 'react';
import tw from 'tailwind-styled-components';
import { Button } from '@root/shared/ui/button';
import { NumberControl } from '@root/shared/ui/inputs/number-control';
import { useTranslation } from 'react-i18next';

const Wrapper = tw.article``;
const Title = tw.h1`text-center text-h4 lg:text-[2.5rem] mb-4 uppercase font-bold [text-shadow:0_0_6px_rgba(255,255,255,0.65)]`;
const Cover = tw.div`
  border border-primary-400 
  [box-shadow:0px_0px_40px_rgba(4,3,19,0.8)]
  [background-image:linear-gradient(334.68deg,rgba(2,199,152,0.4)_0%,rgba(196,196,196,0)_47.27%)]
  bg-black/20
  `;
const Image = tw.img`w-full`;
const ProgressWrapper = tw.div`py-1 mb-10`;
const ProgressCount = tw.p`text-mh4 lg:text-h4 font-bold my-2`;
const ProgressBar = tw.div`border border-primary-400 rounded`;
const Progress = tw.div`bg-primary-400 h-2.5 rounded`;
const PriceWrapper = tw.div`flex justify-between items-center font-iceberg py-2 border-b border-primary-400`;
const PriceTitle = tw.p`text-lg`;
const PriceBody = tw.p`text-mh3 lg:text-h3 [text-shadow:0_0_6px_rgba(255,255,255,0.65)]`;
const QuantityWrapper = tw.div`flex justify-between items-center font-iceberg py-2`;
const QuantityTitle = tw.p`text-lg`;
const QuantityBody = tw.div``;
const Submit = tw(Button)`w-full mt-10`;
const Error = tw.p`text-danger-400 text-center`;

export type ProductProps = {
  title: string;
  imageUrl: string;
  total?: number;
  totalPurchased?: number;
  price?: number;
  maxQuantity?: number;
  quantity?: number;
  error?: string;
  onQuantityChange?: (value: number) => void;
  onMint?: () => void;
  mintIsDisabled?: boolean;
  mintIsLoading?: boolean;
  soldOut?: boolean;
};

export const NFTCard: FC<ProductProps> = ({
  title,
  total,
  imageUrl,
  totalPurchased,
  maxQuantity,
  price,
  quantity,
  soldOut,
  error,
  onQuantityChange,
  onMint,
  mintIsLoading,
  mintIsDisabled,
}) => {
  const { t } = useTranslation('nft-card');

  return (
    <Wrapper>
      <Title>{title}</Title>
      <Cover>
        <Image src={imageUrl} alt={title} loading='lazy' />
      </Cover>
      {typeof totalPurchased === 'number' && typeof total === 'number' && (
        <ProgressWrapper>
          <ProgressCount>
            {totalPurchased} / {total}
          </ProgressCount>
          <ProgressBar>
            <Progress style={{ width: `${(totalPurchased / total) * 100}%` }} />
          </ProgressBar>
        </ProgressWrapper>
      )}
      {!soldOut && (
        <Fragment>
          {typeof price === 'number' && (
            <PriceWrapper>
              <PriceTitle>{t('price')}</PriceTitle>
              <PriceBody>{price} ETH</PriceBody>
            </PriceWrapper>
          )}
          {typeof quantity === 'number' && (
            <QuantityWrapper>
              <QuantityTitle>{t('quantity.title')}</QuantityTitle>
              <QuantityBody>
                <NumberControl value={quantity} max={maxQuantity} onChange={onQuantityChange} />
              </QuantityBody>
            </QuantityWrapper>
          )}
          {!!onMint && (
            <Submit disabled={mintIsLoading || mintIsDisabled} onClick={onMint}>
              {t('mint')}
            </Submit>
          )}
        </Fragment>
      )}
      {soldOut && <p className='text-4xl font-iceberg py-12 text-center uppercase'>{t('sold-out')}</p>}
      {!!error && <Error>{error}</Error>}
    </Wrapper>
  );
};
