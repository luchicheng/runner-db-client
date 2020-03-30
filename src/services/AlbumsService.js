import Api from '@/services/Api'

export default {
  index (search) {
    return Api().get('albums', {
      params: {
        search: search
      }
    })
  },
  indexPhotos (albumId) {
    return Api().get(`albums/${albumId}/photos`)
  },
  show (albumId) {
    return Api().get(`albums/${albumId}`)
  },
  post (album) {
    console.log('AlbumService post (album) begin')
    const ret = Api().post('albums', album)
    console.log('AlbumService post (album) end')
    return ret
  },
  put (album) {
    return Api().put(`albums/${album.id}`, album)
  },
  delete (albumId) {
    return Api().delete(`albums/${albumId}`)
  }
}
