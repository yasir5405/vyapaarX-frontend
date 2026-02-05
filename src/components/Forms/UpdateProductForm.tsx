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
import {
  updateProduct,
  type Products,
  type UpdateProductParams,
} from "@/api/product.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProductValidationSchema } from "@/lib/schema";
import { Field, FieldGroup } from "../ui/field";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";

const UpdateProductForm = ({
  onSuccess,
  product,
}: {
  onSuccess: () => void;
  product: Products;
}) => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    setError,
    reset,
  } = useForm<Omit<UpdateProductParams, "productId">>({
    resolver: zodResolver(updateProductValidationSchema),
    defaultValues: {
      name: product.name,
      companyName: product.companyName,
      description: product.description || "",
      price: product.price,
      highlights: product.highlights.join(", ") as unknown as (
        | string
        | undefined
      )[],
    },
  });

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      reset({
        name: product.name,
        description: product.description || "",
        price: product.price,
        companyName: product.companyName,
        highlights: product.highlights.join(", ") as unknown as (
          | string
          | undefined
        )[],
      });
    }
  }, [open, product, reset]);

  const handleUpdateProduct = async (
    data: Omit<UpdateProductParams, "productId">,
  ) => {
    try {
      setLoading(true);
      const res = await updateProduct({
        ...data,
        productId: product.id,
      });
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
      toast.success("Product was updated successfully");
      onSuccess();
      setOpen(false);
    } catch {
      toast.error("Error adding product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} type="button" className="self-end">
          Update Product
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg max-h-[95dvh] overflow-y-auto">
        <form
          className="flex flex-col"
          onSubmit={handleSubmit(handleUpdateProduct)}
        >
          <DialogHeader>
            <DialogTitle>Update product</DialogTitle>
            <DialogDescription>
              Make changes to your product. Only fill in the fields you want to
              update.
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
              <Label htmlFor="highlights">
                Product Highlights (comma-separated)
              </Label>
              <Input
                id="highlights"
                {...register("highlights", {
                  setValueAs: (v) =>
                    v && typeof v === "string" && v.trim() !== ""
                      ? v
                          .split(",")
                          .map((s: string) => s.trim())
                          .filter((s) => s.length > 0)
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
            <Button type="submit" disabled={loading || !isDirty}>
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Spinner /> Updating...
                </div>
              ) : (
                <>Update Product</>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProductForm;
