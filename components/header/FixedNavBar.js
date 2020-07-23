export default function FixedNavBar () {
	;(function($) {
			"use strict";

		var nav_offset_top = $('header').height() * 0.7; 
		/*-------------------------------------------------------------------------------
		Navbar 
		-------------------------------------------------------------------------------*/

		function navbarFixed(){
				const mainMenuArea = $('.main-menu-area');
				if ( $(mainMenuArea).length ){ 
						$(window).scroll(function() {
								var scroll = $(window).scrollTop();   
								if (scroll >= nav_offset_top ) {
										$(mainMenuArea).addClass("navbar_fixed");
								} else {
										$(mainMenuArea).removeClass("navbar_fixed");
								}
						});
				};
				
		};
		navbarFixed();
	})(jQuery)
}
