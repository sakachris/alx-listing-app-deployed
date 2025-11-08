"use client";
import React, { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";

interface Review {
  review_id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

const ReviewSection: React.FC<{ propertyId: string }> = ({ propertyId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await apiRequest(`/properties/${propertyId}/reviews/`);
        setReviews(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [propertyId]);

  if (loading) {
    return <p className="text-gray-500">Loading reviews...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="mt-12">
      {/* Header */}
      <div className="flex items-center space-x-2 mb-6">
        <h3 className="text-2xl font-semibold">Reviews</h3>
        <span className="text-gray-500 text-sm">
          ({reviews.length} reviews)
        </span>
      </div>

      {/* Reviews */}
      <div className="grid md:grid-cols-2 gap-8">
        {reviews.map((review) => (
          <div key={review.review_id} className="border-b pb-6">
            <div className="flex items-center mb-3">
              <img
                src={
                  review.avatar?.startsWith("/static")
                    ? `${process.env.NEXT_PUBLIC_API_URL?.replace(
                        /\/api\/?$/,
                        ""
                      )}${review.avatar}`
                    : review.avatar
                }
                alt={review.name}
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <p className="font-bold">{review.name}</p>
                <p className="text-sm text-gray-500">{review.date}</p>

                <div className="flex text-yellow-500 text-sm mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
