import { getUsersFromClerk } from '@/actions/getUsersFromClerk'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PopulatedRating } from '@/sanity/lib/rating/getRatingsBySlug'
import StarRating from './StarRating'

const Reviews = async ({ ratings }: { ratings: PopulatedRating[] }) => {
    const userIds = ratings.map((rating) => rating.clerkUserId!)
    const { data: users } = await getUsersFromClerk(userIds)
    const ratingsWithUsers = ratings.map((rating) => {
        const user = users?.find((user) => user.id === rating.clerkUserId)
        const { clerkUserId, ...rest } = rating
        return {
            ...rest,
            user: {
                name: ((user?.firstName ?? '') + ' ' + (user?.lastName ?? '')) || "Anonymous",
                imageUrl: user?.imageUrl || "",
            }
        }
    })
    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
            <div className="mt-4 space-y-4">
                {ratingsWithUsers
                    .slice(0, 3)
                    .map((rating, index) => (
                        <div key={index} className="border-b py-4">
                            <div className="flex items-center gap-2">
                                <StarRating rating={rating.rating!} />
                                <span className="font-medium">{rating.review.title}</span>
                            </div>
                            <div className='text-base'>{rating.review.description}</div>
                            <div className="flex items-center gap-2">
                                <Avatar>
                                    <AvatarImage src={rating.user.imageUrl} />
                                    <AvatarFallback>{rating.user.name}</AvatarFallback>
                                </Avatar>
                                <span className='text-base'>{rating.user.name}</span>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default Reviews