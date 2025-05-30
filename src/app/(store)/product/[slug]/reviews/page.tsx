import Reviews from "@/components/Reviews";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { getRatingsBySlug } from "@/sanity/lib/rating/getRatingsBySlug";

const ProductReviews = async ({ params, searchParams }: { params: Promise<{ slug: string }>, searchParams: Promise<{ page: number }> }) => {
  const { slug } = await params;
  const { page=1 } = await searchParams;
  const { items, totalPages } = await getRatingsBySlug(slug, page, 10);
  return (<>
    <Reviews ratings={items} />
    {totalPages > 1 && (
      <Pagination>
        <PaginationContent>
          {page > 1 && <PaginationItem>
            <PaginationPrevious

              href={`?page=${page - 1}`}
            />
          </PaginationItem>}

          {Array.from({ length: totalPages }, (_, idx) => {
            const page = idx + 1
            return (
              <PaginationItem key={page}>
                <PaginationLink
                  href={`?page=${page}`}
                  isActive={page === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          })}

          {page < totalPages && <PaginationItem>
            <PaginationNext
              href={`?page=${page + 1}`}
            />
          </PaginationItem>}
        </PaginationContent>
      </Pagination>
    )}
  </>
  )
}

export default ProductReviews