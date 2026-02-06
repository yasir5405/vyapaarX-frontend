import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const PlatformFeeInfo = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="text-primary font-semibold cursor-pointer">Know more</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Platform Fee</DialogTitle>
          <DialogDescription>
            <h1>
              {" "}
              Fee levied by VyapaarX to sustain the efficient operations and
              continous improvement of the platform, for a hassle-free app
              experience{" "}
            </h1>
            <h1 className="mt-4 flex gap-1">
              Have a question? Refer{" "}
              <Link to={"#"} className="text-primary font-semibold">
                FAQ/s
              </Link>
              or read
              <Link to={"#"} className="text-primary font-semibold">
                TCQs
              </Link>
            </h1>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default PlatformFeeInfo;
