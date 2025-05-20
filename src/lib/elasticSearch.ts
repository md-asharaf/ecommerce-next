import { Client } from "@elastic/elasticsearch";
const node = process.env.ELASTICSEARCH_URL;
if (!node) {
    throw new Error("Elasticsearch URL must be set");
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