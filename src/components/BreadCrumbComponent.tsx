"use client"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
interface BreadCrumbComponentProps {
    items: {
        title: string;
        href: string;
    }[]
}
const BreadCrumbComponent = ({ items }: BreadCrumbComponentProps) => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/" className="text-xs">HOME</BreadcrumbLink>
                </BreadcrumbItem>
                {items?.map(({ title, href }, index) => (
                    <div key={index} className="flex items-center">
                        <BreadcrumbSeparator />
                        <BreadcrumbItem >
                            < BreadcrumbLink href={href} className="text-xs" >{title.toUpperCase()}</BreadcrumbLink>
                        </BreadcrumbItem>
                    </div>
                ))}
            </BreadcrumbList>
        </Breadcrumb >

    )
}

export default BreadCrumbComponent