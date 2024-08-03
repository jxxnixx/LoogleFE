import axios from 'axios'

export const api = axios.create({
	baseURL: '/',
	withCredentials: true,
})

export const getKeywordSearchResult = async (keywordName: string) => {
	const params = { keywordName: keywordName }

	try {
		const response = await api.get('/products/search/keyword', { params })

		return response.data
	} catch (error) {
		console.error('Error fetching data:', error)

		throw error
	}
}

export const postImageAndGetSearchResult = async (imageFile: File) => {
	const formData = new FormData()
	formData.append('imageFile', imageFile)

	try {
		const response = await api.post('/products/search/image', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})

		return response.data
	} catch (error) {
		console.error('Error uploading image:', error)

		throw error
	}
}
