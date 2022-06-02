import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';
import clsx from 'clsx';
import { ChevronLeftSlim } from '@root/shared/icons/chevron-left-slim';

const Select = tw.button`font-bold text-xl lg:text-lg xl:text-xl inline-flex items-center text-info-400 translate-y-0.5`;
const Dropdown = tw.div`[background:linear-gradient(275.5deg,#1A294D_72.47%,#1A2F45_100%)] py-1.5`;
const Item = tw.button`w-full py-0.5 text-center text-info-400 text-lg font-bold flex items-center justify-center`;
const ItemTitle = tw.span`w-6`;
const ItemIcon = tw.span`mr-2`;

const languages = [
  { key: 'en', label: 'Eng', icon: <img src='/images/flags/us.png' alt='US Flag' height={18} width={18} loading='lazy' /> },
  { key: 'es', label: 'Spa', icon: <img src='/images/flags/es.png' alt='ES Flag' height={18} width={18} loading='lazy' /> },
  { key: 'de', label: 'Deu', icon: <img src='/images/flags/de.png' alt='DE Flag' height={18} width={18} loading='lazy' /> },
  { key: 'jp', label: 'Jpn', icon: <img src='/images/flags/jp.png' alt='JP Flag' height={18} width={18} loading='lazy' /> },
  { key: 'cn', label: 'Chi', icon: <img src='/images/flags/cn.png' alt='CN Flag' height={18} width={18} loading='lazy' /> },
  { key: 'sk', label: 'Slk', icon: <img src='/images/flags/sk.png' alt='SK Flag' height={18} width={18} loading='lazy' /> },
  { key: 'fr', label: 'Fra', icon: <img src='/images/flags/fr.png' alt='FR Flag' height={18} width={18} loading='lazy' /> },
  { key: 'it', label: 'Ita', icon: <img src='/images/flags/it.png' alt='IT Flag' height={18} width={18} loading='lazy' /> },
  { key: 'kr', label: 'Kor', icon: <img src='/images/flags/kr.png' alt='KR Flag' height={18} width={18} loading='lazy' /> },
];

export const LanguageSelect = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const language = i18n.language.substring(0, 2);
  const selectedLanguage = languages.find((item) => item.key === language);

  const toggle = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, []);

  useEffect(() => {
    if (isOpen && buttonRef.current && dropdownRef.current) {
      const { bottom, left, right } = buttonRef.current.getBoundingClientRect();
      dropdownRef.current.style.display = 'block';
      dropdownRef.current.style.position = 'absolute';
      dropdownRef.current.style.top = bottom + 4 + 'px';
      dropdownRef.current.style.left = left + 'px';
      dropdownRef.current.style.width = right - left + 'px';

      const outsideHandler = (event: MouseEvent) => {
        if (!dropdownRef.current?.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      window.addEventListener('click', outsideHandler);

      return () => {
        window.removeEventListener('click', outsideHandler);
      };
    } else {
      if (dropdownRef.current) {
        dropdownRef.current.style.display = 'none';
      }
    }
  }, [isOpen]);

  const onChangeLanguage = useCallback(
    async (lng: string) => {
      await i18n.changeLanguage(lng);
      setIsOpen(false);
    },
    [i18n],
  );

  return (
    <Fragment>
      <Select ref={buttonRef} onClick={toggle}>
        {!!selectedLanguage && (
          <Fragment>
            <span className='mr-2'>{selectedLanguage.icon}</span>
            <span>{selectedLanguage.label}</span>
          </Fragment>
        )}
        <span className='pl-2'>
          <ChevronLeftSlim
            className={clsx('text-sm transition-transform', {
              '-rotate-90': !isOpen,
              'rotate-90': isOpen,
            })}
          />
        </span>
      </Select>
      <Dropdown ref={dropdownRef}>
        {languages.map(
          (item) =>
            item.key !== language && (
              <Item key={item.key} onClick={() => onChangeLanguage(item.key)}>
                <ItemIcon>{item.icon}</ItemIcon>
                <ItemTitle>{item.label}</ItemTitle>
              </Item>
            ),
        )}
      </Dropdown>
    </Fragment>
  );
};
