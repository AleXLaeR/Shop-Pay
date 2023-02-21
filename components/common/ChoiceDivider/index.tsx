import styles from './ChoiceDivider.module.scss';

interface ChoiceDividerProps {
  content: string;
  className?: string;
}

export default function ChoiceDivider({ content, className }: ChoiceDividerProps) {
  return <div className={`${styles.container} ${className || ''}`}>{content}</div>;
}
