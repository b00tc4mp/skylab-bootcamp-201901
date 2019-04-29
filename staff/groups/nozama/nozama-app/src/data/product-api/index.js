import validate from '../../common/validate'
import {
  ValueError
} from '../../common/errors'

const productApi = {
  __url__: 'https://warm-atoll-18364.herokuapp.com/api/adidas/products',

  retreiveAllProducts() {
    return fetch(this.__url__)
      .then(res => res.json())
  }

}

export default productApi;