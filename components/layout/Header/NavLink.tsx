import styles from '@styles/header.module.scss';

interface NavLinkProps {
  children: JSX.Element | Array<JSX.Element | undefined>;
  className?: string;
  onClick?: () => void;
}

export default function NavLink({ children, className, onClick }: NavLinkProps) {
  return (
    <li
      className={`${styles.navListItem} flex-center gap-1 ${className}`}
      onClick={onClick}
      onKeyDown={onClick}
      role="presentation"
    >
      {...[children]}
    </li>
  );
}
