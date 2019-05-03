import React, { useState, useEffect } from 'react';
import logic from '../../logic';
import CardFeature from '../../components/card-features'
import CarouselCategories from '../../components/CarouselCategories'

function Landing(props) {
  const [featureProducts, setFeatureProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([])
  const [productsByCategories, setProductsByCategories] = useState([])

  const allProducts = logic.allProducts()
  
  useEffect(() => {
  allProducts.then(products => {
    const ps = [];
    for (let i = 0; i < 4; i++) {
      ps.push(products[Math.floor(Math.random() * products.length)])
    }
    setFeatureProducts(ps);
  });
  
  allProducts
    .then(products => products.filter(item => item.isNew))
    .then(products => {
      const ps = [];
      for (let i = 0; i < 4; i++) {
        ps.push(products[Math.floor(Math.random() * products.length)])
      }
      setNewProducts(ps);
    })

    allProducts.then(products => {
      let cath = [];
        cath.push(products[0])
        for(let i = 0; i < products.length; i++){
          let exist = false;
          for(let j = 0, lj = cath.length; j < lj ; j++){
            exist = exist || cath[j].subtitle === products[i].subtitle;
          }
          if (!exist) cath.push(products[i])
        }
        setProductsByCategories(cath);
    });
  }, [])

  return (
    <div className="container">
      <CardFeature products={featureProducts} title="Feature Products" />
      <CarouselCategories products={productsByCategories} title="Categories"/>
      <CardFeature products={newProducts} title="New Products" />
    </div>
  );
}

export default Landing;
