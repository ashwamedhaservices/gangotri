import { createContext, useContext } from 'react';
import { getAccountsKycedAddress, getAddressByIdForAdmin, postAccountsKycedAddress, putAccountsKycedAddress } from '../../service/ash_admin';

const KycAddressContext = createContext();

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

  const _fetchAddressByIdForAdminData = async (id) => {
    try {
      const data = await getAddressByIdForAdmin(id);
      console.log("[KycAddressContextProvider]::[_fetchAddressByIdForAdminData]::", data);
      return data;
    } catch (error) {
      console.error("[KycAddressContextProvider]::[_fetchAddressByIdForAdminData]::err", error);
      return {}
    }
  }

  return <KycAddressContext.Provider
   value={{
     fetchKycAddressData: _fetchKycAddressData,
     createKycAddress: _createKycAddress,
     updateKycAddress: _updateKycAddress,
     fetchAddressByIdForAdminData: _fetchAddressByIdForAdminData
   }}>
    {props.children}
  </KycAddressContext.Provider>
}

export const useKycAddressContext = () => {
  return useContext(KycAddressContext);
}