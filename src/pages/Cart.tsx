import { getCart, type Cart } from "@/api/cart.api";
import CartItemCard from "@/components/Cards/CartItemCard";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const UserCart = () => {
  const { user } = useAuth();
  const [cart, setCart] = useState<Cart | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    (async () => {
      const res = await getCart();
      if (!res.success) {
        toast.error(res.error?.message ?? res.message);
        return;
      }
      setCart(res.data);
      console.log(res.data?.cartItems);
    })();
  }, [refreshKey]);

  return (
    <div className="w-full h-full flex items-center justify-center gap-3">
      {/* Left Div */}
      <div className="w-[36%] py-5 flex flex-col gap-4">
        {/* User info and address*/}
        <div className="flex items-center w-full justify-between py-4 px-3 border rounded-sm">
          <div className="flex w-full flex-col">
            <p className="text-[13px] gap-1 flex text-muted-foreground w-full">
              Deliver to:{" "}
              <span className="font-semibold text-black flex items-center justify-center gap-2">
                {user?.name} ,{" "}
                {user?.addresses && user.addresses.length > 0 && (
                  <>{user.addresses[0].postalCode}</>
                )}
              </span>{" "}
            </p>

            <p className="text-[13px] flex text-muted-foreground w-full">
              {user?.addresses && user.addresses.length > 0
                ? `${user.addresses[0].addressLine}, ${user.addresses[0].city}, ${user.addresses[0].state}`
                : "No address found"}
            </p>
          </div>

          <Button
            variant={"outline"}
            className="hover:bg-transparent text-primary hover:text-primary border-2"
          >
            CHANGE ADDRESS
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <h1 className="font-bold text-base">
            {cart?.cartItems.length} ITEMS in CART
          </h1>

          <Button variant={"secondary"} className="font-semibold">
            Clear Cart 🛒
          </Button>
        </div>

        {/* All products of cart */}
        <div className="w-full flex flex-col gap-3">
          {!cart && (
            <p className="text-center text-sm text-muted-foreground">
              Loading cart...
            </p>
          )}

          {cart && cart.cartItems.length === 0 && (
            <p className="text-center text-sm text-muted-foreground">
              Your cart is empty 🛒
            </p>
          )}

          {cart &&
            cart.cartItems.length > 0 &&
            cart.cartItems.map((item) => (
              <CartItemCard
                key={item.id}
                item={item}
                onSuccess={() => setRefreshKey((k) => k + 1)}
              />
            ))}
        </div>
      </div>

      {/* Right Div */}
      <div className="w-[30%] border-2 border-sky-600"></div>
    </div>
  );
};

export default UserCart;
