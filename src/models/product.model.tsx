export type ProductModel = {
    id: string,
    image_url: string;
    stock: number;
    productName: string;
    price: number;
    productDescription: string;
    favorite: string;
    total?: number;
}