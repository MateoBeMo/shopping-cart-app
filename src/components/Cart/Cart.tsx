import React, { useEffect, useState } from 'react';
/**Libraries */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
/**Components */
import Button from 'components/Button';
/**Styles */
import './cart.scss';
import { ProductModel } from 'models/product.model';

type CartProps = {
    products: ProductModel[];
    handleRemoveItem: (product: ProductModel) => void;
    handleUpdateItem: (product: ProductModel) => void;
    handleCheckout: (products: ProductModel[]) => void;
};

const Cart = ({ products, handleRemoveItem, handleCheckout, handleUpdateItem }: CartProps) => {
    const [cartProducts, setCartProducts] = useState<ProductModel[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        setCartProducts(products.map(obj => ({ ...obj, total: obj.total || 1 })));
    }, [products]);

    useEffect(() => {
        setTotalPrice(
            cartProducts.reduce((totalPrice, product) => {
                const totalProduct = product.price * (product.total || 1);
                totalPrice += totalProduct;
                return totalPrice;
            }, 0),
        );
    }, [cartProducts]);

    const addOneProduct = (product: ProductModel) => {
        if (product.total && product.stock > product.total) {
            product.total += 1;
            handleUpdateItem(product);
            setCartProducts(prevCartProducts => [...prevCartProducts]);
        }
    };
    const removeOneProduct = (product: ProductModel) => {
        if (product.total && product.total > 1) {
            product.total -= 1;
            handleUpdateItem(product);
            setCartProducts(prevCartProducts => [...prevCartProducts]);
        } else {
            handleRemoveItem(product);
        }
    };
    const checkout = () => {
        handleCheckout(cartProducts);
        setCartProducts([]);
    };
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
                                    <span data-testid="minus-icon" onClick={() => removeOneProduct(product)}>
                                        <FontAwesomeIcon icon="minus" />
                                    </span>
                                    <span className="cart__total"> {total} </span>
                                    <span data-testid="plus-icon" onClick={() => addOneProduct(product)}>
                                        <FontAwesomeIcon icon="plus" />
                                    </span>
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
