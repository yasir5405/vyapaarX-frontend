import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { EDIT_PROFILE_ROUTE } from "@/constants/route";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col gap-7 py-1 md:py-6 px-2 md:px-40 border-none md:border">
      <h1 className="font-semibold text-sm md:text-base">Profile Details</h1>

      <Separator />

      <div className="md:w-[60%] w-full flex flex-col gap-5 text-sm md:text-base">
        <div className="w-full flex items-center justify-between">
          <h1>Full Name</h1>

          <h1>{user?.name}</h1>
        </div>

        <div className="w-full flex items-center justify-between">
          <h1>Email</h1>

          <h1>{user?.email}</h1>
        </div>

        <div className="w-full flex items-center justify-between">
          <h1>Role</h1>

          <h1>{user?.role}</h1>
        </div>

        <Button
          className="mt-5 font-semibold uppercase"
          size={"lg"}
          onClick={() => navigate(EDIT_PROFILE_ROUTE)}
        >
          Edit
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;
