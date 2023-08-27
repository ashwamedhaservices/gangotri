import { createContext } from 'react';
import { getAccountsKycedAddress, postAccountsKycedAddress, putAccountsKycedAddress } from '../../service/ash_admin';

export const KycAddressContext = createContext();

export const KycAddressContextProvider = (props) => {

  const _fetchKycAddressData = async (kycId) => {
    try {
      const nominees = await getAccountsKycedAddress(kycId);
      console.log("[KycAddressContextProvider]::[_fetchKycAddressData]::", nominees);
      return nominees;
    } catch (error) {
      console.error("[KycAddressContextProvider]::[_fetchKycAddressData]::err", error);
      return {};
    }
  };

  const _createKycAddress = async (address, kycId) => {
    /** Cases
     * 1.) KYC Already exist
    */
    try {
      const payload = { address: address };
      console.log('[KycAddressContextProvider]::[_createKycAddress]:: Enter', payload);
      const data = await postAccountsKycedAddress(payload, kycId);
      console.log("[KycAddressContextProvider]::[_createKycAddress]::", data);
      return data
    } catch (error) {
      console.error("[KycAddressContextProvider]::[_createKycAddress]::err", error);
      return {}
    }
  };

  const _updateKycAddress = async (address) => {
    try {
      const payload = { address: address };
      console.log('[KycAddressContextProvider]::[_updateKycAddress]:: Enter', payload);
      const data = await putAccountsKycedAddress(payload, address.id);
      console.log('[KycAddressContextProvider]::[_updateKycAddress]:: ', data);
      return data
    } catch (error) {
      console.error("[KycAddressContextProvider]::[_updateKycAddress]::err", error);
      return {}
    }
  };

  return <KycAddressContext.Provider
   value={{
     fetchKycAddressData: _fetchKycAddressData,
     createKycAddress: _createKycAddress,
     updateKycAddress: _updateKycAddress,
   }}>
    {props.children}
  </KycAddressContext.Provider>
}