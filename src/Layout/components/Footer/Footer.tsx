import React, { useState, useEffect } from 'react';
/**Components */
import Switcher from 'components/Switcher';
/**Utils */
import { themes } from 'utils/const';
/** Global State */
import { changeTheme } from 'store/globalSlider';
import { useStore } from 'store/storeProvider';

const Footer = () => {
    const { dispatch } = useStore();
    useEffect(() => {
        dispatch(changeTheme(themes.lightTheme));
    }, [dispatch]);
    const [checked, setChecked] = useState(false);

    const toggleTheme = () => {
        if (checked) {
            dispatch(changeTheme(themes.lightTheme))
        } else {
            dispatch(changeTheme(themes.darkTheme))
        }
        setChecked(!checked);
    };
    return (
        <div className="layout__footer">
            <div className="layout__footer-theme-selector">
                <Switcher onChange={toggleTheme} checked={checked} switcherName="theme-switcher" />
                <span>
                    CAMBIAR TEMA
                </span>
            </div>
        </div>
    );
};

export default Footer;
