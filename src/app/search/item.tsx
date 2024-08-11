import React from 'react'
import { Carousel } from 'antd'
import Image from 'next/image'
import Link from 'next/link'

import FillImg from '@/component/base/fillImg'

import styles from './item.module.scss'

type Props = {
	title: string
	brand: string
	price: number
	similarity: number
	imgUrls: string[]
	href: string
}

const Item = ({ title, brand, price, similarity, imgUrls, href }: Props) => {
	const truncatedSimilarity = Math.floor(similarity * 10000) / 100

	return (
		<div className={styles.space}>
			<div className={styles.item}>
				<Link href={href} className={styles.link} target='_blank'>
					<Carousel autoplay className={styles.carousel} autoplaySpeed={5000}>
						{imgUrls.map((url, index) => (
							<div key={index} className={styles.imgArea}>
								<FillImg key={index} src={url} alt={`img-${index}`} className={styles.img} />
							</div>
						))}
					</Carousel>
				</Link>

				<div className={styles.title}>
					<span>{title}</span>
				</div>

				<div className={styles.area}>
					<div className={styles.info}>
						<div className={styles.details}>
							<span>{brand}</span>
							<span>₩{price}</span>
						</div>

						<div className={styles.ratio}>{truncatedSimilarity}%</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Item
