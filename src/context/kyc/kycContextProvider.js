import { useContext } from 'react';
import { createContext } from 'react';
import { getAccountsKyc, getAllKycList, getKycByIdForAdmin, postAccountsKyc, putAccountsKyc } from '../../service/ash_admin';

const KycContext = createContext();

export const KycContextProvider = (props) => {
  // TODO: Error Case Needs to be handled
  const _fetchKycData = async () => {
    try {
      const kyc = await getAccountsKyc();
      console.log("[KycContextProvider]::[_fetchKycData]::", kyc);
      return kyc;
    } catch (error) {
      console.error("[KycContextProvider]::[_fetchKycData]::err", error);
      return {};
    }
  };

  const _createKyc = async (kyc) => {
    /** Cases
     * 1.) KYC Already exist
    */
    try {
      const payload = { kyc: kyc };
      console.log(`[KycContextProvider]::[_createKyc]:: Enter ${payload}`);
      const data = await postAccountsKyc(payload);
      console.log("[KycContextProvider]::[_createKyc]::", data);
      return data
    } catch (error) {
      console.error("[KycContextProvider]::[_createKyc]::err", error);
      return {}
    }
  };

  const _updateKyc = async (kyc) => {
    try {
      const payload = { kyc: kyc };
      console.log(`[KycContextProvider]::[_updateKyc]:: Enter ${payload}`);
      const data = await putAccountsKyc(payload, kyc.id);
      console.log(`[KycContextProvider]::[_updateKyc]:: ${data}`);
      return data
    } catch (error) {
      console.error("[KycContextProvider]::[_updateKyc]::err", error);
      return {}
    }
  };

  const _fetchAdminAllKycData = async () => {
    try {
      const kycs = await getAllKycList();
      console.log("[KycContextProvider]::[_fetchAdminAllKycData]::", kycs);
      return kycs;
    } catch (error) {
      console.error("[KycContextProvider]::[_fetchAdminAllKycData]::err", error);
      return {}
    }
  }

  const _fetchKycByIdForAdminData = async (id) => {
    try {
      const kycs = await getKycByIdForAdmin(id);
      console.log("[KycContextProvider]::[_fetchKycByIdForAdminData]::", kycs);
      return kycs;
    } catch (error) {
      console.error("[KycContextProvider]::[_fetchKycByIdForAdminData]::err", error);
      return {}
    }
  }

  return <KycContext.Provider
   value={{
     fetchKycData: _fetchKycData,
     createKyc: _createKyc,
     updateKyc: _updateKyc,
     fetchAllKycData: _fetchAdminAllKycData,
     fetchKycByIdForAdminData: _fetchKycByIdForAdminData
   }}>
    {props.children}
  </KycContext.Provider>
}

export const useKycContext = () => {
  return useContext(KycContext);
}