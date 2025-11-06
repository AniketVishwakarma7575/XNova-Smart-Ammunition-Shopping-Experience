import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UseMycurr from "./UseMycurr";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState({
    name: "",
    email: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
  });

  const navigate = useNavigate();

  // ✅ Fetch Cart
  const fetchCart = async () => {
    try {
      const res = await API.get("/cart");
      setCartItems(res.data);
      const totalAmount = res.data.reduce(
        (sum, i) => sum + i.product.price * i.qty,
        0
      );
      setTotal(totalAmount);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ✅ Razorpay Payment
  const handlePayment = async () => {
    if (
      !address.name ||
      !address.email ||
      !address.phone ||
      !address.addressLine ||
      !address.city ||
      !address.state ||
      !address.pincode
    ) {
      toast.warning("Please fill all address details", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }

    try {
      const { data } = await API.post("/create-order", { amount: total, address });

      const options = {
        key: "rzp_test_YourTestKeyHere",
        amount: data.amount,
        currency: "INR",
        name: "My Shop",
        description: "Cart Payment",
        order_id: data.id,
        handler: function (response) {
          toast.success(`Payment Successful! ID: ${response.razorpay_payment_id}`, {
            position: "top-right",
            autoClose: 2000,
          });
          navigate("/");
        },
        prefill: {
          name: address.name,
          email: address.email,
          contact: address.phone,
        },
        theme: { color: "#4285F4" }, // ✅ Google Blue
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      toast.error("Payment failed. Try again!", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-10">
      <ToastContainer />
      <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-gray-800">
        Checkout 🛍️
      </h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          Your cart is empty.
        </p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 🛒 Left: Cart Items */}
          <div className="space-y-5">
            {cartItems.map((i) => (
              <div
                key={i._id}
                className="flex flex-col sm:flex-row sm:items-center gap-4 border p-4 rounded-2xl bg-white shadow-md hover:shadow-lg transition-all duration-300"
              >
                <img
                  src={i.product.images?.[0] || "/placeholder.png"}
                  alt={i.product.name}
                  className="w-full sm:w-28 h-28 object-cover rounded-lg border"
                />

                <div className="flex flex-col flex-grow">
                  <h4 className="font-semibold text-lg text-gray-800">
                    {i.product.name}
                  </h4>
                  <p className="text-gray-500 text-sm mt-1">
                    Qty: <span className="font-medium">{i.qty}</span>
                  </p>
                  <p className="text-gray-500 text-sm">
                    Price: ₹{i.product.price.toFixed(2)}
                  </p>
                  <p className="text-gray-700 font-semibold mt-2">
                    Subtotal: ₹{(i.product.price * i.qty).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}

            <div className="flex justify-between text-lg font-semibold border-t pt-3 text-gray-800">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>

          {/* 📦 Right: Address Form Component */}
          <div className="border p-5 rounded-2xl shadow-md bg-white">
            <UseMycurr
              address={address}
              setAddress={setAddress}
              handlePayment={handlePayment}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
