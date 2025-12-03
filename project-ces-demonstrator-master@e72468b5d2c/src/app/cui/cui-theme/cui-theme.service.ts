import { Injectable } from '@angular/core';

/**
 * Service for managing theme modes (dark/light) in the application.
 *
 * The `CuiThemeService` handles toggling between dark and light modes by setting
 * the 'data-theme' attribute on the HTML tag.
 */
@Injectable({
  providedIn: 'root'
})
export class CuiThemeService {

  /** Attribute name for the theme mode. */
  modeAttr = 'data-theme';

  /**
   * Toggles the theme mode between 'dark' and 'light'.
   *
   * This method sets the 'data-theme' attribute of the HTML tag to 'dark' or 'light'
   * to switch between the dark and the light mode.
   */
  toggleMode() {
    const html = document.documentElement;
    switch (html.getAttribute(this.modeAttr)) {

      case 'dark':
        html.setAttribute(this.modeAttr, 'light');
        break;

      default:
      case 'light':
        html.setAttribute(this.modeAttr, 'dark');
        break;
    }
  }
}
