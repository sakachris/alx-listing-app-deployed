import React from "react";
import { CardProps } from "../../interfaces";

const Card: React.FC<CardProps> = ({ image, title, description, price }) => {
  return (
    <div className="rounded-2xl shadow-md overflow-hidden bg-white hover:shadow-lg transition">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
        <p className="text-base font-bold mt-2">{price}</p>
      </div>
    </div>
  );
};

export default Card;
