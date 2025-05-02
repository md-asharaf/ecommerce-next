import "server-only";
import { defineLive } from "next-sanity";
import { client } from "./client";
const token = process.env.SANITY_API_READ_TOKEN;
if (!token) {
    throw new Error("No token found for sanity read token");
}
export const { sanityFetch, SanityLive } = defineLive({
    client: client,
    serverToken: token,
    browserToken: token,
    fetchOptions: {
        revalidate: 0,
    },
});
