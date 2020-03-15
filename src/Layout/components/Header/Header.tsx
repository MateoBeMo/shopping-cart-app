import React from 'react';
/**Libraries */
import { useHistory, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
/** Components */
import Button from 'components/Button';
/**Utils */
import { removeUserStorage } from 'utils/localStorageHelpers';
/** Global State */
import { useStore } from 'store/storeProvider';

const Header = () => {
    const { state } = useStore();
    const history = useHistory();
    const location = useLocation();

    const isInProductList = location.pathname === '/home';

    const cartButtonClass = classNames('layout__header-cart', {
        'layout__header-cart--hidden': !isInProductList,
    });
    const goBackButtonClass = classNames('layout__go-back', {
        'layout__go-back--hidden': isInProductList,
    });

    return (
        <div className="layout__header">
            <Button
                className={goBackButtonClass}
                onClick={() => {
                    removeUserStorage();
                    history.push('/home');
                }}
            >
                {/* <span>PRODUCT LIST</span> */}
                <FontAwesomeIcon icon="chevron-left" />
            </Button>
            <div className="layout__header-title">
                {isInProductList ? <span>PRODUCT LIST</span> : <span>CART</span>}
            </div>
            <div
                className={cartButtonClass}
                onClick={() => {
                    removeUserStorage();
                    history.push('/cart');
                }}
            >
                <FontAwesomeIcon icon="shopping-cart" />
                {state.cartProducts.length > 0 && <span className="layout__badget">{state.cartProducts.length} </span>}
            </div>
        </div>
    );
};

export default Header;
