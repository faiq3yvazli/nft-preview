import { FC, Fragment, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MenuIcon } from '@root/shared/icons/menu';
import { ProfileButton } from '@root/modules/auth/containers/profile-button';
import { HashLink } from '@root/shared/router/hash-link';
import { timelinesSelector } from '@root/modules/timelines/store/selector';
import { authSelector } from '@root/modules/auth/store/selector';
import { TimelineType } from '@root/modules/timelines/types/timeline';
import { MintLiveWidget } from '@root/modules/mint/containers/mint-live-widget';

import { LanguageSelect } from './language-select';
import { HeaderUI } from './ui/header';
import { layoutSlice } from './slice';
import { layoutSelector } from './selector';

const { Wrapper, Inner, Logo, Links, Link, SpecialLink, Item, Extra, ExtraItem, Nav, ToggleButton } = HeaderUI;

export type HeaderProps = {};

export const Header: FC<HeaderProps> = () => {
  const { t } = useTranslation('layout', { keyPrefix: 'header' });
  const location = useLocation();
  const dispatch = useDispatch();
  const isOpen = useSelector(layoutSelector.navbarIsOpen);
  const isAuthed = useSelector(authSelector.isAuthed);
  const currentTimeline = useSelector(timelinesSelector.current);
  const [isBlurry, setIsBlurry] = useState<boolean>(!!window.scrollY);
  const isBlurryRef = useRef(isBlurry);

  useImperativeHandle(isBlurryRef, () => isBlurry, [isBlurry]);

  const toggle = useCallback(() => {
    dispatch(layoutSlice.actions.navbarToggled());
  }, [dispatch]);

  useEffect(() => {
    const handler = () => {
      const shouldBeBlurry = !!window.scrollY;

      if (isBlurryRef.current !== shouldBeBlurry) {
        setIsBlurry(shouldBeBlurry);
      }
    };

    window.addEventListener('scroll', handler);

    return () => {
      window.removeEventListener('scroll', handler);
    };
  }, []);

  useEffect(() => {
    dispatch(layoutSlice.actions.navbarClosed());
  }, [dispatch, location]);

  return (
    <Fragment>
      <Wrapper blurry={isBlurry || isOpen}>
        <Inner>
          <HashLink smooth to='/#intro'>
            <Logo src='/images/logos/logo.webp' loading='lazy' alt='Logo' />
          </HashLink>
          <ToggleButton onClick={toggle}>
            <MenuIcon />
          </ToggleButton>
          <Nav>
            <Links isOpen={isOpen}>
              <Fragment>
                <Link smooth to='/#benefits'>
                  {t('menu.benefits')}
                </Link>
                <Link smooth to='/#roadmap'>
                  {t('menu.roadmap')}
                </Link>
                <Link smooth to='/#our-team'>
                  {t('menu.team')}
                </Link>
                <Link smooth to='/#faq'>
                  {t('menu.faq')}
                </Link>
                {isAuthed && (currentTimeline?.type === TimelineType.PreSale || currentTimeline?.type === TimelineType.PublicSale) && (
                  <SpecialLink to='/mint' className='text-primary-400 lg:text-white'>
                    {t('menu.mint')}
                  </SpecialLink>
                )}
                <Item>
                  <LanguageSelect />
                </Item>
              </Fragment>
            </Links>
          </Nav>
          <Extra>
            <ExtraItem className='order-2 lg:order-1 lg:mr-4 mt-3 lg:mt-0'>
              <MintLiveWidget currentRound={1} totalRounds={2} status='live' />
            </ExtraItem>
            <ExtraItem className='order-1 lg:order-2'>
              <ProfileButton />
            </ExtraItem>
          </Extra>
        </Inner>
      </Wrapper>
    </Fragment>
  );
};
