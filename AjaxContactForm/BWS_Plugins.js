/* BWS LiveBackground */

(function($){
	var defaults = {
		container: null,
		direction: 'down',
		color: '#000000'
	};

	function liveBackground(canvas, options) {
		var _this = this;
		_this.$canvas = $(canvas);

		if (! _this.$canvas.is('canvas')) {
			return;
		}

		_this.settings = $.extend({}, defaults, options);

		if (['up', 'down'].indexOf(_this.settings.direction) == -1) {
			_this.settings.direction = defaults.direction;
		}

		_this.$container = _this.$canvas.closest(_this.settings.container);

		if (! _this.$container.length) {
			return;
		}

		_this.ctx = _this.$canvas.get(0).getContext('2d');
		_this.circles = [];

		$(window).on('resize init', function() {
			_this.resize();
		}).trigger('init');

		for (var x = 0; x < _this.width * 0.5; x++) {
			var c = new Circle(_this);
			_this.circles.push(c);
		}

		_this.animate();
	}

	liveBackground.prototype.resize = function() {
		var _this = this;

		_this.width = _this.$container.innerWidth();
		_this.height = _this.$container.innerHeight();
		_this.$canvas.prop('width', _this.width);
		_this.$canvas.prop('height', _this.height);
	};

	liveBackground.prototype.animate = function() {
		var _this = this;

		_this.ctx.clearRect(0, 0, _this.width, _this.height);

		for (var i in _this.circles) {
			_this.circles[i].draw();
		}

		requestAnimationFrame(function() {
			_this.animate();
		});
	};

	function Circle(_this) {
		var _self = this;

		(function() {
			_self.pos = {};
			init();
		})();

		function init() {
			_self.pos.x = Math.random() * _this.width;
			_self.pos.y = (_this.settings.direction == 'down') ? _this.height + Math.random() * 100 : Math.random() * -100;
			_self.alpha = 0.1 + Math.random() * 0.3;
			_self.scale = 0.1 + Math.random() * 0.3;
			_self.velocity = Math.random();
		}

		this.draw = function() {
			if (_self.alpha <= 0) {
				init();
			}

			if (_this.settings.direction == 'down') {
				_self.pos.y -= _self.velocity;
			} else {
				_self.pos.y += _self.velocity;
			}

			_self.alpha -= 0.0005;
			_this.ctx.beginPath();
			_this.ctx.arc(_self.pos.x, _self.pos.y, _self.scale * 10, 0, 2 * Math.PI, false);
			_this.ctx.fillStyle = _this.settings.color;
			_this.ctx.globalAlpha = _self.alpha;
			_this.ctx.fill();
		};
	}

	var methods = {
		init : function(options) {
			return this.each(function() {
				new liveBackground(this, options);
			});
		}
	};

	$.fn.BWS_LiveBackground = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || ! method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('There is no method with name ' +  method);
		}
	};
})(jQuery);

/* BWS CustomSelect */

(function($) {
	var settings = {
		listMaxHeight: 360,
		onChange: null
	};

	function customSelect($this, options) {
		var _this = this;
		_this.$self = $this;
		_this.config = $.extend({}, settings, options);
		_this.$dropdown = $('<div/>', {
			'class'	: 'custom-select'
		}).on('click', function() {
			_this.$dropdown.toggleClass('open', (! _this.$dropdown.is('.open')));
		}).on('customSelect.open', function() {
			if (!_this.$dropdown.is('.open')) {
				_this.$dropdown.trigger('click');
			}
		}).on('customSelect.close', function() {
			if (_this.$dropdown.is('.open')) {
				_this.$dropdown.trigger('click');
			}
		});
		_this.$button = $('<button/>', {
			'class'			: 'custom-select__button',
			'type'			: 'button',
			'html'			: _this.$self.find('option:selected').html()
		});
		_this.$list = this.renderList();

		_this.$self.addClass('custom-select__origin');
		_this.$dropdown.insertAfter(_this.$self);
		_this.$button.appendTo(_this.$dropdown);
		_this.$list.appendTo(_this.$dropdown);
		_this.$self.appendTo(_this.$dropdown);

		$(document).on('click', function(e) {
			if ($(e.target).closest(_this.$dropdown).length) {
				return;
			}

			_this.$dropdown.trigger('customSelect.close');
			e.stopPropagation();
		});
	}

	customSelect.prototype.renderList = function() {
		var _this = this,
			$list =  $('<ul/>', {
				'class' : 'custom-select__list'
			});

		$list.css('max-height', (_this.$self.data('list-height') || _this.config.listMaxHeight));

		_this.$self.find('option').each(function() {
			var $option = $(this),
				$item = $('<li/>', {
					'class'	: 'custom-select__item' + ($option.is(':selected') ? ' custom-select__item--selected' : ''),
					'html'	: $option.html()
				}).on('click', function() {
					_this.selectItem($item, $option);
				});
			$item.appendTo($list);
		});

		return $list;
	};

	customSelect.prototype.selectItem = function($item, $option) {
		var _this = this;
		$currentItem = _this.$list.children('.custom-select__item--selected');

		$currentItem.removeClass('custom-select__item--selected');

		$item.addClass('custom-select__item--selected');
		$option.prop('selected', true);
		_this.$button.html($item.html());
		if (!_this.$list.is(':empty') && $item[0] != $currentItem[0] && _this.config.onChange && $.isFunction(_this.config.onChange)) {
			_this.config.onChange($item.html(), $item);
		}
	};

	customSelect.prototype.update = function() {
		var _this = this;

		_this.$newList = _this.renderList();
		_this.$list.replaceWith(_this.$newList);
		_this.reset();
	};

	customSelect.prototype.reset = function() {
		var _this = this;

		this.selectItem(_this.$list.children(':first'), _this.$self.children(':first'));
	};

	var methods = {
		init: function(options) {
			return this.each(function() {
				if (!$(this).is('select')) {
					return;
				}
				this.fn = new customSelect($(this), options);
			});
		},
		update: function() {
			return this.each(function() {
				this.fn.update();
			});
		},
		reset: function() {
			return this.each(function() {
				this.fn.reset();
			});
		}
	};

	$.fn.BWS_CustomSelect = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || ! method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('There is no method with name ' +  method);
		}
	};
})(jQuery);

(function($) {
	var notices = {
		0: 'Empty',
		1: 'Very Weak',
		2: 'Weak',
		3: 'Better',
		4: 'Medium',
		5: 'Strong',
	};

	var defaults = {
		notice : notices[0],
		match  : {
			minimum 	: false,
			uppercase 	: false,
			lowercase 	: false,
			numbers 	: false,
			symbols 	: false
		},
		score : 0
	};

	function passwordStrength($this) {
		var _this = this,
			$self = this.self = $this;

		$self.on('input paste change focus init', function(e) {
			var password = $self.val(),
				data = {};

			_this.match = $.extend({}, defaults.match);
			_this.score = defaults.score;

			/* Lowercase */
			if (password != password.toUpperCase()) {
				_this.match.lowercase = true;
				_this.score++;
			}

			/* Uppercase */
			if (password != password.toLowerCase()) {
				_this.match.uppercase = true;
				_this.score++;
			}

			/* Numbers */
			if (password.match(/[0-9]/)) {
				_this.match.numbers = true;
				_this.score++;
			}

			/* Symbols */
			if (password.match(/[ !№"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/)) {
				_this.match.symbols = true;
				_this.score++;
			}

			/* 8 symbols */
			if (password.length > 7) {
				_this.match.minimum = true;
				_this.score++;
			}

			_this.notice = notices[_this.score];

			data = {
				notice 	: _this.notice,
				match 	: _this.match,
				score 	: _this.score
			}

			$self.data('passwordStrength', data);

			if (e.type != 'init') {
				$self.trigger('getPasswordStrength', data);
			}

		}).trigger('init');
	}

	var methods = {
		init: function(options) {
			return this.each(function() {
				if (!$(this).is('input')) {
					return;
				}
				this.fn = new passwordStrength($(this));
			});
		},
		getScore: function() {
			var data = $(this).data('passwordStrength');
			return data.score;
		},
		getMatch: function() {
			var data = $(this).data('passwordStrength');
			return data.match;
		},
		getNotice: function() {
			var data = $(this).data('passwordStrength');
			return data.notice;
		}
	}

	$.fn.BWS_PasswordStrength = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || ! method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('There is no method with name ' +  method);
		}
	}
})(jQuery);

(function($) {
	var methods = {
		init: function(options) {
			return this.each(function() {
				var $form = $(this),
					$inputs = $form.find('input.form__input--pwd_check[type="password"]');

				if ($inputs.length == 2) {
					var $input1 = $inputs.eq(0),
						$input2 = $inputs.eq(1);

					$inputs.on('input change paste init', function() {
						if ($input1.val() != "") {
							$input1.addClass('input_pwd input_pwd--match');
						} else {
							$input1.removeClass('input_pwd input_pwd--match');
						}

						if ($input2.val() != "") {
							if ($input1.val() != "") {
								if( $input1.val() != $input2.val() ) {
									$input2.addClass('input_pwd input_pwd--mismatch');
								} else {
									$input2
										.removeClass('input_pwd input_pwd--mismatch')
										.addClass('input_pwd input_pwd--match');
								}
							} else {
								$input2.removeClass('input_pwd input_pwd--match input_pwd--mismatch');
							}
						} else {
							$input2.removeClass('input_pwd input_pwd--match input_pwd--mismatch');
						}
					}).trigger('init');
				}
			});
		}
	}

	$.fn.BWS_MatchPasswords = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || ! method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('There is no method with name ' +  method);
		}
	}
})(jQuery);