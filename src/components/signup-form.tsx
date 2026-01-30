import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { register, type RegisterPayload } from "@/api/auth.api";
import { toast } from "sonner";
import { useState } from "react";
import { Spinner } from "./ui/spinner";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Eye, EyeClosed } from "lucide-react";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register: registerFn,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterPayload>();

  const handleSignup: SubmitHandler<RegisterPayload> = async (
    data: RegisterPayload,
  ) => {
    setLoading(true);
    try {
      const res = await register(data);

      if (!res.success) {
        const message = res.error?.message ?? res.message;
        if (message.toLocaleLowerCase().includes("email")) {
          setError("email", {
            type: "server",
            message,
          });
        } else if (message.toLocaleLowerCase().includes("password")) {
          setError("password", {
            type: "server",
            message,
          });
        } else if (message.toLocaleLowerCase().includes("name")) {
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
        console.log(message);
        return;
      }

      toast.success(res.message);
      navigate("/login");
      console.log(res.message);
    } catch (error) {
      setError("root", {
        type: "server",
        message: "Network error. Please try again.",
      });
      toast.error("Network error or server unreachable");
      console.error("Unexpected error", error);
      console.log("Network error or server unreachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(handleSignup)(e);
            }}
          >
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  {...registerFn("name", { required: true })}
                />
                {errors.name && (
                  <p className="text-xs text-red-500">{errors.name?.message}</p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...registerFn("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-xs text-red-500">
                    {errors.email?.message}
                  </p>
                )}
              </Field>
              <Field>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id="password"
                      type={showPassword ? "text" : "password"}
                      {...registerFn("password", {
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters",
                        },
                      })}
                    />
                    <InputGroupAddon
                      className="cursor-pointer"
                      align="inline-end"
                    >
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
              {errors.root?.message && (
                <p className="text-xs text-red-500 text-center">
                  {errors.root.message}
                </p>
              )}
              <Field>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <span className="flex gap-2">
                      <Spinner /> Signing up...
                    </span>
                  ) : (
                    <p>Sign up</p>
                  )}
                </Button>
                <FieldDescription className="text-center">
                  Already have an account? <Link to="/login">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our{" "}
        <Link to="/terms">Terms of Service</Link> and{" "}
        <Link to="/privacy">Privacy Policy</Link>.
      </FieldDescription>
    </div>
  );
}
