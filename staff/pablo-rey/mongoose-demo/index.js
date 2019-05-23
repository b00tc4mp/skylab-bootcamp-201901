const url = 'mongodb://localhost:27017/mongoose-demo';
const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.connect(url, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', err => console.error('MongoDB connection error'));


function printInvoice (invoice) {
  console.log(invoice.client.fullname);
  invoice.products.forEach(line => {
    const { product: { description, listPrice, offer }, qty, } = line;
    console.log(`${description} ${listPrice} ${offer ? offer * 100 + '%': ''} x${qty}`)
  })
  console.log('Total: ', invoice.amount)
}

db.once('open', async () => {
  const clientSchema = new Schema({
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    DNI: {
      type: String,
      required: true,
      trim: true,
    },
    email: String,
    phone: {
      type: Map,
      of: String,
    },
  });
  const Client = mongoose.model('Client', clientSchema);

  const productSchema = new Schema({
    description: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: String,
    listPrice: Number,
    offer: Number,
  });
  productSchema.virtual('price').get(function() {
    return this.offer ? (1 - this.offer) * this.listPrice : this.listPrice;
  });
  const Product = mongoose.model('Product', productSchema);

  const invoiceSchema = new Schema({
    client: clientSchema,
    date: Date,
    products: [
      {
        product: productSchema,
        qty: Number,
      },
    ],
  });
  invoiceSchema.virtual('amount').get(function() {
    return this.products.reduce((acc, line) => acc + line.product.price * line.qty, 0);
  });
  const Invoice = mongoose.model('Invoice', invoiceSchema);

  // data
  const perico = new Client({
    fullname: 'Perico Palotes',
    DNI: ' 1F ',
    email: 'pericopalotes@gmail.com',
    phone: { mobile: '600000000', land: '930000000' },
  });
  await perico.save();
  const albertito = new Client({
    fullname: 'Alberto Banana',
    DNI: '2P ',
    email: 'a.banana@gmail.com',
    phone: { mobile: '601000000', land: '91200000' },
  });
  await albertito.save();

  const products = [
    new Product({
      description: '24k Gold Mirror Spinner',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/1020/2329/products/goldmirror_large.jpg?v=1450045577',
      listPrice: 77,
      offer: null,
    }),
    new Product({
      description: 'Tungsten Spinner',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/1020/2329/products/tu_62bca20d-caa8-46d0-92cd-c70d124e1a19_large.jpg?v=1449968130',
      listPrice: 234,
      offer: 0.1,
    }),
    new Product({
      description: 'Zirconium Spinner',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/1020/2329/products/zrblack-1_large.jpg?v=1465393472',
      listPrice: 121,
      offer: 0.25,
    }),
  ];
  await products.forEach(product => product.save());

  let invoice = new Invoice({
    client: perico,
    date: new Date(),
    products: [
      {
        product: products[1],
        qty: 1,
      },
      {
        product: products[2],
        qty: 2,
      },
      {
        product: products[0],
        qty: 1,
      },
    ],
  });
  await invoice.save();

  const invoiceId = invoice._id;
  invoice = null;

  invoice = await Invoice.findById(invoiceId);
  printInvoice(invoice)

});
