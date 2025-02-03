import { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import dayjs from "dayjs"; // ✅ For formatting booking dates

export default function Reviews({ hotel }: { hotel: any }) {
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [reviews, setReviews] = useState(hotel.comments);

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      const newReview = {
        user: "Visitante",
        rating: newRating,
        comment: newComment,
        bookedDate: dayjs().subtract(Math.floor(Math.random() * 30), "day").format("MMMM D, YYYY"), // ✅ Random past booking date
      };

      setReviews([...reviews, newReview]);
      setNewComment("");
      setNewRating(5);
    }
  };
  return (
    <div className="mt-10 border-t pt-6">
      <h3 className="text-xl font-bold">Opinião dos utilizadores:</h3>

      {/* List of Reviews */}
      <div className="space-y-4 mt-4">
        {reviews.map((comment: any, index: number) => (
          <div key={index} className="border p-3 rounded-lg shadow flex items-center">
            {/* Avatar */}
            <Image
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(comment.user)}&background=random`}
              alt={comment.user}
              width={40}
              height={40}
              className="rounded-full mr-3"
            />
            <div>
              <p className="font-semibold">{comment.user}</p>
              <p className="text-xs text-gray-500">Reservado {comment.bookedDate}</p> {/* ✅ Show booking date */}
              <div className="flex items-center mt-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={16} className={i < comment.rating ? "text-yellow-500" : "text-gray-300"} />
                ))}
              </div>
              <p className="text-gray-600">{comment.comment}</p>
            </div>
          </div>
        ))}
      </div>


     {/*  <div className="mt-5 border p-4 rounded-lg">
        <h3 className="text-lg font-semibold">Leave a Review</h3>
        <textarea
          className="w-full border p-2 mt-2 rounded-lg"
          placeholder="Write your comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleAddComment} className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg">
          Submit Review
        </button>
      </div>  */}
    </div>
  );
}