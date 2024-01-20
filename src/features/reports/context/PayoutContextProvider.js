import { useContext, createContext } from 'react';
import { getPayoutReportCsv} from '../../../service/ash_admin';
const PayoutContext = createContext();

export const PayoutContextProvider = ({ children }) => {
  const fetchPayoutReport = async () => {
    try {
      const csvData = await getPayoutReportCsv();
      return csvData;
    } catch (error) {
      console.error('Error fetching payout report:', error);
      return null;
    }
  };
  return (
    <PayoutContext.Provider value={{ fetchPayoutReport}}>
      {children}
    </PayoutContext.Provider>
  );
};

export const usePayoutContext = () => {
  return useContext(PayoutContext);
};
