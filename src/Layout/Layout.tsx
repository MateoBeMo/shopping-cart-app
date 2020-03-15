import React from 'react';
/**Components */
import Header from './components/Header';
import Footer from './components/Footer';
/**Styles*/
import './layout.scss';


type LayoutProps = { children: React.ReactNode };

const Layout = ({ children }: LayoutProps) => {
    return (
        <main className="layout">
            <Header />
            <div className="layout__container">
                <div className="layout__content">{children}</div>
            </div>
            <Footer />
        </main>
    );
};

export default Layout;
