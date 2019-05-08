export default class Product {
  __info__ = null;
  
  constructor(adidasInfo) {
    this.__info__ = adidasInfo;
  }

  get imageSmall () { return this.__info__._links.image_small.href}
  get imageLarge () { return this.__info__._links.image_large.href}
  get productId () { return this.__info__.product_id }
  get modelNumber () { return this.__info__.model_number}
  get displayProductId () { return this.__info__.display_product_id}
  get productName () { return this.__info__.product_name}
  get subtitle () { return this.__info__.subtitle}
  get originalPrice () { return this.__info__.original_price}
  get displayCurrency () { return this.__info__.display_currency}
  get isNew () { return this.__info__.is_new}
  get isSale () { return this.__info__.is_sale}
  get isSoldOut () { return this.__info__.is_sold_out}
  get isExclusive () { return this.__info__.is_exclusive}
  get isAppExclusive () { return this.__info__.is_app_exclusive}
  get isEarlyAccess () { return this.__info__.is_early_access}
  get orderable () { return this.__info__.orderable}
  get badgeText () { return this.__info__.badge_text}
  get badgeColor () { return this.__info__.badge_color}
  get badgeType () { return this.__info__.badge_type}
  get purchaseLimit () { return this.__info__.purchase_limit}
  get isPreorderable () { return this.__info__.is_preorderable}
  get commingSoonDate () { return new Date(this.__info__.coming_soon_date)}
  get pushTag () { return this.__info__.push_tag}

}
