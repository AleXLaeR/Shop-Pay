import styles from '@styles/footer.module.scss';

import FooterLinks from './FooterLinks';
import FooterSocials from './FooterSocials';
import NewsLetter from './NewsLetter';
import Payments from './Payments';
import Copyright from './Copyright';

interface FooterProps extends Partial<IpRegistryResponse> {
  country: IpRegistryCountry;
}

export default function Footer({ country }: FooterProps) {
  return (
    <div className="bg-grey">
      <div className={styles.container}>
        <FooterLinks />
        <FooterSocials />
        <NewsLetter />
        <Payments />
        <Copyright countryName={country.name} />
      </div>
    </div>
  );
}
