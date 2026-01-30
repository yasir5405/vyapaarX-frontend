import { Eye, EyeClosed, GalleryVerticalEnd } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { resetPassword, type ResetPasswordChangeParams } from "@/api/auth.api";
import { useState } from "react";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<ResetPasswordChangeParams>();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [urlParams] = useSearchParams();
  const token = urlParams.get("token");

  const navigate = useNavigate();

  const handleResetPassword: SubmitHandler<ResetPasswordChangeParams> = async (
    data: ResetPasswordChangeParams,
  ) => {
    if (!token) {
      toast.error("Missing or invalid token");
      return;
    }

    setLoading(true);

    try {
      const res = await resetPassword(data, token);
      if (!res.success) {
        const message = res.error?.message ?? res.message;
        if (message.toLocaleLowerCase().includes("email")) {
          setError("password", {
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
      navigate("/login", { replace: true });
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
              <span className="sr-only">VyapaarX</span>
            </Link>
            <h1 className="text-xl font-bold">Reset your password.</h1>
            <FieldDescription>
              Enter your email to reset your password
            </FieldDescription>
          </div>
          <Field>
            <Field>
              <div className="flex items-center">
                <FieldLabel htmlFor="password">Password</FieldLabel>
              </div>
              <InputGroup>
                <InputGroupInput
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                />
                <InputGroupAddon className="cursor-pointer" align="inline-end">
                  {showPassword ? (
                    <EyeClosed
                      onClick={() => setShowPassword((prev) => !prev)}
                    />
                  ) : (
                    <Eye onClick={() => setShowPassword((prev) => !prev)} />
                  )}
                </InputGroupAddon>
              </InputGroup>
              {errors.password && (
                <p className="text-xs text-red-500">
                  {errors.password?.message}
                </p>
              )}
            </Field>
          </Field>
          <Field>
            <Field>
              <div className="flex items-center">
                <FieldLabel htmlFor="password">Confirm Password</FieldLabel>
              </div>
              <InputGroup>
                <InputGroupInput
                  id="password"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Comfirm Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                />
                <InputGroupAddon className="cursor-pointer" align="inline-end">
                  {showConfirmPassword ? (
                    <EyeClosed
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                    />
                  ) : (
                    <Eye
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                    />
                  )}
                </InputGroupAddon>
              </InputGroup>
              {errors.password && (
                <p className="text-xs text-red-500">
                  {errors.password?.message}
                </p>
              )}
            </Field>
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
