[Github nicopixel](https://github.com/nicopixel)


# Tips sass

## mixins 


```js
@function em($px,  $base: $base__font-size)
    @return ($px  /  $base) *  1em

=text($size: $base__font-size, $line: $base__line, $weight: $base__weight__text, $family: $text__family__text, $color: $color__light)
    font-size: +em($size)
    line-height: ($line/$size)
    font-family: $family
    color: $color
    font-weight: $weight


=background-opacity($color, $opacity: 0.3) 
    background: $color
    background: rgba($color, $opacity)
```


## variables file

```js
// BASE
$base__font-size: 15 
$base__line: 20 
$base__weight__text: 400 
$base__weight__heading1: 500 
$base__weight__heading2: 700 

// TEXT
@import url('https://fonts.googleapis.com/css?family=Montserrat:500,700|Open+Sans')
$text__family__header: 'Montserrat', sans-serif
$text__family__text: 'Open Sans', sans-serif

// COLORS
$color__green: #1DB954
$color__dark: #222326
$color__blue: #2D46B9
$color__light: #ffffff
```

## import from main file

```js
@import 'reset'
@import 'variables'
@import 'mixins'
@import 'components/search'
@import 'components/artists'
@import 'components/pagination'
```

