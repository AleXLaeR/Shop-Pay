type IpRegistryCurrency = { code: string };

type IpRegistryCountry = {
  name: string;
  flag: { emojitwo: string };
};

type IpRegistryResponse = {
  currency: IpRegistryCurrency;
  location: { country: IpRegistryCountry };
};

interface IpRegistryProps {
  data: {
    currency: IpRegistryCurrency;
    country: IpRegistryCountry;
  };
}
