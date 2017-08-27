const generatorAvatar = require("../dist/index");
let inputs  = ['a.jpg', 'b.jpg', 'c.jpg', 'd.jpg', 'e.jpg', 'f.jpg', 'g.jpg', 'h.jpg', 'i.jpg'];
generatorAvatar.draw(inputs,'o.png')
// var fs = require('fs')
// , gm = require('gm')

// // resize and remove EXIF profile data
// gm('a.jpg')
// .resize(240, 240)
// .write('./aaaa.png', function (err) {
//   err? console.log(err):console.log("done");
// });