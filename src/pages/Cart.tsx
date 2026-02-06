import { clearCart, getCart, type Cart } from "@/api/cart.api";
import CartItemCard from "@/components/Cards/CartItemCard";
import ClearCartButton from "@/components/ClearCartButton";
import EmptyCart from "@/components/Empty/EmptyCart";
import ChooseAddressForm from "@/components/Forms/ChooseAddressForm";
import { Spinner } from "@/components/ui/spinner";
import { useAddress } from "@/context/AddressContext";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const UserCart = () => {
  const { user } = useAuth();
  const { selectedAddress } = useAddress();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    const res = await getCart();
    if (!res.success) {
      toast.error(res.error?.message ?? res.message);
      return;
    }
    setCart(res.data);
  };

  const handleClearCart = async () => {
    try {
      setLoading(true);
      const res = await clearCart();
      if (!res.success) {
        toast.error(res.error?.message ?? res.message);
        return;
      }
      toast.success(res.message);
      fetchCart();
    } catch {
      toast.error("Error clearing cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="border border-muted-foreground p-1 rounded-full shadow-md">
            <Spinner stroke="#ff7e5f" />
          </div>
        </div>
      )}
      <div className="w-full h-full flex flex-col lg:flex-row items-start justify-center gap-3 px-4 lg:px-0">
        {/* Left Div */}
        <div className="w-full lg:w-[36%] py-5 flex flex-col gap-4">
          {/* User info and address*/}
          <div className="flex flex-col sm:flex-row items-start sm:items-center w-full justify-between py-4 px-3 border rounded-sm gap-3">
            <div className="flex w-full flex-col">
              <p className="text-[13px] gap-1 flex flex-wrap text-muted-foreground w-full">
                Deliver to:{" "}
                <span className="font-semibold text-black flex items-center justify-center gap-2">
                  {user?.name} ,{" "}
                  {selectedAddress && <>{selectedAddress.postalCode}</>}
                </span>{" "}
              </p>

              <p className="text-[13px] flex text-muted-foreground w-full">
                {selectedAddress
                  ? `${selectedAddress.addressLine}, ${selectedAddress.city}, ${selectedAddress.state}`
                  : "No address found"}
              </p>
            </div>

            <ChooseAddressForm />
          </div>

          <div className="flex items-center justify-between">
            <h1 className="font-bold text-sm sm:text-base">
              {cart?.cartItems.length} ITEMS in CART
            </h1>

            <ClearCartButton
              count={cart?.cartItems.length}
              handleClearCart={handleClearCart}
            />
          </div>

          {/* All products of cart */}
          <div className="w-full flex flex-col gap-3">
            {!cart && (
              <p className="text-center text-sm text-muted-foreground">
                Loading cart...
              </p>
            )}

            {cart && cart.cartItems.length === 0 && <EmptyCart />}

            {cart &&
              cart.cartItems.length > 0 &&
              cart.cartItems.map((item) => (
                <CartItemCard key={item.id} item={item} onSuccess={fetchCart} />
              ))}
          </div>
        </div>

        {/* Right Div */}
        <div className="w-full lg:w-[30%] border-2 border-sky-600 hidden lg:block"></div>
      </div>
    </>
  );
};

export default UserCart;
