import { useAuth } from "@/context/AuthContext";
import { Label } from "../ui/label";
import { RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import type { Address } from "@/api/auth.api";
import { useAddress } from "@/context/AddressContext";
import UpdateAddressForm from "../Forms/UpdateAddressForm";
import { useState } from "react";
import { toast } from "sonner";
import { deleteAddress, updateDefaultAddress } from "@/api/address.api";
import { Spinner } from "../ui/spinner";
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
} from "../ui/alert-dialog";

const AddressCard = ({
  address,
  onClose,
}: {
  address: Address;
  onClose: () => void;
}) => {
  const { user, refreshUser } = useAuth();
  const { selectedAddressId, setSelectedAddressId } = useAddress();
  const isSelected = selectedAddressId === String(address.id);
  const [loading, setLoading] = useState(false);

  const handleSetDefaultAddress = async (addressId: number) => {
    try {
      setLoading(true);
      const res = await updateDefaultAddress(addressId);

      if (!res.success) {
        toast.error("Error setting default address. Please try again");
        return;
      }

      toast.success(res.message);
      refreshUser();
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
      toast.success(res.message);
      refreshUser();
    } catch {
      toast.error("Error deleting address. Please try again");
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-3 flex flex-col cursor-pointer relative">
      <Button
        className="absolute top-2 right-0"
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
      <div className="flex items-center w-full">
        <RadioGroupItem
          value={String(address.id)}
          id={String(address.id)}
          onClick={onClose}
        />
        <Label
          htmlFor={String(address.id)}
          className="font-semibold text-sm ml-3"
        >
          {user?.name}
        </Label>

        {address && address.isDefault ? (
          <p className="font-extralight text-sm text-neutral-400 ml-2">
            (Default)
          </p>
        ) : null}
      </div>

      <div className="flex flex-col py-2 ml-7 text-sm w-full">
        <h1>{address.addressLine}</h1>
        <h1>{address.city}</h1>
        <h1>
          {address.city}, {address.state} - {address.postalCode}
        </h1>
      </div>

      <div className="flex items-center justify-between ml-7 w-full">
        <div className="flex items-center gap-4">
          <Button
            className="uppercase"
            disabled={isSelected}
            onClick={() => {
              setSelectedAddressId(String(address.id));
              onClose();
            }}
          >
            {isSelected ? "Delivering here" : "Deliver here"}
          </Button>

          <UpdateAddressForm address={address} />
        </div>

        {/* Delete Address button */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant={"outline"} size={"icon-sm"}>
              <Trash />
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                address.
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
      </div>
    </div>
  );
};

export default AddressCard;
