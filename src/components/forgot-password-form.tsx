import { GalleryVerticalEnd } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { forgotPassword, type ResetPasswordParams } from "@/api/auth.api";
import { useState } from "react";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<ResetPasswordParams>();
  const [loading, setLoading] = useState(false);

  const handleResetPassword: SubmitHandler<ResetPasswordParams> = async (
    data: ResetPasswordParams,
  ) => {
    setLoading(true);
    try {
      const res = await forgotPassword(data);
      if (!res.success) {
        const message = res.error?.message ?? res.message;
        if (message.toLocaleLowerCase().includes("email")) {
          setError("email", {
            type: "server",
            message,
          });
        } else {
          setError("root", {
            type: "server",
            message,
          });
        }

        return;
      }

      toast.success(res.message);
      reset();
    } catch {
      setError("root", {
        type: "server",
        message: "Network error. Please try again.",
      });
      toast.error("Network error or server unreachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(handleResetPassword)}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <Link
              to="/"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">Memora</span>
            </Link>
            <h1 className="text-xl font-bold">Reset your password.</h1>
            <FieldDescription>
              Enter your email to reset your password
            </FieldDescription>
          </div>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email?.message}</p>
            )}
          </Field>

          {errors.root?.message && (
            <p className="text-xs text-red-500 text-center">
              {errors.root.message}
            </p>
          )}

          <Field>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <span className="flex gap-2">
                  <Spinner /> Sending password reset link.....
                </span>
              ) : (
                <p>Send password reset link</p>
              )}
            </Button>
          </Field>
        </FieldGroup>
      </form>
      <FieldDescription className="px-6 text-center">
        By continuing, you agree to our <Link to="#">Terms of Service</Link> and{" "}
        <Link to="#">Privacy Policy</Link>.
      </FieldDescription>
    </div>
  );
}
