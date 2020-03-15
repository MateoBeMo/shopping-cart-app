import { library } from '@fortawesome/fontawesome-svg-core';

import { faChevronDown, faAd, faHeart, faPlus, faMinus, faChevronLeft, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export const registerIcons = (): void => {
    // add font awesome icons to the library in order to import just used icons
    library.add(faChevronDown, faAd, faHeart, faPlus, faMinus, faChevronLeft, faShoppingCart);
};
