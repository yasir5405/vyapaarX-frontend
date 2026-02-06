import type { Address } from "@/api/auth.api";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

type AddressContextType = {
  selectedAddressId: string | null;
  setSelectedAddressId: (id: string) => void;
  selectedAddress: Address | undefined;
};

const AddressContext = createContext<AddressContextType | undefined>(undefined);

export const AddressProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useAuth();

  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null,
  );

  // Initialize from localStorage or default address when user loads
  useEffect(() => {
    if (!user) {
      setSelectedAddressId(null);
      return;
    }
    if (user?.addresses && selectedAddressId === null) {
      // Try to get from localStorage first
      const storedAddressId = localStorage.getItem("selectedAddressId");

      // Check if stored address still exists in user's addresses
      if (storedAddressId) {
        const addressExists = user.addresses.find(
          (a) => String(a.id) === storedAddressId,
        );
        if (addressExists) {
          setSelectedAddressId(storedAddressId);
          return;
        }
      }

      // Fall back to default address
      const defaultAddress = user.addresses.find((a) => a.isDefault);
      if (defaultAddress) {
        setSelectedAddressId(String(defaultAddress.id));
      }
    }
  }, [user, selectedAddressId]);

  // Save to localStorage whenever address changes
  useEffect(() => {
    if (selectedAddressId) {
      localStorage.setItem("selectedAddressId", selectedAddressId);
    }
  }, [selectedAddressId]);

  const selectedAddress = user?.addresses?.find(
    (a) => String(a.id) === selectedAddressId,
  );

  return (
    <AddressContext.Provider
      value={{ selectedAddress, selectedAddressId, setSelectedAddressId }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => {
  const context = useContext(AddressContext);
  if (context === undefined) {
    throw new Error("useAddress must be used within an AddressProvider");
  }

  return context;
};
