import React from 'react';
/**Libraries */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
/**Components */
import Button from 'components/Button';
/**Styles */
import './productCard.scss';

type ProductCardProps = {
    image_url: string;
    stock: number;
    productName: string;
    price: number;
    productDescription: string;
    favorite: string;
    onSelected: (e: React.MouseEvent) => void;
    toggleFavorite: (e: React.MouseEvent) => void;
};

const ProductCard = ({
    image_url,
    stock,
    productName,
    price,
    productDescription,
    favorite,
    onSelected,
    toggleFavorite,
}: ProductCardProps) => {

    const favoriteClass = classNames('productCard__favorite', { "productCard__favorite--red": favorite === "1" });
    const addProductClass = classNames('productCard__button', { "productCard__button--disabled": stock === 0 });

    return (
        <div className="productCard productCard__wrapper">
            <div className="productCard__header">
                <img className="productCard__image" src={image_url} alt={productName} />
                <span className={favoriteClass} onClick={toggleFavorite} data-testid="heart-icon">
                    <FontAwesomeIcon icon="heart" />
                </span>
            </div>
            <div className="productCard__content">
                <div className="productCard__title">
                    <span>{productName}</span>
                    <span>{price}$</span>
                </div>
                <div className="productCard__description" title={productDescription}>{productDescription}</div>
                <div className="productCard__footer">
                    <span>{stock} left</span>
                    <Button className={addProductClass} onClick={onSelected} disabled={stock === 0}>
                        <FontAwesomeIcon icon="plus" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
