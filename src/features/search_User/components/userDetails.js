import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Typography } from '@mui/material';

const UserDetails = ({ userId }) => {
  const [userData, setUserData] = useState({});
  const [activeTab, setActiveTab] = useState('kyc');

  useEffect(() => {
    const apiUrl = `https://apistage.ashwamedha.net/staging/accounts/admin/api/v1/users/${userId}/details.json`;

    const authToken = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MTIsInByb2ZpbGVfaWQiOjEyfQ.KXMZMWfmnMPDbWhF9ale1XyfEdJAYI5mpY7P4Br_DpM';
 
    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': authToken,
      },
    })
      .then(response => response.json())
      .then(data => setUserData(data.data))
      .catch(error => console.error('Error fetching data:', error));
  }, [userId]);

  const renderKYCTab = () => (
    <>
      {Object.entries(userData.kyc || {}).map(([key, value]) => (
        <div key={key}>
           <Typography key={key}>
          <span style={{ fontWeight: "bold" }}>{key}:</span> {value}
        </Typography>
        </div>
      ))}
    </>
  );

  const renderBankTab = () => (
    <>
      {userData.bank_accounts?.map(account => (
        <div key={account.id}>
          {Object.entries(account).map(([key, value]) => (
            <Typography key={key}>
            <span style={{ fontWeight: "bold" }}>{key}:</span> {value}
          </Typography>
          ))}
        </div>
      ))}
    </>
  );

  const renderNomineeTab = () => (
    <>
      {userData.nominees?.map(nominee => (
        <div key={nominee.id}>
          {Object.entries(nominee).map(([key, value]) => (
             <Typography key={key}>
             <span style={{ fontWeight: "bold" }}>{key}:</span> {value}
           </Typography>
          ))}
        </div>
      ))}
    </>
  );

  const renderProductSubscriptionTab = () => (
    <>
      {userData.product_subscriptions?.map(subscription => (
        <div key={subscription.id}>
          {Object.entries(subscription).map(([key, value]) => (
             <Typography key={key}>
             <span style={{ fontWeight: "bold" }}>{key}:</span> {value}
           </Typography>
          ))}
        </div>
      ))}
    </>
  );

  const renderAddressTab = () => (
    <>
      {userData.addresses?.map(address => (
        <div key={address.id}>
          {Object.entries(address).map(([key, value]) => (
             <Typography key={key}>
             <span style={{ fontWeight: "bold" }}>{key}:</span> {value}
           </Typography>
          ))}
        </div>
      ))}
    </>
  );

  const renderProfileTab = () => (
    <>
       {userData.profiles?.map(profiles => (
        <div key={profiles.id}>
          {Object.entries(profiles).map(([key, value]) => (
             <Typography key={key}>
             <span style={{ fontWeight: "bold" }}>{key}:</span> {value}
           </Typography>
          ))}
        </div>
      ))}
    </>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'kyc':
        return renderKYCTab();
      case 'bank':
        return renderBankTab();
      case 'nominee':
        return renderNomineeTab();
      case 'productSubscription':
        return renderProductSubscriptionTab();
      case 'address':
        return renderAddressTab();
      case 'profile':
        return renderProfileTab();
      default:
        return null;
    }
  };

  return (
    <>
      <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
        <Tab label="KYC" value="kyc" />
        <Tab label="Bank Accounts" value="bank" />
        <Tab label="Nominees" value="nominee" />
        <Tab label="Product Subscription" value="productSubscription" />
        <Tab label="Addresses" value="address" />
        <Tab label="Profiles" value="profile" />
      </Tabs>
      <div>
        {renderTabContent()}
      </div>
    </>
  );
};

export default UserDetails;
