import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Field, FieldGroup } from "../ui/field";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateAddressValidationSchema } from "@/lib/schema";
import { updateAddress, type UpdateAddressParams } from "@/api/address.api";
import { Separator } from "../ui/separator";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import type { Address } from "@/api/auth.api";
import { Label } from "../ui/label";

const UpdateAddressForm = ({ address }: { address: Address }) => {
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="uppercase hover:bg-transparent mr-1 md:mr-0"
          variant={"outline"}
        >
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl max-h-[80dvh] overflow-y-auto z-200">
        <form
          className="flex flex-col"
          onSubmit={handleSubmit(handleUpdateAddress)}
        >
          <DialogHeader>
            <DialogTitle className="text-center">Update Address</DialogTitle>
          </DialogHeader>

          <Separator className="mt-3 mb-3" />

          <FieldGroup>
            <Field>
              <Label htmlFor="addressLine">Street Address</Label>
              <Input
                id="addressLine"
                {...register("addressLine")}
                placeholder="Address Line*"
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
              />
              {errors.postalCode && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.postalCode.message}
                </p>
              )}
            </Field>
            <Field>
              <Label htmlFor="city">City</Label>
              <Input id="city" {...register("city")} placeholder="City*" />
              {errors.city && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.city.message}
                </p>
              )}
            </Field>
            <Field>
              <Label htmlFor="state">State</Label>
              <Input id="state" {...register("state")} placeholder="State*" />
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
              />
              {errors.country && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.country.message}
                </p>
              )}
            </Field>
          </FieldGroup>

          <DialogFooter className="mt-5">
            <DialogClose asChild>
              <Button disabled={loading} type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={!isDirty || loading}>
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Spinner /> Updating Address...
                </div>
              ) : (
                <>Update Address</>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateAddressForm;
