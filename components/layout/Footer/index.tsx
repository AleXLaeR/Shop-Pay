import styles from '@styles/footer.module.scss';

import FooterLinks from './FooterLinks';
import FooterSocials from './FooterSocials';
import NewsLetter from './NewsLetter';
import Payments from './Payments';
import Copyright from './Copyright';

interface FooterProps {
  bordered?: boolean;
}

export default function Footer({ bordered }: FooterProps) {
  return (
    <div className={`${styles.container} ${bordered ? 'border-t border-t-greyish' : ''}`}>
      <FooterLinks />
      <FooterSocials />
      <NewsLetter />
      <Payments />
      <Copyright />
    </div>
  );
}
