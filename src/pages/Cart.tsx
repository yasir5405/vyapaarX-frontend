import api from "@/api/api";
import { clearCart, getCart, type Cart } from "@/api/cart.api";
import { createOrder } from "@/api/order.api";
import CartItemCard from "@/components/Cards/CartItemCard";
import PlatformFeeInfo from "@/components/Cards/PlatformFeeInfo";
import ClearCartButton from "@/components/ClearCartButton";
import EmptyCart from "@/components/Empty/EmptyCart";
import ChooseAddressForm from "@/components/Forms/ChooseAddressForm";
import ChooseAddressFormMobile from "@/components/Forms/ChooseAddressFormMobile";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { useAddress } from "@/context/AddressContext";

import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { loadRazorpay } from "@/lib/loadRazorpay";
import { verifyPayment } from "@/services/payment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const UserCart = () => {
  const { user } = useAuth();
  const { selectedAddress, selectedAddressId } = useAddress();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);

  const { refreshCart, count } = useCart();

  const fetchCart = async () => {
    try {
      const res = await getCart();
      if (!res.success) {
        toast.error(res.error?.message ?? res.message);
        return;
      }
      setCart(res.data);
    } finally {
      setInitialLoading(false);
    }
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
      refreshCart();
    } catch {
      toast.error("Error clearing cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  console.log(cart?.cartItems);

  const totalPrice = cart?.cartItems.reduce((acc, curr) => {
    return acc + curr.price * curr.quantity;
  }, 0);

  const PLATFORM_FEE = 23;

  const totalAmount = totalPrice! + PLATFORM_FEE;

  const handleCreateOrder = async (addressId: number) => {
    if (!selectedAddressId) {
      toast.error("Please select an address before placing the order.");
      return;
    }
    try {
      setOrderLoading(true);

      const isLoaded = await loadRazorpay();
      if (!isLoaded) {
        toast.error("Razorpay SDK failed to load");
        return;
      }

      const res = await createOrder({ addressId });

      if (!res.success || !res.data) {
        toast.error(res.error?.message ?? res.message);
        return;
      }

      const { amount, currency, razorpayOrderId, orderId } = res.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount,
        currency,
        order_id: razorpayOrderId,
        name: "Memora",
        description: "Order Payment",
        handler: async (response: any) => {
          try {
            const verifyRes = await verifyPayment(response);
            if (!verifyRes.success) {
              toast.error(
                verifyRes.error?.message ??
                  verifyRes.message ??
                  "Payment verification failed",
              );
              setOrderLoading(false);
              return;
            }
            toast.success("Payment successful 🎉");
            fetchCart();
            refreshCart();
          } catch {
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email,
        },
        theme: {
          color: "#111827",
        },
        modal: {
          ondismiss: async () => {
            try {
              await api.patch(`/orders/${orderId}/cancel`);
              toast.info("Payment cancelled");
            } catch {
              toast.error("Payment failed");
            } finally {
              setOrderLoading(false);
            }
          },
        },
      };

      if (!razorpayOrderId || !amount) {
        toast.error("Failed to initiate payment. Please retry.");
        setOrderLoading(false);
        return;
      }

      const razorpay = new (window as any).Razorpay(options);
      razorpay.on("payment.failed", () => {
        toast.error("Payment failed or cancelled");
        setOrderLoading(false);
      });
      razorpay.open();
    } catch {
      toast.error("Error placing order. Please try again.");
      return;
    } finally {
      setOrderLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="border border-muted-foreground p-1 rounded-full shadow-md">
            <Spinner stroke="#ff7e5f" />
          </div>
        </div>
      )}
      <div className="relative w-full h-full flex flex-col lg:flex-row items-start justify-center gap-5 pb-30 md:pb-0">
        {/* Left Div */}
        <div className="w-full lg:w-[36%] py-5 flex flex-col gap-4">
          {/* User info and address*/}
          <div className="flex flex-col sm:flex-row items-start sm:items-center w-full justify-between py-4 px-3 border rounded-sm gap-3 bg-muted">
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
                  : "No address selected"}
              </p>
            </div>

            <ChooseAddressForm />
            <ChooseAddressFormMobile />
          </div>

          <div className="flex items-center justify-between">
            <h1 className="font-bold text-sm sm:text-base">
              {count} ITEMS in CART
            </h1>

            <ClearCartButton
              count={cart?.cartItems.length}
              handleClearCart={handleClearCart}
            />
          </div>

          {/* All products of cart */}
          <div className="w-full flex flex-col gap-3">
            {initialLoading && (
              <div className="flex items-center justify-center py-8">
                <Spinner />
                <p className="ml-2 text-sm text-muted-foreground">
                  Loading cart...
                </p>
              </div>
            )}

            {!initialLoading && (!cart || cart.cartItems.length === 0) && (
              <EmptyCart />
            )}

            {!initialLoading &&
              cart &&
              cart.cartItems.length > 0 &&
              cart.cartItems.map((item) => (
                <CartItemCard key={item.id} item={item} onSuccess={fetchCart} />
              ))}
          </div>
        </div>

        {/* Right Div */}
        <div className="w-full lg:w-[30%] border hidden md:flex flex-col pt-4 px-4 pb-10 gap-4">
          <h1 className="font-semibold text-xs uppercase text-neutral-500">
            Price Details{" "}
            <span className="capitalize">({cart?.cartItems.length} items)</span>
          </h1>

          <div className="flex flex-col gap-2 w-full">
            <div className="w-full flex items-center justify-between">
              <h1 className="text-sm capitalize">Total MRP</h1>
              <h1 className="text-sm">{`₹${totalPrice?.toLocaleString("en-IN")}`}</h1>
            </div>

            <div className="w-full flex items-center justify-between">
              <h1 className="text-sm capitalize flex gap-2 items-center">
                Platform fee <PlatformFeeInfo />
              </h1>
              <h1 className="text-sm">{`₹${PLATFORM_FEE?.toLocaleString("en-IN")}`}</h1>
            </div>

            <Separator />
            <div className="w-full flex items-center justify-between">
              <h1 className="text-sm font-semibold capitalize">Total amount</h1>
              <h1 className="text-sm font-semibold">{`₹${totalAmount?.toLocaleString("en-IN")}`}</h1>
            </div>

            <div className="w-full flex items-center gap-1">
              <p className="text-xs">
                By placing the order, you agree to Memora's{" "}
                <Link className="text-xs font-semibold text-primary" to={"#"}>
                  Terms of use
                </Link>{" "}
                and{" "}
                <Link className="text-xs font-semibold text-primary" to={"#"}>
                  Privacy Policy
                </Link>
              </p>
            </div>

            {/* Place Order button */}
            <Button
              className="uppercase font-semibold"
              onClick={() => handleCreateOrder(Number(selectedAddressId))}
              disabled={cart?.cartItems.length === 0 || orderLoading}
            >
              {orderLoading ? (
                <div className="flex items-center gap-2">
                  <Spinner />
                  Placing order...
                </div>
              ) : (
                <>Place Order</>
              )}
            </Button>
          </div>
        </div>

        <div className="flex flex-col border-2 shadow-lg bg-background md:hidden lg:hidden fixed left-0 bottom-0 pt-1.5 pb-3 w-full gap-2">
          <h1 className="text-xs font-semibold text-center">
            {count} items added for order
          </h1>

          {/* Place Order button */}
          <div className="w-full p-2">
            <Button
              className="uppercase font-semibold w-full"
              onClick={() => handleCreateOrder(Number(selectedAddressId))}
              disabled={cart?.cartItems.length === 0 || orderLoading}
              size={"lg"}
            >
              {orderLoading ? (
                <div className="flex items-center gap-2">
                  <Spinner />
                  Placing order...
                </div>
              ) : (
                <>Place Order</>
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCart;
