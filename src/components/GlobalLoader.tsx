import { Spinner } from "./ui/spinner";

const GlobalLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/10 backdrop-blur-sm">
      <div className="border border-muted-foreground p-1 rounded-full shadow-md">
        <Spinner stroke="#ff7e5f" />
      </div>
      <h1 className="text-xs md:text-sm text-primary">
        Loading...Please wait...
      </h1>
    </div>
  );
};

export default GlobalLoader;
