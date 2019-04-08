#Grid

## grid-template-columns and rows

html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: gray;
}

.container {
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-rows: 2fr 4fr 2fr;
  grid-template-columns: 1fr 4fr 1fr;
  grid-template-areas: "header header header" "left-section main right-section" "footer footer footer";

  or

  grid: 2fr 4fr 2fr / 1fr 4fr 1fr; 
  grid-template-areas: "header header header" "left-section main right-section" "footer footer footer";
  
  or

  grid: 
    "header header header" 2fr
    "left-section main right-section" 4fr
    "footer footer footer" 2fr
    / 1fr 4fr 1fr;
}

.header {
  background-color: #BAE1FF;
  grid-area: header;
}

.left-section {
  background-color: #C7E6BD;
  grid-area: left-section;
  }

.main {
  background-color: #FEFFBB;
  grid-area: main;
}

.right-section {
  background-color: #FFB3BA;
  grid-area: right-section;
}

.footer {
  background-color: #FFDFB9;
  grid-area: footer;
}

## grid-template 

    grid-template: 
      "header header header" 2fr 
      "left-section main right-section" 5fr 
      "footer footer footer" 1fr
      / 1fr 4fr 1fr;

## grid-gap

    grid-row-gap: 10px;
    grid-column-gap: 5px;
    
    or
    
    grid-gap: 10px 5px;

## align, justify and place-items

default: stretch

to align text -> text-align: center;

## grid-auto-flow

default row; column / dense -> next available spot

##layout container, but position defined by children

.container {
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-rows: 2fr 4fr 2fr;
  grid-template-columns: 1fr 4fr 1fr;
}

.header {
  background-color: #BAE1FF;
  grid-column-start: span 3;
  grid-row-start: 1;
}

.left-section {
  background-color: #C7E6BD;
  grid-column-start: 1;
  grid-row-start: 2;
  }

.main {
  background-color: #FEFFBB;
  grid-column: 2 / 3
  grid-row-start: 2;
}

.right-section {
  background-color: #FFB3BA;
  grid-column-start: 3;
  grid-row-start: 2;
}

.footer {
  background-color: #FFDFB9;
  grid-column-start: span 3;
  grid-row-start: 3;
}

## main content
  <h1>Skylab</h1>
  <img alt="main__img" src="http://www.brickshelf.com/gallery/iPaloosa/Skylab/lddscreenshot5.png" width="300px"/>
  <p>Skylab was the first United States space station launched and operated by NASA,[2] and occupied for about 24 weeks between May 1973 and February 1974 – the only space station the U.S. has operated exclusively. In 1979 it fell back to Earth amid huge worldwide media attention. Skylab included a workshop, a solar observatory, and other systems necessary for crew survival and scientific experiments.</p>

.main {
  background-color: #FEFFBB;
  grid-area: main;
  text-align: center;
  display: grid;
  place-items: center center; 
  grid-template-columns: repeat(3, 1fr);
  grid-auto-flow: column;
}

.main > h1 {
  width: 100px;
  justify-self: center;
}

.main > img {
  width: 100px;
}

.main > p {
  width: 170px;
}
