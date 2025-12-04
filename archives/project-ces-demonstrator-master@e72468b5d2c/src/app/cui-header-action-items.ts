/*
 * Add new menu items according to (see API): https://primeng.org/tieredmenu#api.tieredmenu.interfaces.MenuItem
 *
 * To remove the header action items completely, simply assign an empty array to CuiHeaderActionItems:
 * export const CuiHeaderActionItems: MenuItem[] = [];
 */

import { MenuItem } from 'primeng/api';
import { CuiThemeService } from './cui/cui-theme/cui-theme.service';

/**
 * Header action items for the application header.
 *
 * These items represent actions available in the header of the application.
 * They include toggling the theme mode, accessing help resources, and signing out.
 */
export const CuiHeaderActionItems: MenuItem[] = [
  {
    label: 'Toggle mode',
    title: 'Toggle mode',
    icon: 'cui-icon-dark-mode-toggle',
    id: 'toggleMode',
    command: (ev): void => {
      const ts = new CuiThemeService;
      ts.toggleMode();
    }
  },
  {
    icon: 'cui-icon-help',
    label: 'Help',
    title: 'Help',
    items: [
      {
        label: 'Documentation',
      },
      {
        label: 'Safety advice',
      },
      {
        label: 'Imprint',
      },
    ],
  },
  {
    label: 'Sign out',
    title: 'Sign out',
    icon: 'cui-icon-sign-out',
  }
];
  