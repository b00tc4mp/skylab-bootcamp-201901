
# Description

* feature/blog-semantics
* locate files in staff/<name>/blog
* create only the semantic html (no css, no js)
* files structure must as following (inside blog folder):
```/blog
    |- index.html // [1]
    |- entries.html // [2]
    \- entry.html // [3]

[1] this is the home page (it lists the brief - preview - of the last 4 entries)
[2] this is list of all entries (it lists the brief -preview - of the last 10 entries and should have pagination for the older entries)
[3] this is the full entry, showing the title and a full content.
```