import React, { useState, useEffect } from 'react';
/**Components */
import Switcher from 'components/Switcher';
/**Utils */
import { themes } from 'utils/const';
/** Global State */
import { changeTheme } from 'store/globalStore';
import { useStore } from 'store/storeProvider';

const Footer = () => {
    const { state, dispatch } = useStore();
    useEffect(() => {
            dispatch(changeTheme(state.theme || themes.lightTheme));
    }, [state.theme, dispatch]);
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
                    CHANGE THEME
                </span>
            </div>
        </div>
    );
};

export default Footer;
