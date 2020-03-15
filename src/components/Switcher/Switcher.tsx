import React, { ChangeEvent } from 'react';
/**Libraries */
/**Components */

/**Styles */
import './switcher.scss';

type SwitcherProps = {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
    checked: boolean,
    switcherName: string
}

const Switcher = ({ onChange, checked, switcherName }: SwitcherProps) => {
    return (
        <div className="switcher switcher__wrapper">
            <label aria-label={switcherName} className="switcher__switch" htmlFor={switcherName}>
                <input
                    type="checkbox"
                    id={switcherName}
                    onChange={onChange}
                    checked={checked}
                    data-testid="switcher__input__checkbox-test"
                />
                <div className="switcher__slider switcher__round"></div>
            </label>
        </div>
    );
};

export default Switcher;
