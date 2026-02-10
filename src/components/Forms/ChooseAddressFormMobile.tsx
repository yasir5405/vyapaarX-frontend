import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useAuth } from "@/context/AuthContext";
import { RadioGroup } from "../ui/radio-group";
import AddressCard from "../Cards/AddressCard";
import { useAddress } from "@/context/AddressContext";
import { useState } from "react";
import AddAddressForm from "./AddAddressForm";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const ChooseAddressFormMobile = () => {
  const { user } = useAuth();

  const { selectedAddressId, setSelectedAddressId } = useAddress();

  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant={"outline"}
          className="hover:bg-transparent block md:hidden text-primary hover:text-primary border-2 w-full sm:w-auto whitespace-nowrap "
        >
          CHANGE ADDRESS
        </Button>
      </SheetTrigger>

      <SheetContent side="bottom" className="overflow-x-hidden max-w-full">
        <SheetHeader>
          <SheetTitle>SELECT DELIVERY ADDRESS</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>

        <Separator />

        <div className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto">
          {/* Add Adress button div */}
          <div className="w-full flex items-center justify-between py-2 px-3">
            <h1 className="uppercase text-sm font-semibold text-muted-foreground">
              Saved Address
            </h1>

            <AddAddressForm />
          </div>

          <Separator />

          {/* List of user added addresses */}
          <div className="w-full pl-0">
            <RadioGroup
              className="w-full"
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
      </SheetContent>
    </Sheet>
  );
};

export default ChooseAddressFormMobile;
