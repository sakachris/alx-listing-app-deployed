import { useState } from "react";
import Image from "next/image";

interface PropertyProps {
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

const tabs = ["Description", "What we offer", "About host"];

const PropertyDetail: React.FC<{ property: PropertyProps }> = ({
  property,
}) => {
  const [activeTab, setActiveTab] = useState("Description");

  return (
    <div className="w-full">
      {/* Title + Location + Rating */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold">{property.name}</h1>
        <div className="flex items-center flex-wrap gap-3 mt-2 text-gray-600">
          <span className="flex items-center text-yellow-500 font-medium">
            ⭐ {property.rating}
          </span>
          <span>
            {property.address.city}, {property.address.state},{" "}
            {property.address.country}
          </span>
          <span className="text-gray-500">
            • {property.offers.occupants} guests
          </span>
        </div>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-4 gap-2 mt-6">
        {/* Main large image */}
        <div className="col-span-2 row-span-2 relative w-full">
          <Image
            src={property.image}
            alt={property.name}
            fill
            className="rounded-lg object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Four smaller images */}
        {Array(4)
          .fill(property.image)
          .map((imgSrc, idx) => (
            <div key={idx} className="relative w-full h-[200px]">
              <Image
                src={imgSrc}
                alt={`extra ${idx + 1}`}
                fill
                className="rounded-lg object-cover"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
            </div>
          ))}
      </div>

      {/* Image Grid old */}

      {/* <div className="grid grid-cols-4 gap-2 mt-6">
        <img
          src={property.image}
          alt={property.name}
          className="col-span-2 row-span-2 w-full h-[420px] object-cover rounded-lg"
        />
        <img
          src={property.image}
          alt="extra"
          className="w-full h-[200px] object-cover rounded-lg"
        />
        <img
          src={property.image}
          alt="extra"
          className="w-full h-[200px] object-cover rounded-lg"
        />
        <img
          src={property.image}
          alt="extra"
          className="w-full h-[200px] object-cover rounded-lg"
        />
        <img
          src={property.image}
          alt="extra"
          className="w-full h-[200px] object-cover rounded-lg"
        />
      </div> */}

      {/* Tabs */}
      <div className="mt-8">
        <div className="flex space-x-6 border-b pb-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`pb-2 ${
                activeTab === tab
                  ? "border-b-2 border-green-600 text-green-600 font-medium"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-4">
          {activeTab === "Description" && (
            <div className="text-gray-700 leading-relaxed">
              <p>
                Welcome to {property.name}! A cozy stay located in{" "}
                {property.address.city}, perfect for {property.offers.occupants}{" "}
                guests. It includes {property.offers.bed} bed(s) and{" "}
                {property.offers.shower} bathroom(s). Relax and enjoy your stay
                with the comfort of our modern amenities.
              </p>
            </div>
          )}

          {activeTab === "What we offer" && (
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {property.category.map((amenity, index) => (
                <li
                  key={index}
                  className="flex items-center space-x-2 text-gray-700"
                >
                  <span>✔</span>
                  <span>{amenity}</span>
                </li>
              ))}
            </ul>
          )}

          {activeTab === "About host" && (
            <p className="text-gray-600">
              Your host will provide all details you need for a smooth and
              enjoyable stay.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
