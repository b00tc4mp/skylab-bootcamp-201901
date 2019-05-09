import productApi from '.';

describe('product-api', () => {
  function generalExpect(product) {    
    expect(product).toBeDefined();

    const {
      _links,
      product_Id,
      product_id,
      model_number,
      display_product_id,
      product_name,
      subtitle,
      original_price,
      display_currency,
      is_new,
      is_sale,
      is_sold_out,
      is_exclusive,
      is_app_exclusive,
      is_early_access,
      orderable,
      badge_text,
      badge_color,
      badge_type,
      purchase_limit,
      is_preorderable,
      coming_soon_date,
      push_tag,
    } = product;

    expect(_links).toBeDefined();
    expect(_links instanceof Object).toBeTruthy();
    /**Images small test */
    const { image_small, images_small } = _links;
    expect(image_small).toBeDefined();
    expect(image_small instanceof Object).toBeTruthy();
    expect(image_small.href).toBeDefined();
    expect(typeof image_small.href).toBe('string');
    expect(images_small).toBeDefined();
    expect(images_small instanceof Array).toBeTruthy();
    expect(images_small[0] instanceof Object).toBeTruthy();
    expect(images_small[0].href).toBeDefined();
    expect(typeof images_small[0].href).toBe('string');

    /**Images large test */
    const { image_large, images_large } = _links;
    expect(image_large).toBeDefined();
    expect(image_large instanceof Object).toBeTruthy();
    expect(image_large.href).toBeDefined();
    expect(typeof image_large.href).toBe('string');
    expect(images_large).toBeDefined();
    expect(images_large instanceof Array).toBeTruthy();
    expect(images_large[0] instanceof Object).toBeTruthy();
    expect(images_large[0].href).toBeDefined();
    expect(typeof images_large[0].href).toBe('string');

    /**Another data test */
    expect(product_Id).toBeDefined();
    expect(typeof product_Id).toBe('string');
    expect(product_id).toBeDefined();
    expect(typeof product_id).toBe('string');
    expect(model_number).toBeDefined();
    expect(typeof model_number).toBe('string');
    expect(display_product_id).toBeDefined();
    expect(typeof display_product_id).toBe('string');
    expect(product_name).toBeDefined();
    expect(typeof product_name).toBe('string');
    expect(subtitle).toBeDefined();
    expect(typeof subtitle).toBe('string');
    expect(original_price).toBeDefined();
    expect(typeof original_price).toBe('number');
    expect(display_currency).toBeDefined();
    expect(typeof display_currency).toBe('string');
    expect(display_currency).toBeDefined();
    expect(typeof display_currency).toBe('string');
    expect(is_new).toBeDefined();
    expect(typeof is_new).toBe('boolean');
    expect(is_sale).toBeDefined();
    expect(typeof is_sale).toBe('boolean');
    expect(is_sale).toBeDefined();
    expect(typeof is_sale).toBe('boolean');
    expect(is_sold_out).toBeDefined();
    expect(typeof is_sold_out).toBe('boolean');
    expect(is_exclusive).toBeDefined();
    expect(typeof is_exclusive).toBe('boolean');
    expect(is_app_exclusive).toBeDefined();
    expect(typeof is_app_exclusive).toBe('boolean');
    expect(is_early_access).toBeDefined();
    expect(typeof is_early_access).toBe('boolean');
    expect(orderable).toBeDefined();
    expect(typeof orderable).toBe('boolean');
    expect(badge_text).toBeDefined();
    expect(typeof badge_text).toBe('string');
    expect(badge_color).toBeDefined();
    expect(typeof badge_color).toBe('string');
    expect(badge_type).toBeDefined();
    expect(typeof badge_type).toBe('string');
    expect(badge_type).toBeDefined();
    expect(typeof badge_type).toBe('string');
    expect(purchase_limit).toBeDefined();
    expect(typeof purchase_limit).toBe('number');
    expect(is_preorderable).toBeDefined();
    expect(typeof is_preorderable).toBe('boolean');
    if (coming_soon_date) expect(typeof coming_soon_date).toBe('string');
    expect(push_tag).toBeDefined();
    expect(typeof push_tag).toBe('string');
    return product;
  }

  describe('retrieve all products', () => {
    it('should retrieve all products on correct params', () =>
      productApi.all().then(list => {
        expect(list instanceof Array).toBe(true);

        const product = list[Math.floor(Math.random() * list.length)];

        generalExpect(product);
      }));
  });

  describe('retrieve 1 product', () => {
    let idList;
    beforeEach(() => productApi.all().then(list => (idList = list.map(item => item.product_id))));

    it('should retrieve 1 product', () =>
      productApi.findOne(idList[Math.floor(Math.random() * idList.length)]).then(product => {
        expect(product instanceof Array).toBeFalsy();
        return generalExpect(product);
      }));
  });

  describe('retrieve 1 product detail', () => {
    let idList;
    beforeEach(() => productApi.all().then(list => (idList = list.map(item => item.product_id))));

    it('should retrieve 1 product detail', () =>
      productApi.detail(idList[Math.floor(Math.random() * idList.length)]).then(product => {
        expect(product instanceof Array).toBeFalsy();
        const {
          _links,
          is_mi,
          model_number,
          product_id,
          product_name,
          subtitle,
          count_of_colors,
          original_price,
          display_currency,
          is_new,
          is_sale,
          is_sold_out,
          is_exclusive,
          badge_text,
          badge_color,
          badge_type,
          category,
          productType,
          size_category,
          share_url,
          hashtag,
          stock_level,
          low_on_stock_message,
          color_name,
          search_color,
          color1_hex,
          color2_hex,
          gender,
          purchase_limit,
          orderable,
          out_of_stock_all_sizes,
          out_of_stock_all_colors,
          description_headline,
          short_description,
          description_bullets,
          model_info,
          is_preorderable,
          is_backorderable,
          is_coming_soon,
          coming_soon_date,
          push_tag,
          coming_soon_date_localized,
          date_format,
          usps,
          usps_icons,
          variations,
          _embedded,
          info_details,
        } = product;
        expect(typeof _links).toBe('object');
        expect(typeof is_mi).toBe('boolean');
        expect(typeof model_number).toBe('string');
        expect(typeof product_id).toBe('string');
        expect(typeof product_name).toBe('string');
        expect(typeof subtitle).toBe('string');
        expect(typeof count_of_colors).toBe('number');
        expect(typeof original_price).toBe('number');
        expect(typeof display_currency).toBe('string');
        expect(typeof is_new).toBe('boolean');
        expect(typeof is_sale).toBe('boolean');
        expect(typeof is_sold_out).toBe('boolean');
        expect(typeof is_exclusive).toBe('boolean');
        expect(typeof badge_text).toBe('string');
        expect(typeof badge_color).toBe('string');
        expect(typeof badge_type).toBe('string');
        expect(typeof category).toBe('string');
        expect(productType instanceof Array).toBeTruthy();
        expect(typeof size_category).toBe('string');
        expect(typeof share_url).toBe('string');
        expect(typeof hashtag).toBe('string');
        expect(typeof stock_level).toBe('number');
        expect(typeof low_on_stock_message).toBe('string');
        expect(typeof color_name).toBe('string');
        expect(search_color instanceof Array).toBeTruthy();
        expect(typeof color1_hex).toBe('string');
        expect(typeof color2_hex).toBe('string');
        expect(typeof gender).toBe('string');
        expect(typeof purchase_limit).toBe('number');
        expect(typeof orderable).toBe('boolean');
        expect(typeof out_of_stock_all_sizes).toBe('boolean');
        expect(typeof out_of_stock_all_colors).toBe('boolean');
        expect(typeof description_headline).toBe('string');
        expect(typeof short_description).toBe('string');
        expect(description_bullets instanceof Array).toBeTruthy();
        if (model_info) expect(typeof model_info).toBe('string');
        expect(typeof is_preorderable).toBe('boolean');
        expect(typeof is_backorderable).toBe('boolean');
        expect(typeof is_coming_soon).toBe('boolean');
        if (coming_soon_date) expect(typeof coming_soon_date).toBe('string');
        expect(typeof push_tag).toBe('string');
        expect(typeof coming_soon_date_localized).toBe('string');
        expect(typeof date_format).toBe('string');
        expect(usps instanceof Array).toBeTruthy();
        expect(usps_icons instanceof Array).toBeTruthy();
        expect(variations instanceof Array).toBeTruthy();
        expect(typeof _embedded).toBe('object');
        expect(_embedded.variations instanceof Array).toBeTruthy();
        expect(_embedded.color_variations instanceof Array).toBeTruthy();
        expect(typeof info_details).toBe('object');
      }));
  });

  describe('retrieve products from a search', () => {
    let list;
    beforeEach(() => productApi.all().then(_list => (list = _list)));

    it('should retrieve products from search in all detail', () => {
      let words = list.map(item => item.product_name);
      words = words.reduce((acc, item) => {
        acc.push(...item.split(' '));
        return acc;
      }, []);
      const word = words[Math.floor(Math.random() * words.length)];
      return productApi.search(word)
        .then(items => {          
          items.forEach(item => {
            expect(item).toBeDefined();
            expect(item).not.toBeNull();
            generalExpect(item)
          });
      });
    });
  });
});
