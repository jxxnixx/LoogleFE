import React from 'react'
import Image, { ImageProps } from 'next/image'

type Props = {
	alt?: string
}

const FillImg = ({ src, alt, className, ...props }: Omit<ImageProps, 'alt'> & Props) => {
	return (
		<Image src={src} alt={alt ? alt : 'image'} fill style={{ objectFit: 'cover' }} className={className} {...props} />
	)
}

export default FillImg
