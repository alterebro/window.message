## window.message
#### Simple replacement for window.alert <br />Live demo here: http://alterebro.github.io/window.message/

Simple window.alert() replacement both as jQuery plugin and Vanilla JavaScript implementation.
`console.log` and `window.alert` alternative to display messages in case you want them to be seen within the document.

## Usage instructions

### Plain JavaScript implementation

- Include the window.message file 

```html
<script type="text/javascript" src="window-message.js"></script>
```

- Set the defaults

```javascript
var defaults = {
	development_mode : true, // set to false when messages are no needed anymore
	height : 200 // initial height of the output message window
}
```

- Start sending messages to the output message window

```javascript
message('Hello world');
// outputs : Hello world
```

- You can send multiple messages by passing more arguments to the function

```javascript
message(100, 'Hello world', 'Lorem ipsum dolor sit amet', true);
/* output : 
---
100
Hello world
Lorem ipsum dolor sit amet
true	
---
*/	
```

---

### jQuery Plugin

- Include both the jquery library and the window.message plugin file:

```html
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script type="text/javascript" src="jquery.window-message.min.js"></script>
```

- Start sending messages as follows:

```javascript
$.Window.message('Hello world');
// outputs : Hello world
```

---

