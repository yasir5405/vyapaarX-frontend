import { useState } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Field, FieldGroup } from "../ui/field";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addAddressValidationSchema } from "@/lib/schema";
import { addAddress, type AddAddressParams } from "@/api/address.api";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const AddAddressFormMobile = ({ type }: { type?: string }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setError,
  } = useForm<AddAddressParams>({
    resolver: zodResolver(addAddressValidationSchema),
    shouldFocusError: false,
  });
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const { refreshUser } = useAuth();

  const handleAddAddress = async (data: AddAddressParams) => {
    try {
      setLoading(true);
      const res = await addAddress(data);

      if (!res.success) {
        const message = res.error?.message ?? res.message;

        if (message.toLowerCase().includes("addressLine")) {
          setError("addressLine", {
            type: "server",
            message,
          });
        } else if (message.toLowerCase().includes("city")) {
          setError("city", {
            type: "server",
            message,
          });
        } else if (message.toLowerCase().includes("country")) {
          setError("country", {
            type: "server",
            message,
          });
        } else if (message.toLowerCase().includes("postalCode")) {
          setError("postalCode", {
            type: "server",
            message,
          });
        } else if (message.toLowerCase().includes("state")) {
          setError("state", {
            type: "server",
            message,
          });
        } else {
          setError("root", {
            type: "server",
            message,
          });
        }

        toast.error(message);
        setLoading(false);
        return;
      }

      toast.success("Address was added successfully");
      await refreshUser();
      setOpen(false);
      reset();
    } catch {
      toast.error("Error adding address");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {type === "button" ? (
          <Button
            className="flex md:hidden border mt-2 border-black text-sm w-[93%] font-semibold uppercase mx-auto"
            variant={"outline"}
          >
            Add new address
          </Button>
        ) : (
          <Button
            className="flex md:hidden capitalize text-sm font-semibold"
            variant={"link"}
          >
            <Plus className="size-3.5" />
            Add new address
          </Button>
        )}
      </SheetTrigger>

      <SheetContent side="bottom" className="flex flex-col max-h-dvh z-9999">
        <SheetHeader className="shrink-0">
          <SheetTitle className="uppercase">Add new address</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>

        <form
          className="flex flex-col px-2 pb-28 overflow-y-auto flex-1"
          onSubmit={handleSubmit(handleAddAddress)}
        >
          {/* <Separator className="" /> */}

          <FieldGroup>
            <Field>
              <Input
                id="addressLine"
                {...register("addressLine")}
                placeholder="Address Line*"
                className="text-sm placeholder:text-xs"
                autoFocus={false}
              />
              {errors.addressLine && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.addressLine.message}
                </p>
              )}
            </Field>
            <Field>
              <Input
                id="postalCode"
                {...register("postalCode")}
                placeholder="Pin Code*"
                className="text-sm placeholder:text-xs"
              />
              {errors.postalCode && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.postalCode.message}
                </p>
              )}
            </Field>
            <Field>
              <Input
                id="city"
                {...register("city")}
                placeholder="City*"
                className="text-sm placeholder:text-xs"
              />
              {errors.city && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.city.message}
                </p>
              )}
            </Field>
            <Field>
              <Input
                id="state"
                {...register("state")}
                placeholder="State*"
                className="text-sm placeholder:text-xs"
              />
              {errors.state && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.state.message}
                </p>
              )}
            </Field>
            <Field>
              <Input
                id="country"
                {...register("country")}
                placeholder="Country*"
                className="text-sm placeholder:text-xs"
              />
              {errors.country && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.country.message}
                </p>
              )}
            </Field>
          </FieldGroup>

          <SheetFooter className="mt-5 flex flex-row fixed left-0 bottom-0 w-full bg-background border shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
            <SheetClose asChild className="flex-1">
              <Button
                disabled={loading}
                type="button"
                size={"lg"}
                variant="outline"
              >
                Cancel
              </Button>
            </SheetClose>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1"
              size={"lg"}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-1">
                  <Spinner /> Adding Address...
                </div>
              ) : (
                <>Add Address</>
              )}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default AddAddressFormMobile;
