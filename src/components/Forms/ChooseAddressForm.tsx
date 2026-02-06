import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Separator } from "../ui/separator";
import { useAuth } from "@/context/AuthContext";
import { RadioGroup } from "../ui/radio-group";
import AddressCard from "../Cards/AddressCard";
import { useAddress } from "@/context/AddressContext";
import { useState } from "react";
import AddAddressForm from "./AddAddressForm";

const ChooseAddressForm = () => {
  const { user } = useAuth();

  const { selectedAddressId, setSelectedAddressId } = useAddress();

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="hover:bg-transparent text-primary hover:text-primary border-2 w-full sm:w-auto whitespace-nowrap"
        >
          CHANGE ADDRESS
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select Delivery Address</DialogTitle>
        </DialogHeader>

        <Separator />

        <div className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto">
          {/* Add Adress button div */}
          <div className="w-full flex items-center justify-between py-2">
            <h1 className="uppercase text-sm font-semibold text-muted-foreground">
              Saved Address
            </h1>

            <AddAddressForm />
          </div>

          {/* List of user added addresses */}
          <div className="w-full">
            <RadioGroup
              className="w-full pr-7"
              value={selectedAddressId ?? ""}
              onValueChange={(value) => {
                setSelectedAddressId(value);
                console.log("Selected address id: ", value);
              }}
              defaultValue="rf-1"
            >
              {user?.addresses &&
                user.addresses.map((address, idx) => (
                  <AddressCard
                    key={idx}
                    address={address}
                    onClose={() => setOpen(false)}
                  />
                ))}
            </RadioGroup>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChooseAddressForm;
