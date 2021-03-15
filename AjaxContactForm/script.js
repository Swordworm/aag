(function($){
	$(document).ready(function() {

		$( '.agreement-choose' ).on( 'click', function () {
			$( '.footer_lines-wrapper' ).css( 'display', 'none' );
		} );

		var isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)),
			bodyClass = isMobile ? 'touch' : 'no-touch';

		/* Setting body classes */
		$('body').addClass(bodyClass);

		/* Toggle class by clicking mobile menu button */
		$('.mobile-button').on('click', function() {
			$('.header__upper').toggleClass('mobile-menu-extended');
		});

		/* Close current and open new modal */
		$('.modal [data-open-modal]').on('click', function(e) {
			var $this = $(this),
				$currentModal = $this.closest('.modal'),
				$targetModal = $($this.attr('data-open-modal'));

			$currentModal.modal('hide');

			setTimeout(function() {
				$targetModal.modal('show');
			}, 500);

			e.preventDefault();
		});

		/* Vertical align modal */
		$('.modal.modal--align').on('show.bs.modal', function () {
			var $modal = $(this),
				$dialog = $modal.find('.modal-dialog');

			$dialog.css({
				'opacity' : 0
			});

			setTimeout(function() {
				$modal.trigger('verticalAlign.bs.modal');
			}, 200);
		}).on('hidden.bs.modal', function () {
			var $modal = $(this),
				$dialog = $modal.find('.modal-dialog');

			$dialog.css({
				'opacity' : 0
			});
		}).on('verticalAlign.bs.modal', function() {
			var $modal = $(this);
			setTimeout(function() {
				var $dialog = $modal.find('.modal-dialog'),
					dialogHeight = $dialog.height(),
					windowHeight = $(window).height(),
					dialogMargin = (windowHeight > dialogHeight) ? (windowHeight - dialogHeight) / 2 : 10;

				$dialog.css({
					'margin-top'		: dialogMargin + 'px',
					'margin-bottom'		: dialogMargin + 'px',
					'opacity'			: '1'
				});
			}, 1);
		});

		/* On clicking scroll down button on home page
		$('.scroll-down--steps .scroll-down__link').on('click', function(e) {
			var $inner = $('.header__upper'),
				innerHeight = $inner.innerHeight(),
				$sectionBrands = $('#section-brands'),
				sectionBrandsTop = $sectionBrands.offset().top;

			$('html, body').animate({
				scrollTop: sectionBrandsTop - innerHeight
			}, 1000);

			e.preventDefault();
		});*/

		/* On clicking scroll down button on step3 page */
		$('.scroll-down--plans .scroll-down__link').on('click', function(e) {
			var $scrollDown = $(this),
				$inner = $('.header__upper'),
				innerHeight = $inner.innerHeight(),
				$point = $scrollDown.next('.scroll-down__point'),
				pointTop = $point.offset().top;

			$('html, body').animate({
				scrollTop: pointTop - innerHeight
			}, 1000);

			e.preventDefault();
		});

		/* Live background in the home page
		$('#bg-subscribe').BWS_LiveBackground({
			container : '.section--subscribe',
			direction : 'down'
		});*/

		/* Live background in the contact us page
		$('#bg-contact-form').BWS_LiveBackground({
			container : '.form',
			direction : 'down'
		});*/

		/* Live background in the success payment page */
		$('#bg-payment-success').BWS_LiveBackground({
			container : '.content',
			direction : 'up',
			color     : '#2195f3'
		});

		/* Live background in the success youtube page */
		$('#bg-youtube-success').BWS_LiveBackground({
			container : '.area',
			direction : 'up',
			color     : '#2195f3'
		});

		/* Live background in the success crawler page */
		$('#bg-crawler-success').BWS_LiveBackground({
			container : '.area',
			direction : 'up',
			color     : '#2195f3'
		});

		/* Step 3 expanding plan advantages */
		$('.page--step-3 .plan .advantage__button-expand-list').on('click', function(e) {
			var $button = $(this),
				$xlink = $button.find('.advantage__xlink'),
				$container = $button.parent();

			$container.toggleClass('advantage--expanded');

			$xlink.attr('xlink:href', function() {
				if ($container.hasClass('advantage--expanded')) {
					return $(this).attr('xlink:href').replace('down', 'up');
				} else {
					return $(this).attr('xlink:href').replace('up', 'down');
				}
			});
		});

		/* Step 4 highlighting payment mode */
		$('.page--step-4 .payment').on('click', '.payment__label', function(e) {
			var $label = $(this),
				$item = $label.parent(),
				$list = $item.parent(),
				$items = $list.children();

			$items.removeClass('payment__item--active');
			$item.addClass('payment__item--active');
		});

		/* Step 4 FAQ accordion */
		$('.page--step-4 .faq').on('click', '.faq__link', function(e) {
			var $link = $(this),
				$item = $link.closest('.faq__item'),
				$content = $item.find('.faq__content'),
				$list = $item.closest('.faq__list'),
				$activeItem = $list.children('.faq__item--active'),
				$activeContent = $activeItem.find('.faq__content');

			if ($item.index() != $activeItem.index()) {
				$activeContent.slideUp(400, function() {
					$activeItem.removeClass('faq__item--highlight faq__item--active');
				});
			}

			$item.addClass('faq__item--highlight');

			$content.slideToggle(400, function() {
				if ( ! $item.hasClass('faq__item--active') ) {
					$item.addClass('faq__item--active');
				} else {
					$item.removeClass('faq__item--highlight faq__item--active');
				}

			});

			e.preventDefault();
		});

		/* On remove photo on the profile page */
		$('.area--edit-my-profile .photo .photo__remove').on('click', function() {
			var $container = $(this).closest('.photo'),
				$image = $container.find('.photo__image'),
				$input = $container.find('.photo__input');

				$input.val('');
				$image.remove();
				$container.removeClass('photo--selected');
		});

		/* On add photo on the profile page */
		$('.area--edit-my-profile .photo .photo__input').on('change', function() {
			var $input = $(this),
				$container = $input.closest('.photo'),
				$overlay = $container.find('.photo__overlay'),
				$image = $container.find('.photo__image');

			if (window.File && window.FileReader && window.FileList && window.Blob) {
				if ($input.val()) {
					var reader = new FileReader(),
						file = this.files[0],
						for_image = $(this).attr('data-file'),
						file_types = ['jpg', 'jpeg', 'png', 'tiff'],
						file_type = file.name.split('.').pop().toLowerCase();

					if (file_types.indexOf(file_type) == -1) {
						$input.val('');
						return;
					}

					reader.onload = function(event) {
						var image = new Image();
						image.src = event.target.result;
						image.className = 'photo__image';

						image.onload = function() {
							var width= 100,
								imgWidth = image.width,
								imgHeight = image.height,
								imgWidthNew = 100,
								imgHeightNew = 100,
								imgRatio = 0,
								imgCSS;

							if (image.height > image.width) {
								imgRatio = imgHeight / imgWidth;
								imgHeightNew = imgWidthNew * imgRatio;
								imgCSS = {
									'width'       : imgWidthNew,
									'height'      : imgHeightNew,
									'left'        : 'initial',
									'margin-top'  : (width - imgHeightNew) / 2,
									'margin-left' : 'initial'
								};
							} else {
								imgRatio = imgWidth / imgHeight;
								imgWidthNew = imgHeightNew * imgRatio;
								imgCSS = {
									'width'       : imgWidthNew,
									'height'      : imgHeightNew,
									'top'         : 'initial',
									'left'        : '50%',
									'margin-top'  : 'initial',
									'margin-left' :(width - imgWidthNew) / 2
								};
							}

							$image.remove();
							$(image)
								.css(imgCSS)
								.appendTo($overlay);
							$container.addClass('photo--selected');
						}
					}
					reader.readAsDataURL(file);
				}
			}
		});

		/* Customize selects */
		$('select[data-appearance="custom"]').BWS_CustomSelect();

		/* Reload my account highlighting plan */
		$('.page--my-account .plans').on('click', '.plan', function(e) {
			var $plan = $(this),
				$list = $plan.parent(),
				$plans = $list.children();


			$plans.removeClass('plan--active');
			$plan.addClass('plan--active');
		});

		/* Reload my account highlighting payment mode */
		$('.page--my-account .payment').on('click', '.payment__label', function(e) {
			var $label = $(this),
				$item = $label.parent(),
				$list = $item.parent(),
				$items = $list.children();

			$items.removeClass('payment__item--active');
			$item.addClass('payment__item--active');
		});

		/* Remove youtube video from Video to copyright */
		$('.page--my-account .area--register-youtube-video-2').on('click', '.video__remove', function(e) {
			var $button = $(this),
				$video = $button.closest('.video');

			$video.remove();
		});

		if ($.isFunction($.fn.uploadFile)) {
			/* Register copyright primary file uploader */
			$uploaderCopyrightPrimary = $('#copyright_uploader_primary');
			$uploaderCopyrightPrimary.uploadFile({
				url: 				'upload.php',
				multiple: 			false,
				autoSubmit: 		true,
				showDelete: 		true,
				showFileCounter: 	false,
				dragdropWidth:' 	100%',
				statusBarWidth: 	'100%',
				uploadStr: 			'SELECT FILE',
				dragDropStr: 		'<div class="ajax-upload-dragdrop-header"><div class="ajax-upload-dragdrop-title">Drag & Drop</div><span class="ajax-upload-dragdrop-sub-title">or</span></div><div class="ajax-upload-dragdrop-footer">Supported file types: .zip, .rar, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .pdf, .jpg, .png, .gif, .txt</div>',
				fileName: 			'file',
				acceptFiles: 		'application/zip,x-rar-compressed,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/pdf,image/jpg,image/jpeg,image/png,image/gif,text/plain',
				allowedTypes: 		"zip,rar,doc,docx,xls,xlsx,ppt,pptx,pdf,jpg,png,gif,txt", // Default is "*". Example: "jpg,png,gif",
				onSelect: function() {
					$uploaderCopyrightPrimary.stopUpload();
					$uploaderCopyrightPrimary.cancelAll();
					$uploaderCopyrightPrimary.reset();
				}
			});

			/* Register copyright secondary file uploader */
			$uploaderCopyrightSecondary = $('#copyright_uploader_secondary');
			$uploaderCopyrightSecondary.uploadFile({
				url: 				'upload.php',
				multiple: 			false,
				autoSubmit: 		true,
				showDelete: 		true,
				showFileCounter: 	false,
				dragdropWidth:' 	100%',
				statusBarWidth: 	'100%',
				uploadStr: 			'SELECT FILE',
				dragDropStr: 		'<div class="ajax-upload-dragdrop-header"><div class="ajax-upload-dragdrop-title">Drag & Drop</div><span class="ajax-upload-dragdrop-sub-title">or</span></div><div class="ajax-upload-dragdrop-footer">Supported file types: .zip, .rar, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .pdf, .jpg, .png, .gif, .txt</div>',
				fileName: 			'file',
				acceptFiles: 		'application/zip,x-rar-compressed,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/pdf,image/jpg,image/jpeg,image/png,image/gif,text/plain',
				allowedTypes: 		"zip,rar,doc,docx,xls,xlsx,ppt,pptx,pdf,jpg,png,gif,txt", // Default is "*". Example: "jpg,png,gif",
				onSelect: function() {
					$uploaderCopyrightSecondary.stopUpload();
					$uploaderCopyrightSecondary.cancelAll();
					$uploaderCopyrightSecondary.reset();
				}
			});

			/* Certified email file uploader */
			$uploaderCertifiedEmail = $('#certified_email_uploader');
			$uploaderCertifiedEmail.uploadFile({
				url: 				'upload.php',
				multiple: 			false,
				autoSubmit: 		true,
				showDelete: 		true,
				showFileCounter: 	false,
				dragdropWidth:' 	100%',
				statusBarWidth: 	'100%',
				uploadStr: 			'SELECT FILE',
				dragDropStr: 		'<div class="ajax-upload-dragdrop-header"><div class="ajax-upload-dragdrop-title">Drag & Drop</div><span class="ajax-upload-dragdrop-sub-title">or</span></div><div class="ajax-upload-dragdrop-footer">Supported file types: .zip, .rar, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .pdf, .jpg, .png, .gif, .txt</div>',
				fileName: 			'file',
				acceptFiles: 		'application/zip,x-rar-compressed,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/pdf,image/jpg,image/jpeg,image/png,image/gif,text/plain',
				allowedTypes: 		"zip,rar,doc,docx,xls,xlsx,ppt,pptx,pdf,jpg,png,gif,txt", // Default is "*". Example: "jpg,png,gif",
				onSelect: function() {
					$uploaderCertifiedEmail.stopUpload();
					$uploaderCertifiedEmail.cancelAll();
					$uploaderCertifiedEmail.reset();
				}
			});
		}

		/* Certified email file uploader */
		$('[data-toggle="tooltip"]').tooltip();

		$(window).on('scroll init', function() {
			var $window = $(this),
				wWidth = $window.width(),
				wHeight = $window.height(),
				wScrollTop = $window.scrollTop(),
				viewport = wScrollTop + wHeight;

			$('.header__upper').toggleClass('header__upper--scroll', wScrollTop > 0);

			/* Highlighting current step */
			var $steps = $('.steps[data-step]');

			if ($steps.length) {
				var currentStep = $steps.data('step'),
					stepsOffset = 280,
					stepsTop = $steps.offset().top,
					stepsViewport = stepsTop + stepsOffset;

				if (stepsViewport <= viewport) {
					$steps.addClass('steps--' + currentStep);
				}
			}

			/* Blocks animation in the about section of the home page */
			var $blocks = $('.section--about .block').not('.block--animated');

			$blocks.addClass('block--invisible');

			if ($blocks.length) {
				$blocks.each(function() {
					var $block = $(this),
						blockTop = $block.offset().top,
						blockHeight = $block.height(),
						blockViewport = ($window.width() > 768) ? blockTop + blockHeight : blockTop + blockHeight / 2;

					if (blockViewport <= viewport) {
						$block.removeClass('block--invisible');
						$block.filter('.block--odd').addClass('block--fade-in-right block--animated');
						$block.filter('.block--even').addClass('block--fade-in-left block--animated');
					}
				});
			}

			/* Blocks animation in the blog section of the home page */
			var $items = $('.section--blog .blog__item').not('.blog__item--animated');

			$items.addClass('blog__item--invisible');

			if ($items.length) {
				$items.each(function() {
					var $item = $(this),
						itemTop = $item.offset().top,
						itemHeight = $item.height(),
						itemViewport = ($window.width() > 768) ? itemTop + itemHeight : itemTop + itemHeight / 2;

					if (itemViewport <= viewport) {
						$item.removeClass('blog__item--invisible');
						$item.addClass('blog__item--fade-in-down blog__item--animated');
					}
				});
			}

			/* Blocks animation in the review section of the home page */
			var $reviews = $('.section--reviews .review__item').not('.review__item--animated');

			$reviews.addClass('review__item--invisible');

			if ($reviews.length) {
				$reviews.each(function() {
					var $reviewItem = $(this),
						reviewItemTop = $reviewItem.offset().top,
						reviewItemHeight = $reviewItem.height(),
						reviewItemViewport = ($window.width() > 768) ? reviewItemTop + reviewItemHeight : reviewItemTop + reviewItemHeight / 2;

					if (reviewItemViewport <= viewport) {
						$reviewItem.removeClass('review__item--invisible');
						$reviewItem.addClass('review__item--fade-in-down review__item--animated');
					}
				});
			}

			/* Blocks animation in the actions section of the home page */
			var $actions = $('.section--actions .actions__row').not('.actions__row--animated');

			$actions.addClass('actions__row--invisible');

			if ($actions.length) {
				$actions.each(function() {
					var $actionItem = $(this),
						actionItemTop = $actionItem.offset().top,
						actionItemHeight = $actionItem.height(),
						actionItemViewport = ($window.width() > 768) ? actionItemTop + actionItemHeight : actionItemTop + actionItemHeight / 2;

					if (actionItemViewport <= viewport) {
						$actionItem.removeClass('actions__row--invisible');
						$actionItem.addClass('actions__row--fade-in-left actions__row--animated');
					}
				});
			}

			/* Blocks animation in the news section of the home page */
			var $news = $('.section--news .news__row').not('.news__row--animated');

			$news.addClass('news__row--invisible');

			if ($news.length) {
				$news.each(function() {
					var $newsItem = $(this),
						newsItemTop = $newsItem.offset().top,
						newsItemHeight = $newsItem.height(),
						newsItemViewport = ($window.width() > 768) ? newsItemTop + newsItemHeight : newsItemTop + newsItemHeight / 2;

					if (newsItemViewport <= viewport) {
						$newsItem.removeClass('news__row--invisible');
						$newsItem.addClass('news__row--fade-in-down news__row--animated');
					}
				});
			}
		}).trigger('init');

		/* Popover password info */
		$('.form__input--popover.form__input--pwd_strength').each(function() {
			var $input = $(this),
				$popoverHtml = '\
					<div class="result result--0">Empty</div>\
					<table class="tbl">\
						<tbody>\
							<tr class="tbl__row">\
								<td class="tbl__indicator">\
									<span class="tbl__icon tbl__icon--minimum tbl__icon--false"></span>\
								</td>\
								<td class="tbl__title">Minimum 8 characters</td>\
							</tr>\
							<tr class="tbl__row">\
								<td class="tbl__indicator">\
									<span class="tbl__icon tbl__icon--uppercase tbl__icon--false"></span>\
								</td>\
								<td class="tbl__title">Uppercase letters</td>\
							</tr>\
							<tr class="tbl__row">\
								<td class="tbl__indicator">\
									<span class="tbl__icon tbl__icon--lowercase tbl__icon--false"></span>\
								</td>\
								<td class="tbl__title">Lowercase letters</td>\
							</tr>\
							<tr class="tbl__row">\
								<td class="tbl__indicator">\
									<span class="tbl__icon tbl__icon--numbers tbl__icon--false"></span>\
								</td>\
								<td class="tbl__title">Numbers</td>\
							</tr>\
							<tr class="tbl__row">\
								<td class="tbl__indicator">\
									<span class="tbl__icon tbl__icon--symbols tbl__icon--false"></span>\
								</td>\
								<td class="tbl__title">Special symbols</td>\
							</tr>\
						</tbody>\
					</table>',
				$popoverContent = $('<div/>',{
					'class' 	: 'section section--pwd_strength',
					'html' 		: $popoverHtml
				});

			$input.BWS_PasswordStrength();
			$input.on('getPasswordStrength', function(e, result) {
				var $result = $popoverContent.find('.result'),
					$table = $popoverContent.find('.tbl');

					$result
						.html(result.notice)
						.attr('class', function() {
							return 'result result--' + result.score;
						});

				for (param in result.match) {
					var $icon = $table.find('.tbl__icon--' + param);

					if (result.match[param] === true) {
						$icon
							.removeClass('tbl__icon--false')
							.addClass('tbl__icon--true');
					} else {
						$icon
							.removeClass('tbl__icon--true')
							.addClass('tbl__icon--false');
					}
				}
			});

			$input.popover({
				trigger 	: 'focus',
				placement 	: function() {
					var isHome = $('.page--home').length,
						pageWidth = (isHome) ? 1150 : 830;

					if ($(window).width() > pageWidth) {
						return 'right';
					} else {
						return 'bottom';
					}
				},
				template: 	'<div class="popover popover--pwd_strength" role="tooltip"><div class="arrow"></div><div class="popover-content"></div></div>',
				content: 	$popoverContent,
				html: 		true
			});
		});

		/* Display info when passwords do not match */
		$('form').BWS_MatchPasswords();

		$(window).on('resize', function() {
			$('[data-toggle="tooltip"][aria-describedby]').tooltip('hide');
		}).trigger('resize');

		if ( $( window ).width() <= '992' ) {
			$('#dropdownUserButton').on('click', function(e) {
				$('.user__menu').toggleClass('show');
				e.stopPropagation();
			});
		}

		/* Dropdown mobile submenu on hover */
		var link = '';
		$('body').on('click', 'a.link-has-child', function( e ) {
			e.preventDefault();
			if ( link !== $( this ).html() ) {
				link = ( $( this ).html() );
				e.stopPropagation();
				$('.dropdown-mobile-submenu').removeClass('show');
				$(this).next('.dropdown-mobile-submenu').addClass('show');
			} else {
				link = '';
				window.location = window.location.protocol + '//' + window.location.host + $( this ).attr( 'href' );
			}
		} );
		$('body').on('click', '.submenu-column', function( e ) {
			e.stopPropagation();
			$( '.submenu-items' ).removeClass( 'show' );
			$( this ).next( '.submenu-items' ).addClass( 'show' );
		} );

		$( document ).on( 'click', function() {
			$( '.dropdown-mobile-submenu.show' ).removeClass( 'show' );
			$( '.submenu-items.show' ).removeClass( 'show' );
		} );
		// Аякс запрос отправки формы на почту
		$("#my_form").submit(function(e){
			e.preventDefault();
			$.ajax({
				type: "POST",
				url: "mail.php",
				data: $("#my_form").serialize(),
				success: function(data) {
					alert('Email was sent');
				}
			});
		});
	});
})(jQuery);
