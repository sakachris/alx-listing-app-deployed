"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import Pill from "@/components/common/Pill";
import { HERO_BG, FILTERS } from "@/constants";

interface PropertyAddress {
  state: string;
  city: string;
  country: string;
}

interface PropertyOffers {
  bed: string;
  shower: string;
  occupants: string;
}

export interface Property {
  property_id: string;
  name: string;
  address: PropertyAddress;
  rating: string; // consider number if backend changes it
  category: string[];
  pricepernight: string; // or number if numeric
  offers: PropertyOffers;
  image: string;
  discount: string | null;
}

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<string>("");
  // const [properties, setProperties] = useState<any[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await apiRequest("/properties/", "GET");
        setProperties(data);
      } catch (err) {
        if (err instanceof Error) {
          console.error("Error fetching properties:", err);
          setError(
            err.message || "Failed to load properties. Please try again later."
          );
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Apply category filter
  const filteredProps = activeFilter
    ? properties.filter((p) =>
        p.category?.some(
          (c: string) => c.toLowerCase() === activeFilter.toLowerCase()
        )
      )
    : properties;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Loading properties...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[60vh] flex flex-col justify-center items-center text-white text-center">
        <Image
          src={HERO_BG}
          alt="Hero background"
          fill
          className="object-cover -z-10"
          priority
        />
        <h1 className="text-4xl md:text-6xl font-bold">
          Find your favorite place here!
        </h1>
        <p className="mt-4 text-lg md:text-2xl">
          The best prices for over 2 million properties worldwide.
        </p>
      </section>

      {/* Filters */}
      <section className="flex flex-wrap gap-3 justify-center my-8">
        {FILTERS.map((f) => (
          <Pill
            key={f}
            label={f}
            onClick={() => setActiveFilter((prev) => (prev === f ? "" : f))}
            className={
              activeFilter === f
                ? "bg-pink-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }
          />
        ))}
      </section>

      {/* Property Listings */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 pb-12">
        {filteredProps.length === 0 && (
          // <p className="col-span-full text-center text-gray-500">
          //   No properties match "{activeFilter}"
          // </p>
          <p className="col-span-full text-center text-gray-500">
            {`No properties match "${activeFilter}"`}
          </p>
        )}
        {filteredProps.map((prop) => (
          <Link
            key={prop.property_id}
            href={`/property/${prop.property_id}`}
            className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition block"
          >
            <Image
              src={prop.image || "/assets/placeholder.jpg"}
              alt={prop.name}
              width={400}
              height={224}
              className="h-56 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{prop.name}</h3>
              <p className="text-sm text-gray-500">
                {prop.address?.city}, {prop.address?.country}
              </p>
              <p className="mt-2 text-pink-600 font-bold">
                ${prop.pricepernight} / night
              </p>
              <p className="text-yellow-500 text-sm">⭐ {prop.rating}</p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
