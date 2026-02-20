import { updateUser, type UpdateUserPayload } from "@/api/auth.api";
import { useForm } from "react-hook-form";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { useAuth } from "@/context/AuthContext";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";

const EditProfileForm = () => {
  const { user, refreshUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
    setError,
  } = useForm<UpdateUserPayload>({
    defaultValues: {
      email: user?.email,
      name: user?.name,
    },
  });

  const [loading, setLoading] = useState(false);

  const handleUserUpdate = async (payload: UpdateUserPayload) => {
    setLoading(true);
    try {
      const res = await updateUser(payload);

      if (!res.success) {
        const message = res.error?.message ?? res.message;

        if (message.toLowerCase().includes("email")) {
          setError("email", {
            type: "server",
            message,
          });
        } else if (message.toLowerCase().includes("name")) {
          setError("name", {
            type: "server",
            message,
          });
        } else {
          setError("root", {
            type: "server",
            message,
          });
        }
        setLoading(false);
        return;
      }

      toast.success(res.message);
      await refreshUser();
    } catch {
      toast.error("Error updating profile. Please try again");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-2xl flex flex-col gap-7 py-1 md:py-7 px-2 md:px-20 border-none md:border">
      <h1 className="font-semibold ">Edit Details</h1>

      <form
        className="w-full flex flex-col gap-4"
        onSubmit={handleSubmit(handleUserUpdate)}
      >
        <Field>
          <FieldLabel className="text-sm" htmlFor="email">
            Email
          </FieldLabel>
          <Input
            type="email"
            id="email"
            className="text-sm"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
          )}
        </Field>
        <Field>
          <FieldLabel className="text-sm" htmlFor="name">
            Name
          </FieldLabel>
          <Input
            type="text"
            id="name"
            className="text-sm"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>
          )}
        </Field>

        {errors.root && (
          <p className="text-xs text-red-600 mt-1">{errors.root.message}</p>
        )}

        <Button
          className="mt-4 hidden md:flex font-semibold uppercase select-none"
          size={"lg"}
          type="submit"
          disabled={!isDirty || loading}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <Spinner /> Saving Details...
            </div>
          ) : (
            <>Save Details</>
          )}
        </Button>

        <div className="fixed md:hidden flex bottom-0 left-0 w-full px-5 py-5 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05),0_-2px_4px_-1px_rgba(0,0,0,0.03)]   border-t">
          <Button
            className="font-semibold uppercase w-full text-xs"
            size={"lg"}
            type="submit"
            disabled={!isDirty || loading}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <Spinner /> Saving Details...
              </div>
            ) : (
              <>Save Details</>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;
