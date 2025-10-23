"use client";
import AccountDetails from '@/app/profile/accountDetails';
import AddressSection from '@/app/profile/address';
import ChangePassword from '@/app/profile/changePassword';
import OrderDetails from '@/app/profile/orderDetails';
import ProfileItem from '@/components/common/profileItem/profileItem';
import { ResponsivePageContainer } from '@/components/common/responsivePageContainer/responsivePageContainer';
import SectionHeading from '@/components/common/sectionHeading/sectionHeading';
import Spacer from '@/components/spacer/spacer';
import { logout } from '@/firebaseConfig/firebaseConfig';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const profileItems = [
  { id: "orders", name: "Your Orders" },
  // { id: "wallet", name: "Your Wallet" },
  { id: "account", name: "Account Details" },
  // { id: "password", name: "Password" },
  // { id: "address", name: "Your Address" },
  { id: "logout", name: "Log Out" },
];

const Profile = () => {
    const [selectedItem, setSelectedItem] = useState("orders");
    const [showLogoutPopup, setShowLogoutPopup] = useState(false);
    const router = useRouter();

    const handleLogout = async () => {
      try {
        await logout();
        router.push("/login");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };

    const renderContent = () => {
      switch (selectedItem) {
        case "orders":
          return <OrderDetails />;
        // case "wallet":
        // return <div>Your Wallet Content</div>;
        case "account":
          return <AccountDetails />;
        case "password":
          return <ChangePassword />;
        case "address":
          return <AddressSection />;
        case "logout":
          return (
            <div className="flex justify-center items-center h-full">
              {showLogoutPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white p-6 rounded shadow-lg text-center">
                    <p className="text-black font-ibm-plex-mono">
                      Are you sure you want to log out?
                    </p>
                    <div className="mt-4 flex justify-center gap-4">
                      <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded font-ibm-plex-mono"
                      >
                        Yes, Log Out
                      </button>
                      <button
                        onClick={() => setShowLogoutPopup(false)}
                        className="bg-gray-300 px-4 py-2 rounded font-ibm-plex-mono text-black"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <button
                onClick={() => setShowLogoutPopup(true)}
                className="bg-red-500 text-white px-4 py-2 rounded font-ibm-plex-mono"
              >
                Log Out
              </button>
            </div>
          );
        default:
          return null;
      }
    };
  return (
    <div>
      <ResponsivePageContainer>
        <Spacer />
        <div className="flex flex-col gap-6 custom-md:gap-8">
          <SectionHeading title="PROFILE" />
          <div className="grid grid-cols-1 custom-sm:grid-cols-4 gap-4">
            <div className="flex flex-col h-fit gap-2 p-4 border border-strokeDark col-span-1 custom-sm:col-span-1 rounded-lg">
              {profileItems.map((item) => (
                <ProfileItem
                  key={item.id}
                  name={item.name}
                  id={item.id}
                  isSelected={selectedItem === item.id}
                  onClick={() => setSelectedItem(item.id)}
                  textColor={item.name === "Log Out" ? "#FF7373" : "white"}
                />
              ))}
            </div>
            {selectedItem === "orders" ? (
              <div className="col-span-1 custom-sm:col-span-3">
                <OrderDetails />
              </div>
            ) : (
              <div className="col-span-1 custom-sm:col-span-3 p-4 border border-strokeDark border-py-6 rounded-lg">
                {renderContent()}
              </div>
            )}
          </div>
        </div>
        <Spacer />
      </ResponsivePageContainer>
    </div>
  );
}

export default Profile