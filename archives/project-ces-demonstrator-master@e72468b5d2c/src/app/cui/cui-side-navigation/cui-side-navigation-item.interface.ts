/**
 * Interface representing an item in the side navigation menu.
 * 
 * A `SideNavigationItem` can have various properties to define its label, route,
 * status, child items, and other visual and behavioral attributes.
 */
export interface SideNavigationItem {

    /**
    * The label to display for the navigation item.
    * @type {string}
    */
    label: string,

    /**
     * The route or URL the navigation item points to.
     * This property can be an Angular route, an anchor/fragment, or a URL string.
     * @type {any}
     */
    route: any,

    /**
    * Indicates if this navigation item is the current item.
    * @type {boolean}
    */
    current?: boolean,

    /**
    * The status of the navigation item, can be 'disabled' or 'hidden'.
    * @type {'disabled' | 'hidden'}
    */
    status?: 'disabled' | 'hidden',

    /**
    * The child navigation items of this item.
    * @type {SideNavigationItem[]}
    */
    children?: SideNavigationItem[],

    /**
    * Indicates if the children of this item are open/visible.
    * @type {boolean}
    */
    childrenOpen?: boolean,

    /**
    * The icon to display for the navigation item.
    * @type {string}
    */
    icon?: string,


    /**
    * Additional CSS classes to apply to the navigation item.
    * @type {string}
    */
    class?: string,

    /**
    * Tooltip text to display for the navigation item.
    * @type {string}
    */
    tooltip?: string,

    /**
    * The target where the route should open, e.g., '_blank' for a new tab.
    * @type {string}
    */
    target?: string,


    /**
    * Alternative text for the navigation item, typically used for accessibility.
    * @type {string}
    */
    alt?: string
}