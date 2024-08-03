import React from 'react'

import FillImg from '@/component/base/fillImg'

import styles from './search.module.scss'

type Props = {
	title: string
	brand: string
	price: string
	similarity: number
	imgUrls: string | string[]
}

const Item = ({ title, brand, price, similarity, imgUrls }: Props) => {
	return (
		<div className={styles.space}>
			<div className={styles.item}>
				<div className={styles.img}>
					<FillImg src={imgUrls[0]} alt='img' className={styles.resultImg} />
				</div>
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
