import { useAuth } from "@/context/AuthContext";
import { apiRequest } from "@/lib/api";
import React, { useState } from "react";

interface BookingSectionProps {
  price: number;
  propertyId: string;
}

const BookingSection: React.FC<BookingSectionProps> = ({
  price,
  propertyId,
}) => {
  const { token } = useAuth(); // ✅ get token from context
  const [checkIn, setCheckIn] = useState<string>("");
  const [checkOut, setCheckOut] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");

  const getNights = () => {
    if (!checkIn || !checkOut) return 0;
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const diffTime = outDate.getTime() - inDate.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays > 0 ? diffDays : 0;
  };

  const nights = getNights();
  const total = nights * price;

  const handleReserve = async () => {
    if (!checkIn || !checkOut) return;
    setLoading(true);
    setMessage("");

    try {
      const data = await apiRequest(
        "/bookings/",
        "POST",
        {
          property: propertyId,
          start_date: checkIn,
          end_date: checkOut,
        },
        token ?? undefined
      );

      setMessage(`Booking successful! Total: $${data.total_price}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage(err.message);
      } else {
        setMessage("Booking failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:col-span-1 border rounded-xl shadow-md bg-white p-6 w-full max-w-sm sticky top-30">
      <h3 className="text-2xl font-bold">
        ${price} <span className="text-base font-normal">/ night</span>
      </h3>
      {/* Check-in */}
      <div className="mt-4">
        <label className="block text-sm font-medium">Check-in</label>
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className="border rounded-md p-2 w-full mt-1"
        />
      </div>
      {/* Check-out */}
      <div className="mt-4">
        <label className="block text-sm font-medium">Check-out</label>
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className="border rounded-md p-2 w-full mt-1"
        />
      </div>
      {/* Total */}
      <div className="mt-4 text-lg">
        <p>
          Total payment: <strong>{nights > 0 ? `$${total}` : "—"}</strong>
        </p>
        {nights > 0 && (
          <p className="text-sm text-gray-500">{nights} night(s)</p>
        )}
      </div>

      <button
        onClick={handleReserve}
        disabled={nights <= 0 || loading}
        className={`mt-4 w-full py-2 px-4 rounded-md font-semibold ${
          nights > 0
            ? "bg-pink-600 text-white hover:bg-pink-700"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        {loading ? "Processing..." : "Reserve now"}
      </button>
      {message && (
        <p className="mt-3 text-center text-sm text-gray-600">{message}</p>
      )}
    </div>
  );
};

export default BookingSection;
