import { createContext, useContext } from 'react';
import { getAccountsKycedBank, getBankByIdForAdmin, postAccountsKycedBank, putAccountsKycedBank } from '../../service/ash_admin';

const KycBankContext = createContext();

export const KycBankContextProvider = (props) => {
  // TODO: Error Case Needs to be handled
  const _fetchKycBankData = async (kycId) => {
    try {
      const bank = await getAccountsKycedBank(kycId);
      console.log("[KycBankContextProvider]::[_fetchKycBankData]::", bank);
      return bank;
    } catch (error) {
      console.error("[KycBankContextProvider]::[_fetchKycBankData]::err", error);
      return {};
    }
  };

  const _createKycBank = async (bank, kycId) => {
    /** Cases
     * 1.) KYC Already exist
    */
    try {
      const payload = { bank_account: bank };
      console.log(`[KycBankContextProvider]::[_createKycBank]:: Enter ${payload}`);
      const data = await postAccountsKycedBank(payload, kycId);
      console.log("[KycBankContextProvider]::[_createKycBank]::", data);
      return data
    } catch (error) {
      console.error("[KycBankContextProvider]::[_createKycBank]::err", error);
      return {}
    }
  };

  const _updateKycBank = async (bank) => {
    try {
      const payload = { bank_account: bank };
      console.log('[KycBankContextProvider]::[_updateKycBank]:: Enter', payload);
      const data = await putAccountsKycedBank(payload, bank.id);
      console.log('[KycBankContextProvider]::[_updateKycBank]:: ', data);
      return data
    } catch (error) {
      console.error("[KycBankContextProvider]::[_updateKycBank]::err", error);
      return {}
    }
  };

  const _fetchBankByIdForAdminData = async (id) => {
    try {
      const data = await getBankByIdForAdmin(id);
      console.log("[KycBankContextProvider]::[_fetchBankByIdForAdminData]::", data);
      return data;
    } catch (error) {
      console.error("[KycBankContextProvider]::[_fetchBankByIdForAdminData]::err", error);
      return {}
    }
  }

  return <KycBankContext.Provider
   value={{
     fetchKycBankData: _fetchKycBankData,
     createKycBank: _createKycBank,
     updateKycBank: _updateKycBank,
     fetchBankByIdForAdminData: _fetchBankByIdForAdminData
   }}>
    {props.children}
  </KycBankContext.Provider>
}

export const useKycBankContext = () => {
  return useContext(KycBankContext);
}