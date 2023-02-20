type _IpRegistryCurrency = { code: string };

type _IpRegistryCountry = {
  name: string;
  flagUri: string;
};

interface IpRegistryState {
  currency: _IpRegistryCurrency;
  country: _IpRegistryCountry;
}
