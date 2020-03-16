import React, { useState, useEffect, useRef, useCallback } from 'react';
import ProductCard from 'components/ProductCard';
import Skeleton from 'components/ProductCard/Skeleton';
import Switcher from 'components/Switcher';
import { pageLimit } from 'utils/const';
import { getAllProducts, toogleFavoriteProduct, getFavoriteProducts } from 'services/product.service';
import { ProductModel } from 'models/product.model';
import '../../homePage.scss';

const useGetProducts = (pageNumber: number, favoriteChecked: boolean, resfreshProducts: boolean) => {
    const [products, setProducts] = useState<ProductModel[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        setError(false);
        const makeRequest = async () => {
            try {
                const res = favoriteChecked ? await getFavoriteProducts(pageNumber) : await getAllProducts(pageNumber);
                setProducts(prevProducts => prevProducts.concat(res.data));
                setHasMore(res.data.length > 0);
                setLoading(false);
            } catch {
                setError(true);
            }
        };
        setTimeout(() => {
            makeRequest();
        }, 500);
    }, [pageNumber, favoriteChecked, resfreshProducts]);

    return { loading, error, hasMore, products, setProducts };
};

type ProductListProps = {
    handleSelected: (product: ProductModel) => void;
    resfreshProducts: boolean;
};

const ProductList = ({ handleSelected, resfreshProducts }: ProductListProps) => {
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [favoriteChecked, setFavoriteChecked] = useState(false);
    const { loading, error, hasMore, products, setProducts } = useGetProducts(
        pageNumber,
        favoriteChecked,
        resfreshProducts,
    );
    const skeletonArray = new Array(20);
    skeletonArray.fill('');

    const resetProducts = useCallback(() => {
        setProducts([]);
        setPageNumber(1);
    }, [setProducts]);

    useEffect(() => {
        resetProducts();
    }, [resfreshProducts, resetProducts]);

    const observer = useRef<IntersectionObserver>();
    const lastProductRef = useCallback(
        node => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting && products.length >= pageLimit && hasMore) {
                    setPageNumber(prevPageNumber => prevPageNumber + 1);
                }
            });
            if (node) {
                observer.current.observe(node);
            }
        },
        [loading, hasMore, products.length],
    );

    const handleFilterByFavorite = async () => {
        setFavoriteChecked(!favoriteChecked);
        resetProducts();
    };

    const handleToogleFavorite = async (product: ProductModel) => {
        product.favorite = product.favorite === '1' ? '0' : '1';
        await toogleFavoriteProduct(product);
        setProducts(prevProducts => [...prevProducts]);
    };

    if (error) {
        return <div className="productList__wrapper">Something went wrong</div>;
    }
    return (
        <div className="productList__wrapper">
            <div className="productList__filter">
                <Switcher
                    onChange={handleFilterByFavorite}
                    checked={favoriteChecked}
                    switcherName="favorite-switcher"
                />
                <span>Filter By Favourite Products</span>
            </div>
            <div className="productList__products">
                {Array.isArray(products) &&
                    products.map((product, index) => {
                        return (
                            <div key={product.id} ref={products.length === index + 1 ? lastProductRef : undefined}>
                                <ProductCard
                                    {...product}
                                    onSelected={() => handleSelected(product)}
                                    toggleFavorite={() => handleToogleFavorite(product)}
                                />
                            </div>
                        );
                    })}
                {loading &&
                    skeletonArray.map((s, index) => {
                        return <Skeleton key={index} />;
                    })}
            </div>
        </div>
    );
};

export default ProductList;
