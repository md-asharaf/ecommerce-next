"use client"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Category } from "../../sanity.types";

const BreadCrumbComponent = ({ category, productName = "" }: { category?: Category; productName?: string }) => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {category && (
                    <>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">HOME</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem >
                            < BreadcrumbLink href={`/category/${category.slug?.current}`} >{category.title?.toUpperCase()}</BreadcrumbLink>
                        </BreadcrumbItem>
                    </>
                )}
                {productName && (<>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{productName?.toUpperCase()}</BreadcrumbPage>
                    </BreadcrumbItem>
                </>
                )}
            </BreadcrumbList>
        </Breadcrumb >

    )
}

export default BreadCrumbComponent