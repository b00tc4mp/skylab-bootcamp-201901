import validate from '../../common/validate';
import { ValueError } from '../../common/errors';

const productApi = {
  __url__: 'https://warm-atoll-18364.herokuapp.com/api/adidas',

  all: () => fetch(`${productApi.__url__}/products/`).then(res => res.json()),
  findOne: id => fetch(`${productApi.__url__}/product/${id}/`).then(res => res.json()),
  
  search: text => 
    fetch(`${productApi.__url__}/products/search/${text}/`)
    .then(res => res.json())
    .then(items => items.filter(item => !!item)),
  
    detail: id => fetch(`${productApi.__url__}/product/detail/${id}/`).then(res => res.json()),
};

export default productApi;
