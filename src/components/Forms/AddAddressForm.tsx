import { useState } from "react";
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
import { Plus } from "lucide-react";
import { Field, FieldGroup } from "../ui/field";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addAddressValidationSchema } from "@/lib/schema";
import { addAddress, type AddAddressParams } from "@/api/address.api";
import { Separator } from "../ui/separator";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

const AddAddressForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setError,
  } = useForm<AddAddressParams>({
    resolver: zodResolver(addAddressValidationSchema),
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="capitalize text-sm font-semibold" variant={"link"}>
          <Plus className="size-3.5" />
          Add new address
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl max-h-[80dvh] overflow-y-auto z-200">
        <form
          className="flex flex-col"
          onSubmit={handleSubmit(handleAddAddress)}
        >
          <DialogHeader>
            <DialogTitle className="text-center">Add Address</DialogTitle>
          </DialogHeader>

          <Separator className="mt-3 mb-3" />

          <FieldGroup>
            <Field>
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
              <Input id="city" {...register("city")} placeholder="City*" />
              {errors.city && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.city.message}
                </p>
              )}
            </Field>
            <Field>
              <Input id="state" {...register("state")} placeholder="State*" />
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
            <Button type="submit" disabled={loading}>
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Spinner /> Adding Address...
                </div>
              ) : (
                <>Add Address</>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAddressForm;
