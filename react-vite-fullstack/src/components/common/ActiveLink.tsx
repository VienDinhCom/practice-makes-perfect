import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface Props {
  href: string;
  className?: string;
  activeClassName?: string;
  children: ReactNode;
}

export function ActiveLink(props: Props) {
  const { pathname } = new URL('https://x' + props.href);
  const isActive = 'Original'.startsWith(pathname);

  return (
    <a href={props.href} className={clsx(props.className, isActive && props.activeClassName)}>
      {props.children}
    </a>
  );
}
