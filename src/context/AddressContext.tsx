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

    if (!user.addresses || user.addresses.length === 0) {
      setSelectedAddressId(null);
      localStorage.removeItem("selectedAddressId");
      return;
    }

    // Only set address if none is currently selected
    if (selectedAddressId === null) {
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
        localStorage.setItem("selectedAddressId", String(defaultAddress.id));
      }
    } else {
      // Validate that currently selected address still exists
      const addressExists = user.addresses.find(
        (a) => String(a.id) === selectedAddressId,
      );
      if (!addressExists) {
        // Selected address was deleted, find new default
        const defaultAddress = user.addresses.find((a) => a.isDefault);
        if (defaultAddress) {
          setSelectedAddressId(String(defaultAddress.id));
          localStorage.setItem("selectedAddressId", String(defaultAddress.id));
        } else {
          setSelectedAddressId(null);
          localStorage.removeItem("selectedAddressId");
        }
      }
    }
  }, [user, selectedAddressId]); // Remove user?.addresses from dependencies

  // Save to localStorage whenever address changes
  useEffect(() => {
    if (selectedAddressId && selectedAddressId !== "") {
      localStorage.setItem("selectedAddressId", selectedAddressId);
    } else {
      localStorage.removeItem("selectedAddressId");
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
