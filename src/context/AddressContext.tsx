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
      localStorage.removeItem("selectedAddressId");
      return;
    }

    if (!user.addresses?.length) {
      setSelectedAddressId(null);
      localStorage.removeItem("selectedAddressId");
      return;
    }

    const stored = localStorage.getItem("selectedAddressId");
    if (stored && user.addresses.some((a) => String(a.id) === stored)) {
      setSelectedAddressId(stored);
      return;
    }

    const def = user.addresses.find((a) => a.isDefault);
    if (def) {
      setSelectedAddressId(String(def.id));
      localStorage.setItem("selectedAddressId", String(def.id));
    }
  }, [user]);
  // Remove user?.addresses from dependencies

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
