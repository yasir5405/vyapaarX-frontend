import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useForm } from "react-hook-form";
import { addProduct, type AddProductParams } from "@/api/product.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { productValidationSchema } from "@/lib/schema";
import { Field, FieldGroup } from "../ui/field";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";

const AddProductForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    reset,
  } = useForm<AddProductParams>({
    resolver: zodResolver(productValidationSchema),
  });

  const [loading, setLoading] = useState(false);

  const handleAddProduct = async (data: AddProductParams) => {
    try {
      setLoading(true);
      const res = await addProduct(data);
      if (!res.success) {
        const message = res.error?.message ?? res.message;

        if (message.toLowerCase().includes("name")) {
          setError("name", {
            type: "server",
            message,
          });
        } else if (message.toLowerCase().includes("price")) {
          setError("price", {
            type: "server",
            message,
          });
        } else if (message.toLowerCase().includes("description")) {
          setError("description", {
            type: "server",
            message,
          });
        } else if (message.toLowerCase().includes("companyName")) {
          setError("companyName", {
            type: "server",
            message,
          });
        } else if (message.toLowerCase().includes("highlights")) {
          setError("highlights", {
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
        console.log(message);
        setLoading(false);
        return;
      }
      toast.success("Product was added successfully");
      onSuccess();
      setOpen(false);
      reset();
    } catch {
      toast.error("Error adding product");
    } finally {
      setLoading(false);
    }
  };

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" className="self-end">
          <Plus /> Add Product
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg max-h-[95dvh] overflow-y-auto">
        <form
          className="flex flex-col"
          onSubmit={handleSubmit(handleAddProduct)}
        >
          <DialogHeader>
            <DialogTitle>Add product</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <Field>
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register("name")} />
              {errors.name && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.name.message}
                </p>
              )}
            </Field>
            <Field>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register("description", {
                  setValueAs: (v) => (v === "" ? undefined : v),
                })}
              />
              {errors.description && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.description.message}
                </p>
              )}
            </Field>
            <Field>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                {...register("price", {
                  valueAsNumber: true,
                })}
                type="number"
              />
              {errors.price && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.price.message}
                </p>
              )}
            </Field>
            <Field>
              <Label htmlFor="companyName">Company Name</Label>
              <Input id="companyName" {...register("companyName")} />
              {errors.companyName && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.companyName.message}
                </p>
              )}
            </Field>
            <Field>
              <Label htmlFor="highlights">Product Highlights</Label>
              <Input
                id="highlights"
                {...register("highlights", {
                  setValueAs: (v) =>
                    v && typeof v === "string"
                      ? v.split(",").map((s: string) => s.trim())
                      : [],
                })}
              />
              {errors.highlights && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.highlights.message || errors.highlights[0]?.message}
                </p>
              )}
            </Field>
          </FieldGroup>

          <DialogFooter className="mt-2">
            <DialogClose asChild>
              <Button disabled={loading} type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Spinner /> Adding product...
                </div>
              ) : (
                <>Add Product</>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductForm;
