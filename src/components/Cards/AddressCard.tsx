import { useAuth } from "@/context/AuthContext";
import { Label } from "../ui/label";
import { RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import type { Address } from "@/api/auth.api";
import { useAddress } from "@/context/AddressContext";

const AddressCard = ({
  address,
  onClose,
}: {
  address: Address;
  onClose: () => void;
}) => {
  const { user } = useAuth();
  const { selectedAddressId, setSelectedAddressId } = useAddress();
  const isSelected = selectedAddressId === String(address.id);

  return (
    <div className="w-full p-3 flex flex-col cursor-pointer">
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
          <Button
            className="uppercase hover:bg-transparent"
            variant={"outline"}
          >
            Edit
          </Button>
        </div>

        <Button variant={"outline"} size={"icon-sm"}>
          <Trash />
        </Button>
      </div>
    </div>
  );
};

export default AddressCard;
