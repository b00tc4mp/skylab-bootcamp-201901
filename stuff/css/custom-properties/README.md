# CSS Custom Porperties

Also known as '**CSS variables**' are custom classes that you can define.

[You can read here how it works ->](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)

[And here too ->](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)

[Here you can see the browser support ->](https://caniuse.com/#feat=css-variables)

## How to:

### **Definition**

You can declare a Custom Property (from now on 'CP') by using the syntax ```--```:

```
:root { --primaryColor: #de0000; }

.light-theme { --primaryColor: #ddd; }
```

By using the ```:root``` pseudo-class selector you can place variables **globally**. If you instead want to create them locally (scoped) you can place them inside a regular selector class definition ('.light-theme').

### **Use**

To use a CP you must use the ```var()``` function:

```
:root { --primaryColor: tomato; }

.light-theme { --primaryColor: plum; }

body { background-color: var(--primaryColor); }
```

Note that in this case body would have the tomato color on its background (because **--primaryColor** was defined in the ```:root``` 'scope') but if a class ```light-theme``` were applied to the body its background would become plum (due to specifity).

### **Extra, Extra**

CP can be defined without units:

```
:root { --spacing: 16; }
```

By doing this, you can now use ```--spacing``` as much as you want, **but there are certain restrictions**:

This **WONT** work:

```
.content {
  padding: var(--spacing) px; // This will break your compile, for sure ;(
}
```

This **WIL** work:
```
.content {
  padding: calc(var(--spacing) * 1px); // This will be 16px
}
```

---

**New challenger, JS!**

You can play with CP and JavaScript (Will see live examples of it :P )

```
getComputedStyle(element).getPropertyValue("--my-var");

// Or if inline
element.style.getPropertyValue("--my-var");
```

