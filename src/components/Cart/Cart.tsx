import React, { useEffect, useState } from 'react';
/**Libraries */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
/**Components */
import Button from 'components/Button';
/**Styles */
import './cart.scss';
import { ProductModel, CartProductModel } from 'models/product.model';


type CartProps = {
    products: ProductModel[];
    handleRemoveItem: (product: ProductModel) => void;
    handleCheckout: (products: CartProductModel[]) => void
};

const Cart = ({ products, handleRemoveItem, handleCheckout }: CartProps) => {
    const [cartProducts, setCartProducts] = useState<CartProductModel[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        setCartProducts(products.map(obj => ({ ...obj, total: 1 })));
    }, [products]);

    useEffect(() => {
        setTotalPrice(
            cartProducts.reduce((totalPrice, product) => {
                const totalProduct = product.price * product.total;
                totalPrice += totalProduct;
                return totalPrice;
            }, 0),
        );
    }, [cartProducts]);

    const addOneProduct = (product: CartProductModel) => {
        if (product.stock > product.total) {
            product.total += 1;
            setCartProducts(prevCartProducts => [...prevCartProducts]);
        }
    };
    const removeOneProduct = (product: CartProductModel) => {
        if (product.total > 1) {
            product.total -= 1;
            setCartProducts(prevCartProducts => [...prevCartProducts]);
        } else {
            delete product.total;
            handleRemoveItem(product);
        }
    };
    const checkout = () => {
        handleCheckout(cartProducts);
        setCartProducts([]);
    }
    return (
        <div className="cart cart__wrapper">
            <div className="cart__product-list">
                {cartProducts.map(product => {
                    const { image_url, productName, price, total } = product;
                    return (
                        <div className="cart__product" key={product.id}>
                            <img className="cart__image" src={image_url} alt={productName} />
                            <div className="cart__title">
                                <span>{productName}</span>
                                <div>
                                    <FontAwesomeIcon icon="minus" onClick={() => removeOneProduct(product)} />
                                    <span className="cart__total"> {total} </span>
                                    <FontAwesomeIcon icon="plus" onClick={() => addOneProduct(product)} />
                                </div>
                            </div>
                            <div className="cart__price">
                                <span>{price}$</span>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="cart__checkout">
                <Button onClick={checkout}> CHECKOUT </Button>
                <span>{totalPrice}$</span>
            </div>
        </div>
    );
};

export default Cart;
