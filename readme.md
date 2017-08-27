## Getting started

First download and install
[GraphicsMagick](http://www.graphicsmagick.org/) or [ImageMagick](http://www.imagemagick.org/)

then 

> yarn add


## Usage

``` js
const generatorAvatar = require("../dist/index");
let inputs  = ['a.jpg', 'b.jpg', 'c.jpg',...];
generatorAvatar.draw(inputs,'*.png')
```