import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
    S.list()
        .title("Shopr Ecommerce CMS")
        .items([
            ...S.documentTypeListItems().filter(
                (item) =>
                    item.getId()
            ),
        ]);
