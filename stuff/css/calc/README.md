# CSS Calc()

[You can read here how it works ->](https://developer.mozilla.org/en-US/docs/Web/CSS/calc)

You can use calc(); in your flexible/responsive layouts by using it like so:

```
.your-class {
  width: calc(100vh - 35px);
}
```

This class will set the height of your element to 100 vertical height minus 35px. The operation is automatic.

Be aware, if you want to use it with sass variables you **have to** use interpolation, otherwise the calc will fail.

**#### The Bad:**
```
$spacing: 100px;

.my-class {
  width: calc(100% - $spacing); // This would compile the line literally: width: calc(100% - $spacing); and the calculation would fail
}
```

**#### The Good:**

```
$spacing: 100px;

.my-class {
  width: calc(100% - #{$spacing}); // To interpolate your variables encapsulate them with '#{ }'
}
```

[You can read more about interpolation in sass here ->](https://sass-lang.com/documentation/file.SASS_REFERENCE.html#interpolation_)