# Responsive Accessible Mega Menu
=========================

A demonstration of how to implement a keyboard and screen reader accessible mega menu as a jQuery plugin. It is modeled after the mega menu on [adobe.com](http://adobe.com/) but has been simplified for use by others. A brief explanation of our interaction design choices can be found in a blog post at [Mega menu accessibility on adobe.com](http://blogs.adobe.com/accessibility/2013/05/adobe-com.html).

Content for the links and text within the mega menu comes from the [Web Content Accessibility Guidelines (WCAG) 2.0](http://www.w3.org/TR/WCAG/).

Please see the responsive modifications below for an explanation of how this forked code deviates from Adobe's version.

## Responsive Modifications

This version has been modified to convert the navigation to an accordion menu at mobile. Additional arguments have been added to the constructor, including:

* navToggle - The id selector of the element triggering the mobile menu toggle
* navId - the id selector of the navigation
* mobileBreakpoint - The breakpoint at which the navigation toggles to mobile.

The mobileBreakpoint argument has been added as a conditional in several of the  handler functions to determine whether the code should execute. It is also tested on a window.bind() call to remove any open menu states/class selectors should the user resize their browser from a mobile width to a desktop width.

Lastly, the Javascript file has been revised to ensure it passes ES6 Linting.

Please see the [demo.html](demo.html) for the complete example.

## Keyboard Accessibility

The accessible mega menu supports keyboard interaction modeled after the behavior described in the [WAI-ARIA Menu or Menu bar (widget) design pattern](http://www.w3.org/TR/wai-aria-practices/#menu), however we also try to respect users' general expectations for the behavior of links in a global navigation. To this end, the accessible mega menu implementation permits tab focus on each of the six top-level menu items. When one of the menu items has focus, pressing the Enter key, Spacebar or Down arrow will open the submenu panel, and pressing the Left or Right arrow key will shift focus to the adjacent menu item. Links within the submenu panels are included in the tab order when the panel is open. They can also be navigated with the arrow keys or by typing the first character in the link name, which speeds up keyboard navigation considerably. Pressing the Escape key closes the submenu and restores focus to the parent menu item.

## Screen Reader Accessibility

The accessible mega menu models its use of WAI-ARIA Roles, States, and Properties after those described in the [WAI-ARIA Menu or Menu bar (widget) design pattern](http://www.w3.org/TR/wai-aria-practices/#menu) with some notable exceptions, so that it behaves better with screen reader user expectations for global navigation. We don't use `role="menu"` for the menu container and `role="menuitem"` for each of the links therein, because if we do, assistive technology will no longer interpret the links as links, but instead, as menu items, and the links in our global navigation will no longer show up when a screen reader user executes a shortcut command to bring up a list of links in the page.

We also want to maintain the semantic structure of the submenu panels in our mega menu; our links are organized into lists and separated by headings. Omitting `role="menu"` and `role="menuitem"` for the global navigation seems the safer way to go.

## Usage

### HTML

The HTML structure for the mega menu is a `nav` element, or any other container element, containing a list. Each list item contains a link which is followed by a `div` or any other container element which will serve as the pop up panel.
The panel can contain any html content; in the following example, each panel contains three lists of links. You can explicitly define groups within the panel, between which a user can navigate quickly using the left and right arrow keys; in the following example, the CSS class `.sub-nav-group` identifies a navigable group.

```html
<a id="nav-toggle" href="#primary-nav">MENU</a>
<nav id="primary-nav">
    <ul class="nav-menu">
        <li class="nav-item"><a href="?tv">Home</a></li>
        <li class="nav-item">
            <a href="?movie">Movies</a>
            <i class="icon"></i>
            <div class="sub-nav">
                <ul class="sub-nav-group">
                    <li><a href="?movie&genre=0">Action &amp; Adventure</a></li>
                    <li><a href="?movie&genre=2">Children &amp; Family</a></li>
                    <li>&#8230;</li>
                </ul>
                <ul class="sub-nav-group">
                    <li><a href="?movie&genre=7">Dramas</a></li>
                    <li><a href="?movie&genre=9">Foreign</a></li>
                    <li>&#8230;</li>
                </ul>
                <ul class="sub-nav-group">
                    <li><a href="?movie&genre=14">Musicals</a></li>
                    <li><a href="?movie&genre=15">Romance</a></li>
                    <li>&#8230;</li>
                </ul>
            </div>
        </li>
        <li class="nav-item">
            <a href="?tv">TV Shows</a>
            <i class="icon"></i>
            <div class="sub-nav">
                <ul class="sub-nav-group">
                    <li><a href="?tv&genre=20">Classic TV</a></li>
                    <li><a href="?tv&genre=21">Crime TV</a></li>
                    <li>&#8230;</li>
                </ul>
                <ul class="sub-nav-group">
                    <li><a href="?tv&genre=27">Reality TV</a></li>
                    <li><a href="?tv&genre=30">TV Action</a></li>
                    <li>&#8230;</li>
                </ul>
                <ul class="sub-nav-group">
                    <li><a href="?tv&genre=33">TV Dramas</a></li>
                    <li><a href="?tv&genre=34">TV Horror</a></li>
                    <li>&#8230;</li>
                </ul>
            </div>
        </li>
        <li class="nav-item"><a href="?music">Music</a></li>
        <li class="nav-item"><a href="?video-games">Video Games</a>
          <i class="icon"></i>
          <div class="sub-nav">
              <ul class="sub-nav-group">
                  <li><a href="?video-games&genre=20">Role Playing</a></li>
                  <li><a href="?video-games&genre=21">Strategy</a></li>
                  <li>&#8230;</li>
              </ul>
              <ul class="sub-nav-group">
                  <li><a href="?video-games&genre=27">FPS</a></li>
                  <li><a href="?video-games&genre=30">Sports</a></li>
                  <li>&#8230;</li>
              </ul>
              <ul class="sub-nav-group">
                  <li><a href="?video-games&genre=33">Puzzle</a></li>
                  <li><a href="?video-games&genre=34">Multiplayer</a></li>
                  <li>&#8230;</li>
              </ul>
          </div>
        </li>
    </ul>
</nav>
```

By default, accessibleMegaMenu uses the the following CSS classes to define the top-level navigation items, panels, groups within the panels, and the hover, focus, and open states. It also defines a prefix for unique id strings, which are required to indicate the relationship of a top-level navigation item to the panel it controls.

```js
    defaults = {
      /* Button that toggles navigation at mobile */
      navToggle: '#nav-toggle',

      /* Id of navigation */
      navId: '#primary-nav',

      /* mobile breakpoint in pixels that determines when the menu goes to mobile */
      mobileBreakpoint: '900',
      /* prefix for generated unique id attributes, which are required
         to indicate aria-owns, aria-controls and aria-labelledby */
      uuidPrefix: 'accessible-megamenu',

      /* css class used to define the megamenu styling */
      menuClass: 'nav-menu',

      /* css class for a top-level navigation item in the megamenu */
      topNavItemClass: 'nav-item',

      /* css class for a top-level icon in the megamenu (displayed at mobile) */
      topNavIconClass: '.icon',

      /* css class for a megamenu panel */
      panelClass: 'sub-nav',

      /* css class for a group of items within a megamenu panel */
      panelGroupClass: 'sub-nav-group',

      /* css class for the hover state */
      hoverClass: 'hover',

      /* css class for the focus state */
      focusClass: 'focus',

      /* css class for the open state */
      openClass: 'open'
    }
```

You can optionally override the defaults to use the CSS classes you may have already defined for your mega menu.

### JavaScript

Be sure to include jQuery and the jquery-accessibleMegaMenu.js plugin script.

```html
    <script src="//code.jquery.com/jquery-1.10.1.min.js"></script>
    <script src="js/jquery-accessibleMegaMenu.js"></script>
```

The following initializes the first nav element in the document as an accessibleMegaMenu, with optional CSS class overrides.

```js
    $("nav:first").accessibleMegaMenu({
        /* prefix for generated unique id attributes, which are required
           to indicate aria-owns, aria-controls and aria-labelledby */
        uuidPrefix: "accessible-megamenu",

        /* css class used to define the megamenu styling */
        menuClass: "nav-menu",

        /* css class for a top-level navigation item in the megamenu */
        topNavItemClass: "nav-item",

        /* css class for a megamenu panel */
        panelClass: "sub-nav",

        /* css class for a group of items within a megamenu panel */
        panelGroupClass: "sub-nav-group",

        /* css class for the hover state */
        hoverClass: "hover",

        /* css class for the focus state */
        focusClass: "focus",

        /* css class for the open state */
        openClass: "open"
    });
```
### CSS

AccessibleMegaMenu handles the showing and hiding of panels by adding or removing a CSS class. No inline styles are added to hide elements or create animation between states.

Following is some rudimentary CSS for our example which enables the showing/hiding of and the layout of lists panels in the mega menu.

```css
    /* mega menu list */
    .nav-menu {
        display: block;
        position: relative;
        list-style: none;
        margin: 0;
        padding: 0;
        z-index: 15;
    }

    /* a top level navigation item in the mega menu */
    .nav-item {
        list-style: none;
        display: inline-block;
        padding: 0;
        margin: 0;
    }

    /* first descendant link within a top level navigation item */
    .nav-item > a {
        position: relative;
        display: inline-block;
        padding: 0.5em 1em;
        margin: 0 0 -1px 0;
        border: 1px solid transparent;
    }

    /* focus/open states of first descendant link within a top level
       navigation item */
    .nav-item > a:focus,
    .nav-item > a.open {
        border: 1px solid #dedede;
    }

    /* open state of first descendant link within a top level
       navigation item */
    .nav-item > a.open {
        background-color: #fff;
        border-bottom: none;
        z-index: 1;
    }

    /* sub-navigation panel */
    .sub-nav {
        position: absolute;
        display: none;
        top: 2.2em;
        margin-top: -1px;
        padding: 0.5em 1em;
        border: 1px solid #dedede;
        background-color: #fff;
    }

    /* sub-navigation panel open state */
    .sub-nav.open {
        display: block;
    }

    /* list of items within sub-navigation panel */
    .sub-nav ul {
        display: inline-block;
        vertical-align: top;
        margin: 0 1em 0 0;
        padding: 0;
    }

    /* list item within sub-navigation panel */
    .sub-nav li {
        display: block;
        list-style-type: none;
        margin: 0;
        padding: 0;
    }   
```

Putting it all together, here is the completed example:

```html
<!doctype html>
<html lang="">
  <head>
    <meta charset="utf-8">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>accessible menu</title>

    <link rel="stylesheet" href="css/megamenu.css">
    <link rel="stylesheet" href="css/style.css">

  </head>
  <body>

    <a id="nav-toggle" href="#primary-nav">MENU</a>
    <nav id="primary-nav">
        <ul class="nav-menu">
            <li class="nav-item"><a href="?tv">Home</a></li>
            <li class="nav-item">
                <a href="?movie">Movies</a>
                <i class="icon"></i>
                <div class="sub-nav">
                    <ul class="sub-nav-group">
                        <li><a href="?movie&genre=0">Action &amp; Adventure</a></li>
                        <li><a href="?movie&genre=2">Children &amp; Family</a></li>
                        <li>&#8230;</li>
                    </ul>
                    <ul class="sub-nav-group">
                        <li><a href="?movie&genre=7">Dramas</a></li>
                        <li><a href="?movie&genre=9">Foreign</a></li>
                        <li>&#8230;</li>
                    </ul>
                    <ul class="sub-nav-group">
                        <li><a href="?movie&genre=14">Musicals</a></li>
                        <li><a href="?movie&genre=15">Romance</a></li>
                        <li>&#8230;</li>
                    </ul>
                </div>
            </li>
            <li class="nav-item">
                <a href="?tv">TV Shows</a>
                <i class="icon"></i>
                <div class="sub-nav">
                    <ul class="sub-nav-group">
                        <li><a href="?tv&genre=20">Classic TV</a></li>
                        <li><a href="?tv&genre=21">Crime TV</a></li>
                        <li>&#8230;</li>
                    </ul>
                    <ul class="sub-nav-group">
                        <li><a href="?tv&genre=27">Reality TV</a></li>
                        <li><a href="?tv&genre=30">TV Action</a></li>
                        <li>&#8230;</li>
                    </ul>
                    <ul class="sub-nav-group">
                        <li><a href="?tv&genre=33">TV Dramas</a></li>
                        <li><a href="?tv&genre=34">TV Horror</a></li>
                        <li>&#8230;</li>
                    </ul>
                </div>
            </li>
            <li class="nav-item"><a href="?music">Music</a></li>
            <li class="nav-item"><a href="?video-games">Video Games</a>
              <i class="icon"></i>
              <div class="sub-nav">
                  <ul class="sub-nav-group">
                      <li><a href="?video-games&genre=20">Role Playing</a></li>
                      <li><a href="?video-games&genre=21">Strategy</a></li>
                      <li>&#8230;</li>
                  </ul>
                  <ul class="sub-nav-group">
                      <li><a href="?video-games&genre=27">FPS</a></li>
                      <li><a href="?video-games&genre=30">Sports</a></li>
                      <li>&#8230;</li>
                  </ul>
                  <ul class="sub-nav-group">
                      <li><a href="?video-games&genre=33">Puzzle</a></li>
                      <li><a href="?video-games&genre=34">Multiplayer</a></li>
                      <li>&#8230;</li>
                  </ul>
              </div>
            </li>
        </ul>
    </nav>

    <script src="third-party/jquery/jquery-1.10.1.min.js"></script>
    <script src="js/jquery-accessibleMegaMenu.js"></script>
    <script src="js/main.js"></script>
    <script>
        $("nav:first").accessibleMegaMenu({

            /* Button that toggles navigation at mobile */
            navToggle: '#nav-toggle',

            /* Id of navigation */
            navId: '#primary-nav',

            /* mobile breakpoint in pixels that determines when the menu goes to mobile */
            mobileBreakpoint: '900',
            /* prefix for generated unique id attributes, which are required
               to indicate aria-owns, aria-controls and aria-labelledby */
            uuidPrefix: 'accessible-megamenu',

            /* css class used to define the megamenu styling */
            menuClass: 'nav-menu',

            /* css class for a top-level navigation item in the megamenu */
            topNavItemClass: 'nav-item',

            /* css class for a top-level icon in the megamenu (displayed at mobile) */
            topNavIconClass: '.icon',

            /* css class for a megamenu panel */
            panelClass: 'sub-nav',

            /* css class for a group of items within a megamenu panel */
            panelGroupClass: 'sub-nav-group',

            /* css class for the hover state */
            hoverClass: 'hover',

            /* css class for the focus state */
            focusClass: 'focus',

            /* css class for the open state */
            openClass: 'open'
        });
    </script>

  </body>
</html>

```    
