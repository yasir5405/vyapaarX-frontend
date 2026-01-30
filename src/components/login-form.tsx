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
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm, type SubmitHandler } from "react-hook-form";
import { login, type LoginPayload } from "@/api/auth.api";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Eye, EyeClosed } from "lucide-react";
import { Spinner } from "./ui/spinner";
import { useAuth } from "@/context/AuthContext";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginPayload>();

  const { refreshUser } = useAuth();

  const handleLogin: SubmitHandler<LoginPayload> = async (
    data: LoginPayload,
  ) => {
    setLoading(true);
    try {
      const res = await login(data);

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

      localStorage.setItem("access-token", String(res.data?.accessToken));
      await refreshUser();
      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      setError("root", {
        type: "server",
        message: "Network error. Please try again.",
      });
      toast.error("Network error or server unreachable");
      console.log("Unexpected error", error);
      console.log("Network error or server unreachable");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Apple or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(handleLogin)(e);
            }}
          >
            <FieldGroup>
              <Field>
                <Button variant="outline" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                      fill="currentColor"
                    />
                  </svg>
                  Login with Apple
                </Button>
                <Button variant="outline" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Login with Google
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-xs text-red-500">
                    {errors.email?.message}
                  </p>
                )}
              </Field>
              <Field>
                <Field>
                  <div className="flex items-center">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Link
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                      to={"/forgot-password"}
                    >
                      Forgot your password?
                    </Link>
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
                <Button type="submit">
                  {loading ? (
                    <span className="flex gap-2">
                      <Spinner /> Logging in...
                    </span>
                  ) : (
                    <p>Log in</p>
                  )}
                </Button>
                <FieldDescription className="text-center">
                  Don't have an account? <Link to="/signup">Sign up</Link>
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
