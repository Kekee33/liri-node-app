'use strict'

var foo = {
    square : function(){
        console.log(this);
    }
}
var cat = {
    noise: 'meow'
}
//3 ways to use this (4 rules when using 'this')
//default
//foo.square();
//new
//new foo.square();
//.call, .bind, .apply
//foo.square.call(cat);

