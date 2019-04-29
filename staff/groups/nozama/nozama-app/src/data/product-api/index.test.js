import productApi from '.'
import {
  RequirementError
} from '../../common/errors';

describe('product-api', () => {
  describe('retrieve', () => {

    describe('retrieve products', () => {

      it('should retrieve all products on correct params', () => {

        return productApi.retreiveAllProducts()
          .then(res => {
            expect(res instanceof Array).toBe(true)
            expect(res.length).toBeTruthy()

            const producIndex = Math.floor((Math.random() * res.length))
            const ranProduct = res[producIndex]
            expect(ranProduct).toBeDefined()
            expect(ranProduct._links).toBeDefined()
            expect(ranProduct._links instanceof Object).toBeTruthy()

            /**Images small test */
            expect(ranProduct._links.image_small).toBeDefined()
            expect(ranProduct._links.image_small instanceof Object).toBeTruthy()
            expect(ranProduct._links.image_small.href).toBeDefined()
            expect(typeof ranProduct._links.image_small.href).toBe('string')
            expect(ranProduct._links.images_small).toBeDefined()
            expect(ranProduct._links.images_small instanceof Array).toBeTruthy()
            expect(ranProduct._links.images_small[0] instanceof Object).toBeTruthy()
            expect(ranProduct._links.images_small[0].href).toBeDefined()
            expect(typeof ranProduct._links.images_small[0].href).toBe('string')
            /**Images large test */
            expect(ranProduct._links.image_large).toBeDefined()
            expect(ranProduct._links.image_large instanceof Object).toBeTruthy()
            expect(ranProduct._links.image_large.href).toBeDefined()
            expect(typeof ranProduct._links.image_large.href).toBe('string')
            expect(ranProduct._links.images_large).toBeDefined()
            expect(ranProduct._links.images_large instanceof Array).toBeTruthy()
            expect(ranProduct._links.images_large[0] instanceof Object).toBeTruthy()
            expect(ranProduct._links.images_large[0].href).toBeDefined()
            expect(typeof ranProduct._links.images_large[0].href).toBe('string')
            /**Another data test */
            expect(ranProduct.product_Id).toBeDefined()
            expect(typeof ranProduct.product_Id).toBe('string')
            expect(ranProduct.product_id).toBeDefined()
            expect(typeof ranProduct.product_id).toBe('string')
            expect(ranProduct.model_number).toBeDefined()
            expect(typeof ranProduct.model_number).toBe('string')
            expect(ranProduct.display_product_id).toBeDefined()
            expect(typeof ranProduct.display_product_id).toBe('string')
            expect(ranProduct.product_name).toBeDefined()
            expect(typeof ranProduct.product_name).toBe('string')
            expect(ranProduct.subtitle).toBeDefined()
            expect(typeof ranProduct.subtitle).toBe('string')
            expect(ranProduct.original_price).toBeDefined()
            expect(typeof ranProduct.original_price).toBe('number')
            expect(ranProduct.display_currency).toBeDefined()
            expect(typeof ranProduct.display_currency).toBe('string')
            expect(ranProduct.display_currency).toBeDefined()
            expect(typeof ranProduct.display_currency).toBe('string')
            expect(ranProduct.is_new).toBeDefined()
            expect(typeof ranProduct.is_new).toBe("boolean")
            expect(ranProduct.is_sale).toBeDefined()
            expect(typeof ranProduct.is_sale).toBe("boolean")
            expect(ranProduct.is_sale).toBeDefined()
            expect(typeof ranProduct.is_sale).toBe("boolean")
            expect(ranProduct.is_sold_out).toBeDefined()
            expect(typeof ranProduct.is_sold_out).toBe("boolean")
            expect(ranProduct.is_exclusive).toBeDefined()
            expect(typeof ranProduct.is_exclusive).toBe("boolean")
            expect(ranProduct.is_app_exclusive).toBeDefined()
            expect(typeof ranProduct.is_app_exclusive).toBe("boolean")
            expect(ranProduct.is_early_access).toBeDefined()
            expect(typeof ranProduct.is_early_access).toBe("boolean")
            expect(ranProduct.orderable).toBeDefined()
            expect(typeof ranProduct.orderable).toBe("boolean")
            expect(ranProduct.badge_text).toBeDefined()
            expect(typeof ranProduct.badge_text).toBe('string')
            expect(ranProduct.badge_color).toBeDefined()
            expect(typeof ranProduct.badge_color).toBe('string')
            expect(ranProduct.badge_type).toBeDefined()
            expect(typeof ranProduct.badge_type).toBe('string')
            expect(ranProduct.badge_type).toBeDefined()
            expect(typeof ranProduct.badge_type).toBe('string')
            expect(ranProduct.purchase_limit).toBeDefined()
            expect(typeof ranProduct.purchase_limit).toBe('number')
            expect(ranProduct.is_preorderable).toBeDefined()
            expect(typeof ranProduct.is_preorderable).toBe('boolean')
            expect(ranProduct.coming_soon_date).toBeDefined()
            expect(typeof ranProduct.coming_soon_date).toBe('string')
            expect(ranProduct.push_tag).toBeDefined()
            expect(typeof ranProduct.push_tag).toBe('string')

          })

      })
    })
  })
})