import styles from '@styles/footer.module.scss';

import FooterLinks from './FooterLinks';
import FooterSocials from './FooterSocials';
import NewsLetter from './NewsLetter';
import Payments from './Payments';
import Copyright from './Copyright';

export default function Footer() {
  return (
    <div className="bg-grey">
      <div className={styles.container}>
        <FooterLinks />
        <FooterSocials />
        <NewsLetter />
        <Payments />
        <Copyright />
      </div>
    </div>
  );
}
