import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination"
import { getUsersFromClerk } from '@/actions/getUsersFromClerk'
import { PopulatedRating } from '@/sanity/lib/rating/getRatingsBySlug'
import StarRating from './StarRating'
import ThumbnailGallery from "./ThumbnailGallery"

const PaginatedReviews = async ({ ratings, totalPages, currentPage }: { ratings: PopulatedRating[], totalPages: number, currentPage: number }) => {
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
    const data = [...ratingsWithUsers, ...ratingsWithUsers, ...ratingsWithUsers]
    return (
        <div>
            {data
                .slice(0, 3)
                .map((rating, index) => (
                    <div key={index} className={`${index != (data.length - 1) && "border-b"} py-4`}>
                        <div className="flex items-center gap-2">
                            <StarRating rating={rating.rating!} />
                            <span className="font-medium">{rating.review.title}</span>
                        </div>
                        <div className='text-base'>{rating.review.description}</div>
                        <ThumbnailGallery images={rating.review.images || []}/>
                        <div className="flex items-center gap-2 mt-1">
                            <span className='text-xs'>by {rating.user.name}</span>
                            <span></span>
                        </div>
                    </div>
                ))}
                {totalPages > 1 && (
                <Pagination>
                    <PaginationContent>
                        {currentPage > 1 && <PaginationItem>
                            <PaginationPrevious

                                href={`?page=${currentPage - 1}`}
                            />
                        </PaginationItem>}

                        {Array.from({ length: totalPages }, (_, idx) => {
                            const page = idx + 1
                            return (
                                <PaginationItem key={page}>
                                    <PaginationLink
                                        href={`?page=${page}`}
                                        isActive={currentPage === page}
                                    >
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            )
                        })}

                        {currentPage < totalPages && <PaginationItem>
                            <PaginationNext
                                href={`?page=${currentPage + 1}`}
                            />
                        </PaginationItem>}
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    )
}

export default PaginatedReviews