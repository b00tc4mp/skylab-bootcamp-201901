export default class ProductWithDetail {
  constructor(adidasDetailInfo) {
    this.__info__ = adidasDetailInfo;
  }

  get campaign () { return this.__info__._links.campaign && this.__info__._links.campaign
    .href }
  get relatedProducts () { return this.__info__._links.related_products && this.__info__._links.related_products.href }
  get productRecommendations () { return this.__info__._links.product_recommendations && this.__info__._links.product_recommendations.href }
  get variationsRef () { return this.__info__._links.variations && this.__info__._links.variations.href }

  get imageSmall () { return this.__info__._links.image_small.href}
  get imagesSmall () { return this.__info__._links.images_small.map(item => item.href)}
  get imageLarge () { return this.__info__._links.image_large.href}
  get imagesLarge () { return this.__info__._links.images_small.map(item => item.href)}

  get isMi () { return this.__info__.is_mi }
  get productId () { return this.__info__.product_id }
  get modelNumber () { return this.__info__.model_number}
  get productName () { return this.__info__.product_name }
  get subtitle () { return this.__info__.subtitle }
  get countOfColors () { return this.__info__.count_of_colors }
  get originalPrice () { return this.__info__.original_price}
  get displayCurrency () { return this.__info__.display_currency}
  get isNew () { return this.__info__.is_new}
  get isSale () { return this.__info__.is_sale}
  get isSoldOut () { return this.__info__.is_sold_out}
  get isExclusive () { return this.__info__.is_exclusive}
  get orderable () { return this.__info__.orderable}
  get badgeText () { return this.__info__.badge_text}
  get badgeColor () { return this.__info__.badge_color}
  get badgeType () { return this.__info__.badge_type}
  get purchaseLimit () { return this.__info__.purchase_limit}
  get isPreorderable () { return this.__info__.is_preorderable}
  get isBackorderable () { return this.__info__.is_backorderable}
  get commingSoonDate () { return new Date(this.__info__.coming_soon_date)}
  get isCommingSoon () { return this.__info__.is_coming_soon}
  get pushTag () { return this.__info__.push_tag}
  get category () { return this.__info__.category }
  get productType () { return this.__info__.productType }
  get sizeCategory () { return this.__info__.size_category }
  get stockLevel () { return this.__info__.stock_level }
  get lowOnStockMessage () { return this.__info__.low_on_stock_message }
  get colorName () { return this.__info__.color_name }
  get searchColor () { return this.__info__.search_color }
  get color1Hex () { return this.__info__.color1_hex; }
  get color2Hex () { return this.__info__.color2_hex; }
  get gender () { return this.__info__.gender }
  get outOfStockAllSizes () { return this.__info__.out_of_stock_all_sizes }
  get outOfStockAllColors () { return this.__info__.out_of_stock_all_colors }
  get descriptionHeadline () { return this.__info__.description_headline; }
  get shortDescription () { return this.__info__.short_description }
  get descriptionBullets () { return this.__info__.description_bullets }
  get modelInfo () { return this.__info__.model_info }
  get variations () { 
    return this.__info__.variations.map(item => {
      return {
        size : item.size,
        orderable: item.orderable,
        productId : item.variation_product_id,
        stockLevel : item.stock_level,
        stockStatus : item.stock_status,
      }
    }) 
  }
}

