import React from 'react';
import { Link, LinkProps, NavLink, NavLinkProps } from 'react-router-dom';

export interface HashLinkProps extends LinkProps {
  elementId?: string;
  smooth?: boolean;
  scroll?: (element: HTMLElement) => void;
  timeout?: number;
  offset?: number;
}

export interface NavHashLinkProps extends NavLinkProps, Omit<HashLinkProps, 'className' | 'style' | 'children'> {}

let hashFragment: string = '';
let observer: MutationObserver | null = null;
let asyncTimerId: number | null = null;
let scrollFunction: Function | null = null;

function reset() {
  hashFragment = '';
  if (observer !== null) observer.disconnect();
  if (asyncTimerId !== null) {
    window.clearTimeout(asyncTimerId);
    asyncTimerId = null;
  }
}

function isInteractiveElement(element) {
  const formTags = ['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'];
  const linkTags = ['A', 'AREA'];
  return (formTags.includes(element.tagName) && !element.hasAttribute('disabled')) || (linkTags.includes(element.tagName) && element.hasAttribute('href'));
}

function getElAndScroll() {
  let element: HTMLElement | null = null;
  if (hashFragment === '#') {
    element = document.body;
  } else {
    const id = hashFragment.replace('#', '');
    element = document.getElementById(id);
    if (element === null && hashFragment === '#top') {
      element = document.body;
    }
  }

  if (element !== null) {
    scrollFunction?.(element);
    let originalTabIndex = element.getAttribute('tabindex');
    if (originalTabIndex === null && !isInteractiveElement(element)) {
      element.setAttribute('tabindex', '-1');
    }
    element.focus({ preventScroll: true });
    if (originalTabIndex === null && !isInteractiveElement(element)) {
      element.blur();
      element.removeAttribute('tabindex');
    }

    reset();
    return true;
  }
  return false;
}

function hashLinkScroll(timeout) {
  window.setTimeout(() => {
    if (!getElAndScroll()) {
      if (observer === null) {
        observer = new MutationObserver(getElAndScroll);
      }
      observer.observe(document, {
        attributes: true,
        childList: true,
        subtree: true,
      });
      asyncTimerId = window.setTimeout(() => {
        reset();
      }, timeout || 10000);
    }
  }, 0);
}

export function genericHashLink(As) {
  return React.forwardRef((props: NavHashLinkProps, ref) => {
    let linkHash = '';
    if (typeof props.to === 'string' && props.to.includes('#')) {
      linkHash = `#${props.to.split('#').slice(1).join('#')}`;
    } else if (typeof props.to === 'object' && typeof props.to.hash === 'string') {
      linkHash = props.to.hash;
    }

    const passDownProps: any = {};

    function handleClick(e) {
      reset();
      hashFragment = props.elementId ? `#${props.elementId}` : linkHash;
      if (props.onClick) props.onClick(e);
      if (
        hashFragment !== '' &&
        !e.defaultPrevented && // onClick prevented default
        e.button === 0 && // ignore everything but left clicks
        (!props.target || props.target === '_self') && // let browser handle "target=_blank" etc
        !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) // ignore clicks with modifier keys
      ) {
        scrollFunction = props.scroll || ((el) => (props.smooth ? el.scrollIntoView({ behavior: 'smooth' }) : el.scrollIntoView()));
        hashLinkScroll(props.timeout);
      }
    }
    const { scroll, smooth, timeout, elementId, ...filteredProps } = props;
    return (
      <As {...passDownProps} {...filteredProps} onClick={handleClick} ref={ref}>
        {props.children}
      </As>
    );
  });
}

export const HashLink = genericHashLink(Link);

export const NavHashLink = genericHashLink(NavLink);

if (process.env.NODE_ENV !== 'production') {
  HashLink.displayName = 'HashLink';
  NavHashLink.displayName = 'NavHashLink';
}
