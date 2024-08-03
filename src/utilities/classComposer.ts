export type NullableString = string | boolean | undefined

/**
 * class composer utility for safety class composition
 * @example clc(styles.a,styles.b,'c')
 * @param classNames
 * @returns {string}
 */

export const clc = (...classNames: NullableString[]) => {
	return classNames
		.filter((text): text is string => typeof text === 'string')
		.map((txt) => txt.trim())
		.join(' ')
}
