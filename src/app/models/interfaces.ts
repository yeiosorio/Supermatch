
export interface InewsResponse {
	content: string
	created_at: string
	fecha: string
	gallery_id: null
	id: number
	imagen_content: {
		url: string
		normal: {
			url: string
		}
	}
	imagen_titulo: {
		url: string
		normal: {
			url: string
		}
	}
	order_view: number
	subtitulo: string
	titulo: string
	updated_at: string
	visible: boolean
	
}

export interface Payload {
	newsList(): void;
}