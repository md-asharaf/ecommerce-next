import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { productType } from "./productType";
import { salesType } from "./saleType";
import { orderType } from "./orderType";
import { reviewType } from "./reviewType";
import { ratingType } from "./ratingType";

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [blockContentType, categoryType, productType, orderType, salesType,reviewType,ratingType],
};
