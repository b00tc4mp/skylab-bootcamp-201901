const Epub = require("epub-gen");
const option = {
    title: "Alice's Adventures in Wonderland", // *Required, title of the book.
    author: "Lewis Carroll", // *Required, name of the author.
    publisher: "Macmillan & Co.", // optional
    cover: "https://images.pexels.com/photos/1934259/pexels-photo-1934259.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", // Url or File path, both ok.
    content: [
        {
            title: "About the author", // Optional
            author: "John Doe", // Optional
            data: "<h2>Charles Lutwidge Dodgson</h2>"
            +"<div lang=\"en\">Better known by the pen name Lewis Carroll...</div>" // pass html string
        },
        {
            title: "Down the Rabbit Hole",
            data: "<p>Alice was beginning to get very tired.12345..</p>"
        },
    ]
}
new Epub(option, "C:/Users/Usuario/Documents/collab/path.epub")