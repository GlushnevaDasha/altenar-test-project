export type ProductItem = {
  id: number;
  name: string;
  autor: string;
  imgUrl: string;
  price: number;
  currency: string;
  previewUrl: string;
  type: string;
  description: string;
};

export function createProduct(data: any) {
  let product: ProductItem = {
    id: data.trackId, //id,
    name: data.trackName || data.collectionName, // name
    autor: data.artistName, //autor
    imgUrl: data.artworkUrl100, //imgUrl
    price:
      data.trackPrice > 0 //price
        ? data.trackPrice
        : data.collectionPrice || data.collectionPrice,
    currency: data.currency, //currency
    previewUrl: data.previewUrl, //previewUrl
    type: data.kind, //type
    description: data.longDescription //description
  };
  return product;
}
