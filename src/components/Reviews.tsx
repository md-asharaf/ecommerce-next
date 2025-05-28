import { getUsersFromClerk } from '@/actions/getUsersFromClerk'
import { Review } from '../../sanity.types'

const Reviews = async ({ reviews }: { reviews: Review[] }) => {
    const userIds = reviews.map((review)=>review.clerkUserId!)
    const users = await getUsersFromClerk(userIds)
    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
            <div className="mt-4 space-y-4">
                {reviews
                    .slice(0, 3)
                    .map((review, index) => (
                        <div key={index} className="border-b py-4">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-900">
                                    {review.clerkUserId || "Anonymous"}
                                </span>
                                {/* <span className="text-sm text-gray-600">
                                    {review.rating?.toFixed(1)} ★
                                </span> */}
                            </div>
                            <p className="mt-1 text-gray-700">{review.description}</p>
                        </div>
                    ))}
            </div>
            {/* {filteredReviews.length > 3 && (
                <a
                    href="#all-reviews"
                    className="mt-4 inline-block text-blue-600 hover:underline"
                >
                    See all {filteredReviews.length} reviews
                </a>
            )} */}
        </div>
    )
}

export default Reviews