import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Field, FieldGroup } from "../ui/field";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateAddressValidationSchema } from "@/lib/schema";
import { updateAddress, type UpdateAddressParams } from "@/api/address.api";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import type { Address } from "@/api/auth.api";
import { Label } from "../ui/label";
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

const UpdateAddressFormMobile = ({ address }: { address: Address }) => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
    setError,
  } = useForm<UpdateAddressParams>({
    resolver: zodResolver(updateAddressValidationSchema),
    defaultValues: {
      addressLine: address.addressLine ?? "",
      city: address.city ?? "",
      country: address.country ?? "",
      postalCode: address.postalCode ?? "",
      state: address.postalCode ?? "",
    },
  });
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const { refreshUser } = useAuth();

  const handleUpdateAddress = async (data: UpdateAddressParams) => {
    try {
      setLoading(true);
      const res = await updateAddress(data, address.id);

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

      toast.success("Address was updated successfully");
      await refreshUser();
      setOpen(false);
      reset();
    } catch {
      toast.error("Error updating address");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reset({
      addressLine: address.addressLine ?? "",
      city: address.city ?? "",
      country: address.country ?? "",
      postalCode: address.postalCode ?? "",
      state: address.state ?? "",
    });
  }, [address, reset]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="flex md:hidden">
        <Button
          className="uppercase hover:bg-transparent mr-1 md:mr-0"
          variant={"outline"}
        >
          Edit
        </Button>
      </SheetTrigger>

      <SheetContent side="bottom" className="flex flex-col max-h-dvh z-9999">
        <SheetHeader className="shrink-0">
          <SheetTitle className="uppercase">Update address</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>

        <form
          className="flex flex-col px-2 pb-28 overflow-y-auto flex-1"
          onSubmit={handleSubmit(handleUpdateAddress)}
        >
          <FieldGroup>
            <Field>
              <Label htmlFor="addressLine">Street Address</Label>
              <Input
                id="addressLine"
                {...register("addressLine")}
                placeholder="Address Line*"
                className="text-sm placeholder:text-xs"
              />
              {errors.addressLine && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.addressLine.message}
                </p>
              )}
            </Field>
            <Field>
              <Label htmlFor="postalCode">Pin Code</Label>
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
              <Label htmlFor="city">City</Label>
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
              <Label htmlFor="state">State</Label>
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
              <Label htmlFor="country">Country</Label>
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
                variant="outline"
                size={"lg"}
              >
                Cancel
              </Button>
            </SheetClose>
            <Button
              type="submit"
              disabled={!isDirty || loading}
              className="flex-1"
              size={"lg"}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Spinner /> Updating Address...
                </div>
              ) : (
                <>Update Address</>
              )}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default UpdateAddressFormMobile;
