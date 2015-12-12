var message = function() {

	var defaults = {
		development_mode : true, // set to false when messages are no needed anymore
		height : 200
	}

	if (!defaults.development_mode) { return }

	var _construct = function() {

		var msg_window_css = {
			'position' : 'fixed',
			'left' : '0px',
			'bottom' : '-' + defaults.height + 'px',
			'height' : defaults.height + 'px',
			'width' : '100%',
			'z-index' : '999999',
			'background' : 'rgba(0, 0, 0, .6)',
			'color' : '#fff',
			'font-family ' : '"Andale Mono", "Lucida Sans Typewriter", "Lucida Sans Unicode", "Lucida Console", monaco, monospace',
			'font-size ' : '12px',
			'padding' : '5px 10px',
			'box-sizing' : 'border-box',
			'transition' : 'bottom .2s ease-out',
			'overflow' : 'auto'
		}
		var msg_close_css = {
			'width' : '32px',
			'height' : '32px',
			'background' : 'rgba(0, 0, 0, .6)',
			'position' : 'absolute',
			'top' : '10px',
			'right' : '6px',
			'text-align' : 'center',
			'line-height' : '32px',
			'font-size' : '30px',
			'cursor' : 'pointer'
		}
		var msg_drag_css = {
			'position' : 'absolute',
			'top' : '0',
			'left' : '0',
			'width' : '100%',
			'height' : '4px',
			'background' : 'rgba(0, 0, 0, .5)',
			'cursor' : 'row-resize'
		}
		var msg_item_css = {
			'opacity' : '0',
			'line-height' : '20px',
			'padding' : '3px 0',
			'text-shadow' : '0 -1px 0 #000',
			'border-bottom' : 'dotted rgba(255, 255, 255, .25) 1px',
			'transition' : 'opacity .5s ease-out',
		}

		msg_item_style = [];
		for ( var i in msg_item_css ) {
			msg_item_style.push(i + ':' + msg_item_css[i]);
		}
		msg_item_style = msg_item_style.join('; ');
		var items_css_rules = document.createTextNode('.message-output-block{'+msg_item_style+'}');

		var items_css = document.createElement('style');
			items_css.setAttribute('type', 'text/css');
			items_css.appendChild(items_css_rules)
			document.querySelector('head').appendChild(items_css);

		var msg_window = document.createElement('div');
			msg_window_style = [];
			for ( var i in msg_window_css ) {
				msg_window_style.push(i + ':' + msg_window_css[i]);
			}
			msg_window_style = msg_window_style.join('; ');
			msg_window.setAttribute('style', msg_window_style);

		var msg_close = document.createElement('div');
			msg_close.innerHTML = '&times;'
				msg_close_style = [];
				for ( var i in msg_close_css ) {
					msg_close_style.push(i + ':' + msg_close_css[i]);
				}
				msg_close_style = msg_close_style.join('; ');
			msg_close.setAttribute('style', msg_close_style);
			msg_close.onclick = function() {
				_destruct();
			}

		var msg_drag = document.createElement('div');
			msg_drag.setAttribute('id', 'message-output-dragbar');
				msg_drag_style = [];
				for ( var i in msg_drag_css ) {
					msg_drag_style.push(i + ':' + msg_drag_css[i]);
				}
				msg_drag_style = msg_drag_style.join('; ');
			msg_drag.setAttribute('style', msg_drag_style);

		msg_window.appendChild(msg_close);
		msg_window.appendChild(msg_drag);
		document.body.appendChild(msg_window);

		function dragbar(e) {
			var h = window.innerHeight - e.pageY;
			var eh = h;

			if ( h < 80 ) {	eh = 80; }
			if ( h > (window.innerHeight - 20)) { eh = window.innerHeight - 20; }
			msg_window.style.height = eh + 'px';
		}

			msg_drag.onmousedown = function(e) {
				e.preventDefault();
				document.body.addEventListener("mousemove", dragbar);
			}

			document.body.onmouseup = function(e) {
				document.body.removeEventListener("mousemove", dragbar);
			}

		return msg_window;
	}

	function _destruct() {
		message_window.style.bottom = '-'+message_window.offsetHeight+'px';
	}

	var message_blocks = [];
	var send = function(message) {
		message_window.style.bottom = '0px';

		message_current = ( typeof(message_current) === 'undefined' ) ? parseInt(0) : message_current;
		message_blocks[message_current] = document.createElement('div');
		message_blocks[message_current].setAttribute('class', 'message-output-block');


		function clean_msg(input) {
			var d = document.createElement('div');
			d.innerHTML = input;
			return d.innerHTML;
		}
		message_blocks[message_current].innerHTML = clean_msg(message);
		message_window.insertBefore(message_blocks[message_current], message_window.firstChild);

		var el = message_blocks[message_current];
		setTimeout(function() {
			el.style.opacity = 1;
		}, 50);

		message_current++;
	}

	window.message_window = (typeof(message_window) === 'object') ? message_window : _construct();

	var messages = Array.prototype.slice.call(arguments);
	if ( messages.length ) {
		for( var i=0; i<messages.length; i++) {
			if ( document.querySelectorAll('.message-output-block').length == 0 ) {
				setTimeout(send, 100, messages[i]);
			} else {
				send( messages[i] );
			}

		}
	}

	return messages;

}
