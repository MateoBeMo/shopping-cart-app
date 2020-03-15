import React, { useState, useEffect } from 'react';
/**Libraries */
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
/**Styles */
import './dropdown.scss';
/**Utils */
import flags from './utils/LanguageSelectorModel';
const Dropdown = ({ options, value, onClick }) => {
    const intl = useIntl();
    const [isDisplayed, setDisplayed] = useState(false);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        const handleDropdownTitle = () => {
            switch (value) {
                case 'es':
                    setSelected(
                        intl.formatMessage({
                            id: 'app.components.Dropdown.Language.Spanish',
                        }),
                    );
                    break;
                case 'en':
                case 'en-GB':
                case 'en-US':
                    setSelected(
                        intl.formatMessage({
                            id: 'app.components.Dropdown.Language.English',
                        }),
                    );
                    break;
                default:
                    setSelected('');
                    break;
            }
        };
        handleDropdownTitle();
    }, [value, intl]);

    const toggleDropdown = () => {
        setDisplayed(!isDisplayed);
    };

    return (
        <div className="dropdown__wrapper">
            <div className="dropDown__button__wrapper">
                <div
                    className="dropdown__button"
                    onClick={() => toggleDropdown()}
                    data-testid="dropdown__selected-test"
                >
                    <img src={value && flags[value]} alt={`${value}-flag`} />
                    <span>{selected}</span>
                </div>
                <span className="dropdown__arrow" style={{ pointerEvents: 'none' }}>
                    <FontAwesomeIcon icon="chevron-down" />
                </span>
            </div>
            {isDisplayed && (
                <ul className="dropdown__list">
                    {options
                        ? options.map((option, index) => {
                              const flagUrl = flags[option.value];
                              return (
                                  <li key={index} onClick={() => onClick(option.value)}>
                                      <img src={flagUrl} alt={`${option.name}-flag`} />
                                      {intl.formatMessage({ id: option.name })}
                                  </li>
                              );
                          })
                        : intl.formatMessage({
                              id: 'app.components.Dropdown.List.EmptyTitle',
                          })}
                </ul>
            )}
        </div>
    );
};

Dropdown.propTypes = {
    options: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Dropdown;
