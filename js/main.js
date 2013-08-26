/*
Copyright © 2013 Adobe Systems Incorporated.

Licensed under the Apache License, Version 2.0 (the “License”);
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an “AS IS” BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/*jslint browser: true */
/*global jQuery */
if (jQuery) {
    (function ($) {
        "use strict";
        $(document).ready(function () {
            // initialize the megamenu
            $('.megamenu').accessibleMegaMenu();
            
            // hack so that the megamenu doesn't show flash of css animation after the page loads.
            setTimeout(function () {
                $('body').removeClass('init');
            }, 500);
        });
    }(jQuery));
}
