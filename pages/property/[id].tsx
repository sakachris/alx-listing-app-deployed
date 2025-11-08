import { useRouter } from "next/router";
import { apiRequest } from "@/lib/api";
import { useEffect, useState } from "react";
import PropertyDetail from "@/components/property/PropertyDetail";
import BookingSection from "@/components/property/BookingSection";
import ReviewSection from "@/components/property/ReviewSection";

interface Property {
  property_id: string;
  name: string;
  address: {
    state: string;
    city: string;
    country: string;
  };
  rating: string;
  category: string[];
  pricepernight: string;
  offers: {
    bed: string;
    shower: string;
    occupants: string;
  };
  image: string;
  discount: string | null;
}

export default function PropertyDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchProperty = async () => {
      try {
        const data = await apiRequest(`/properties/${id}/`, "GET");
        setProperty(data);
      } catch (err: any) {
        console.error("Error fetching property:", err);
        setError(err.message || "Failed to load property details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) return <p className="text-center py-10">Loading property...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!property)
    return (
      <p className="text-center text-gray-500 py-10">Property not found</p>
    );

  return (
    <div className="container mx-auto px-4 lg:px-12 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT: Property Detail + Reviews */}
        <div className="lg:col-span-2 space-y-10">
          <PropertyDetail property={property} />
          <ReviewSection propertyId={property.property_id} />
        </div>

        {/* RIGHT: Booking Section */}
        <div className="lg:col-span-1">
          <BookingSection
            price={property.pricepernight}
            propertyId={property.property_id}
          />
        </div>
      </div>
    </div>
  );
}
