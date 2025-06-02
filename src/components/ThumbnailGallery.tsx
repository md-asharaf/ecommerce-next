import { imageUrl } from '@/lib/imageUrl'
import Image from 'next/image'

const ThumbnailGallery = ({ images }: { images: any[] }) => {
    return (
        <div className="mt-4 flex flex-wrap basis-1/3 gap-2 overflow-y-auto">
            {images.map((image, index) => (
                <div
                    key={index}
                    className="relative h-20 w-20 flex-shrink-0 overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500"
                >
                    <Image
                        src={typeof image === 'object' ? imageUrl(image).url() : image || "/placeholder.png"}
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