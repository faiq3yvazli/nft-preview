import { FC, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { NavHashLink } from '@root/shared/router/hash-link';
// import { YoutubeIcon } from '@root/shared/icons/youtube';
// import { TwitterIcon } from '@root/shared/icons/twitter';
// import { InstagramIcon } from '@root/shared/icons/instagram';
import { DiscordIcon } from '@root/shared/icons/discord';

import { FooterUI } from './ui/footer';

const { Wrapper, Inner, Section, Logo, Link, Social } = FooterUI;

export type FooterProps = {};

export const Footer: FC<FooterProps> = () => {
  const { t } = useTranslation('layout', { keyPrefix: 'footer' });

  return (
    <Wrapper>
      <Inner>
        <Section align='center'>
          <NavHashLink smooth to='/#intro'>
            <Logo src='/images/logos/logo.webp' loading='lazy' alt='Logo' />
          </NavHashLink>
        </Section>
        <Section className='flex-1' align='left'>
          <Fragment>
            <Link smooth to='/#benefits'>
              {t('menu.benefitsAndUtilities')}
            </Link>
            <Link smooth to='/#showcases'>
              {t('menu.showcases')}
            </Link>
            <Link smooth to='/#roadmap'>
              {t('menu.roadmap')}
            </Link>
          </Fragment>
          <Link to='/terms-of-use'>{t('menu.termsOfUse')}</Link>
          <Link to='/privacy-policy'>{t('menu.privacyPolicy')}</Link>
        </Section>
        <Section align='right'>
          {/*<Social href='https://youtube.com'>*/}
          {/*  <YoutubeIcon />*/}
          {/*</Social>*/}
          <Social href={process.env.REACT_APP_DISCORD_URL} target='_blank' rel='noreferrer noopener'>
            <DiscordIcon />
          </Social>
          {/*<Social href='https://instagram.com'>*/}
          {/*  <InstagramIcon />*/}
          {/*</Social>*/}
          {/*<Social href='https://twitter.com'>*/}
          {/*  <TwitterIcon />*/}
          {/*</Social>*/}
        </Section>
      </Inner>
    </Wrapper>
  );
};
