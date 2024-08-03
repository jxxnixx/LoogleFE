import { CSSProperties, HTMLAttributes } from 'react'

import { clc } from '@/utilities/classComposer'

import styles from './base.module.scss'

const assetList = ['magnifier', 'camera'] as const

type AssetName = (typeof assetList)[number]

type IconName = AssetName

export interface IconProps extends HTMLAttributes<SVGSVGElement> {
	path: IconName
	alt: string
	className?: string
	style?: CSSProperties
}

const assetUrl = '/svg/asset.svg#'

const pathToSrc = (path: IconName) => {
	return assetUrl + path
}

const Icon = ({ path, alt, className, style, ...props }: IconProps) => {
	const src = pathToSrc(path)

	return (
		<svg {...props} style={{ ...style }} className={clc(styles.icon, className)} aria-label={alt}>
			<use href={src} xlinkHref={src} />
		</svg>
	)
}

export default Icon
