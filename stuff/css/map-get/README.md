# SASS Map/-Get property!

[You can read here how it works ->](https://webdesign.tutsplus.com/tutorials/an-introduction-to-sass-maps-usage-and-examples--cms-22184)

You can define a variable (map) like so:

```
$variable: (
  custom-name1: value,
  custom-name2: value2,
  custom-name3: value3,
  ...
);
```

**Once you define your properties lets use them**

To put the property/value inside our sass from our "array of properties" you can do it like:

```
.sass-class {
  property: map-get($variable, custom-name1);
}

.sass-class2 {
  property: map-get($variable, custom-name2);
}

.sass-class3 {
  property: map-get($variable, custom-name3);
}
```

**Easy, right? Let's make a better use case:**

Imagine you have a complete style guide but you don't want to create each style for each of your application pages...  ok, lets create a mixin that will let us style all of our application fonts:

---

### First we will create all of our variables(maps):

```
$red: #de0000;

$typevars: (
  main-title-36-size: 36px,
  main-title-36-weight: 600,
  main-title-36-color: $red,

  main-subtitle-27-size: 27px,
  main-subtitle-27-weight: 500,
  main-subtitle-27-bold: 700,

  section-title-17-size: 17px,
  section-title-17-weight: 600,

  section-15-size: 15px,
  section-15-weight: 400,
  section-15-weight-bold: 700,

  link-25-size: 25px,
  link-25-weight: 400,
);
```

---

### Second we will create a mixin in order to iterate over the values inside our map:

```
@mixin typography($key) {
  $size: map-get($typevars, #{$key}-size);
  $weight: map-get($typevars, #{$key}-weight);
  $weight-bold: map-get($typevars, #{$key}-weight-bold);

  font-size: #{$size};
  font-weight: #{$weight};

  @if $weight-bold {
    & b,
    & strong {
      font-weight: #{$weight-bold};
    }
  }
};

```
#### Lets get inside of it:

### We will use **$key** as a value to look for the styles we want to use on each case.
```
@mixin typography($key) {
```
---


### Here we just define what we are going to search for inside our map (**$typevars**) with our **$key**:
```
  $size: map-get($typevars, #{$key}-size);
  $weight: map-get($typevars, #{$key}-weight);
  $weight-bold: map-get($typevars, #{$key}-weight-bold);
  $color: map-get($typevars, #{$key}-color);
```
---


### We set the properties we will use with the values from the variable already defined:
```
  font-size: #{$size};
  font-weight: #{$weight};
  color: #{$color};
```
---


### Finally we will look for the case if we have any font bold property and if so, we will create the proper font-weight satement:
```
  @if $weight-bold {
    & b,
    & strong {
      font-weight: #{$weight-bold}; // Remember to interpolate, otherwise it won't work!
    }
  }
```
---


## **Ok, cool but, how the h\*\*\* I use that?**

You just simply invoke the mixin like this:

```
@include typography(main-title-36);
```
---

## Other use cases:

### **Case 1**

Old implementation using variables:
```
$base-font-color: #666;
$base-font-family: Arial, Helvetica, Sans-Serif;
$base-font-size: 16px;
$base-line-height: 1.4;
```

The same using map-get:
```
// _config.scss
$font: (
  color: #666,
  family: (Arial, Helvetica),
  size: 16px,
  line-height: 1.4
);

// _presets.scss
body {
  color: map-get($font, color);
  font-family: map-get($font, family);
  font-size: map-get($font, size);
  line-height: map-get($font, line-height);
}
```
---

### **Case 2**
In this case you'll see 2 definitions in one property, you'll access them by taking the one you want like: **nth($colors, 2)**
```
// _m-buttons.scss
$buttons: (
  error: (#d82d2d, #666),
  success: (#52bf4a, #fff),
  warning: (#c23435, #fff)
);

.m-button {
  display: inline-block;
  padding: .5em;
  background: #ccc;
  color: #666;

  @each $name, $colors in $buttons {
    $bgcolor: nth($colors, 1);
    $fontcolor: nth($colors, 2);

    &--#{$name} {
      background-color: $bgcolor;
      color: $fontcolor;
    }
  }
}
```