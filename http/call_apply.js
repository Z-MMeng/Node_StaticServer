//call_apply,更改上下文
var pet = {
	words: "...";
	speak: function(say){
		console.log(say+''+this.words);
	}
}
pet.speak('speak'); //speak ...

var dog = {
	words: "wang";
}
pet.speak.call(dog,'speak'); //speak wang