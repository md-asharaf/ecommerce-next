import { Client } from "@elastic/elasticsearch";
const username = process.env.ELASTICSEARCH_USERNAME;
const password = process.env.ELASTICSEARCH_PASSWORD;
const node = process.env.ELASTICSEARCH_URL;
if (!username || !password || !node) {
    throw new Error("Elasticsearch username, password, and URL must be set");
}
export const client = new Client({
    node,
});
export interface ElasticProduct {
    id: string;
    name: string;
    price: number;
    slug: string;
    description: string;
    image: any;
    category: string;
    stock: number;
    imageUrl: string;
    highlight: any;
}