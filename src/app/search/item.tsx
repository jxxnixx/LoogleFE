import React from 'react'
import Link from 'next/link'

import FillImg from '@/component/base/fillImg'

import styles from './search.module.scss'

type Props = {
	title: string
	brand: string
	price: number
	similarity: number
	imgUrls: string
	href: string
}

const Item = ({ title, brand, price, similarity, imgUrls, href }: Props) => {
	const truncatedSimilarity = Math.floor(similarity * 100) / 100

	return (
		<div className={styles.space}>
			<div className={styles.item}>
				<Link href={href} className={styles.link}>
					<FillImg src={imgUrls} alt='img' className={styles.img} />
				</Link>
				<div className={styles.info}>
					<div className={styles.desc}>
						<div className={styles.title}>{title}</div>
						<div className={styles.details}>
							<span>{brand}</span>
							<span>₩{price}</span>
						</div>
					</div>
					<div className={styles.ratio}>{truncatedSimilarity}%</div>
				</div>
			</div>
		</div>
	)
}

export default Item
