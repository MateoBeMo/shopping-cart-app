import React from 'react';
/**Libraries */
/**Components */
/**Styles */
import '../productCard.scss';

const Skeleton = () => {
    return (
        <div className="productCard productCard__wrapper skeleton__wrapper">
            <div className="productCard__header skeleton__header">
                <div className="skeleton__line" />
            </div>
            <div className="productCard__content">
                <div className="productCard__title">
                    <div className="skeleton__line" />
                </div>
                <div className="productCard__description">
                    <div className="skeleton__line" />
                </div>
                <div className="productCard__footer">
                    <div className="skeleton__line" />
                </div>
            </div>
        </div>
    );
};

export default Skeleton;
