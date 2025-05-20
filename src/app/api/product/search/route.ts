import { NextRequest } from "next/server";
import { client, ElasticProduct } from "@/lib/elasticSearch";
const SEARCH_INDEX = process.env.ELASTICSEARCH_INDEX;
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const {
            q: query,
            page = 1,
            limit = 10,
        } = Object.fromEntries(searchParams.entries());
        if (!query) {
            return new Response(
                JSON.stringify({ error: "Search query is required" }),
                { status: 400 }
            );
        }

        if (!SEARCH_INDEX) {
            return new Response(
                JSON.stringify({ error: "Search index not configured" }),
                { status: 500 }
            );
        }

        const result = await client.search({
            index: SEARCH_INDEX,
            body: {
                from: (Number(page) - 1) * Number(limit),
                size: Number(limit),
                query: {
                    bool: {
                        must: [
                            {
                                multi_match: {
                                    query,
                                    fields: [
                                        "name.ngram^2",
                                        "description.ngram",
                                    ],
                                    fuzziness: "AUTO",
                                    prefix_length: 2,
                                    operator: "or",
                                },
                            },
                        ],
                    },
                },
                suggest: {
                    "name-suggest": {
                        prefix: query,
                        completion: {
                            field: "name.suggest",
                            size: 5,
                        },
                    },
                },
                highlight: {
                    fields: {
                        "name.ngram": {
                            pre_tags: ["<mark>"],
                            post_tags: ["</mark>"],
                        },
                        "description.ngram": {
                            pre_tags: ["<mark>"],
                            post_tags: ["</mark>"],
                        },
                    },
                },
            },
        });

        const response = {
            total:
                typeof result.hits?.total === "object"
                    ? result.hits.total.value
                    : result.hits?.total,
            page: Number(page),
            limit: Number(limit),
            results: result.hits.hits.map((hit) => ({
                id: hit._id,
                name: (hit._source as { name: string }).name,
                price: (hit._source as { price: number }).price,
                slug: (hit._source as { slug: string }).slug,
                description: (hit._source as { description: string })
                    .description,
                image: (hit._source as { image: any }).image,
                stock: (hit._source as { stock: number }).stock,
                imageUrl: (hit._source as { imageUrl: string }).imageUrl,
                highlight: hit.highlight,
            })) as ElasticProduct[],
        };

        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error: any) {
        console.error("Search error:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
        });
    }
}
