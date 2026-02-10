import { Spinner } from "./ui/spinner";

const GlobalLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
      <div className="border border-muted-foreground p-1 rounded-full shadow-md">
        <Spinner stroke="#ff7e5f" />
      </div>
    </div>
  );
};

export default GlobalLoader;
