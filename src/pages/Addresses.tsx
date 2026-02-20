import { deleteAddress, updateDefaultAddress } from "@/api/address.api";
import type { Address } from "@/api/auth.api";
import AddAddressForm from "@/components/Forms/AddAddressForm";
import AddAddressFormMobile from "@/components/Forms/AddAddressFormMobile";
import UpdateAddressForm from "@/components/Forms/UpdateAddressForm";
import UpdateAddressFormMobile from "@/components/Forms/UpdateAddressFormMobile";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { useAddress } from "@/context/AddressContext";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { toast } from "sonner";

const Addresses = () => {
  const { user } = useAuth();

  const defaultAddress = user?.addresses?.find(
    (address) => address.isDefault === true,
  );

  const otherAddresses = user?.addresses?.filter(
    (address) => address.isDefault !== true,
  );
  return (
    <div className="max-w-2xl p-1 md:p-4 flex flex-col gap-2">
      <div className="flex w-full items-center justify-between">
        <h1 className="font-semibold text-lg hidden md:block">
          Saved Addresses
        </h1>

        <AddAddressForm type="button" size="lg" />

        <AddAddressFormMobile />
      </div>
      <Separator className="md:hidden block" />

      <div className="w-full flex flex-col gap-2 mt-5">
        <h1 className="text-xs md:text-sm font-semibold uppercase">
          Default Address
        </h1>

        {defaultAddress ? (
          <UserAddressCard address={defaultAddress} />
        ) : (
          <p className="text-sm text-muted-foreground">
            No default address found.
          </p>
        )}

        <h1 className="text-xs md:text-sm font-semibold uppercase mt-4">
          Other Addresses
        </h1>

        <div className="w-full flex flex-col gap-4">
          {otherAddresses &&
            otherAddresses.map((address) => (
              <UserAddressCard address={address} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Addresses;

const UserAddressCard = ({ address }: { address?: Address }) => {
  const { refreshUser, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const { selectedAddressId, setSelectedAddressId } = useAddress();

  const handleSetDefaultAddress = async (addressId: number) => {
    try {
      setLoading(true);
      const res = await updateDefaultAddress(addressId);

      if (!res.success) {
        toast.error("Error setting default address. Please try again");
        return;
      }

      toast.success(res.message);
      await refreshUser();
    } catch {
      toast.error("Error setting default address. Please try again");
      return;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAddress = async (addressId: number) => {
    try {
      setLoading(true);
      const res = await deleteAddress(addressId);
      if (!res.success) {
        toast.error("Error deleting address. Please try again");
        return;
      }

      if (String(addressId) === selectedAddressId) {
        setSelectedAddressId("");
        localStorage.removeItem("selectedAddressId");
      }
      toast.success(res.message);
      await refreshUser();
    } catch {
      toast.error("Error deleting address. Please try again");
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full border shadow-sm hover:shadow-2xl transition-all duration-100 ease-in cursor-pointer flex flex-col gap-4 p-2.5">
      <div className="w-full flex items-center justify-between">
        <h1 className="font-semibold text-muted-foreground text-xs md:text-sm">
          {user?.name}
        </h1>

        {address && !address.isDefault && (
          <Button
            className="text-primary"
            size={"xs"}
            variant={"outline"}
            onClick={() => handleSetDefaultAddress(address.id)}
            disabled={loading}
          >
            {loading ? (
              <p className="flex items-center justify-center gap-2">
                <Spinner /> Setting default...
              </p>
            ) : (
              <>Set default</>
            )}
          </Button>
        )}
      </div>

      <div className="w-full flex flex-col gap-0.5 text-neutral-500 text-xs md:text-sm">
        <h1>{address?.addressLine}</h1>
        <h1>
          {address?.city} - {address?.postalCode}
        </h1>
        <h1>{address?.state}</h1>
      </div>

      <p className="text-neutral-500 text-xs md:text-sm">
        Email:- {user?.email}
      </p>

      <Separator />

      <div className="flex w-full gap-1 md:gap-6">
        {address && (
          <UpdateAddressForm
            triggerClassnames="flex-1 text-primary hover:text-primary"
            address={address}
          />
        )}

        {address && (
          <UpdateAddressFormMobile
            address={address}
            triggerClassnames="flex-1 text-primary hover:text-primary"
          />
        )}

        {address && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant={"outline"}
                size={"icon-sm"}
                className="flex-1 text-primary hover:text-primary hover:bg-transparent"
              >
                Remove
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this address.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDeleteAddress(address.id)}
                >
                  Delete Address
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  );
};
