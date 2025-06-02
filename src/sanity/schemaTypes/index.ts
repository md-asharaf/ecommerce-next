import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { productType } from "./productType";
import { salesType } from "./saleType";
import { variantType } from "./variantType";

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [blockContentType, categoryType, productType, variantType,salesType],
};
