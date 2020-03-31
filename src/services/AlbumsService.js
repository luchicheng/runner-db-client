import Api from '@/services/Api'
import ApiGooglePhoto from '@/services/ApiGooglePhoto'

export default {
  async getPhotoUrls (gid) {
    let photos = []
    console.log('gid:', gid)
    const response = await ApiGooglePhoto().get(`${gid}`)
    // links.forEach(function(item, index, array) {
    //   photos.push({url:item, id:index})
    // })
    // console.log('photos:', photos)

    console.log(response)
    let index = 0
    response.data.map(url => (
      photos.push({
        id: index++,
        src: `${url}=w1024`
      // original: `${url}=w1024`,
      // thumbnail: `${url}=w100`
      })))
    console.log('photos:', photos)
    return photos
  },
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
  async post (album) {
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
