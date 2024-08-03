import React from 'react'
import Link from 'next/link'

import FillImg from '@/component/base/fillImg'

import styles from './search.module.scss'

type Props = {
	title: string
	brand: string
	price: string
	similarity: number
	imgUrls: string
	href: string
}

const Item = ({ title, brand, price, similarity, imgUrls, href }: Props) => {
	console.log(imgUrls)

	return (
		<div className={styles.space}>
			<div className={styles.item}>
				<Link href={href} className={styles.img}>
					{/* <FillImg src={imgUrls} alt='img' /> */}
				</Link>
				<div className={styles.info}>
					<div className={styles.desc}>
						<div className={styles.title}>{title}</div>
						<div className={styles.price}>
							<span>{brand}</span>
							<span>{price}</span>
						</div>
					</div>
					<div className={styles.ratio}>{similarity}</div>
				</div>
			</div>
		</div>
	)
}

export default Item
