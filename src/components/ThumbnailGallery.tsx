import { imageUrl } from '@/lib/imageUrl'
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import Image from 'next/image'
import React from 'react'

const ThumbnailGallery = ({ images }: { images: Array<{ url?: string; asset?: SanityImageSource }> }) => {
    return (
        <div className="mt-4 flex flex-col gap-2 overflow-y-auto border border-gray-200 p-2">
            {images.map((image, index) => (
                <div
                    key={index}
                    className="relative h-20 w-20 flex-shrink-0  rounded-md overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500"
                >
                    <Image
                        src={image.asset ? imageUrl(image.asset)?.url() : image.url || "/placeholder.png"}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        sizes="80px"
                        className="object-cover"
                    />
                </div>
            ))}
        </div>
    )
}

export default ThumbnailGallery