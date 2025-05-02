import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";
const vercelUrl = process.env.VERCEL_URL;
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
    stega: {
        studioUrl: vercelUrl
            ? `https://${vercelUrl}/studio`
            : `${baseUrl}/studio`,
    },
});
