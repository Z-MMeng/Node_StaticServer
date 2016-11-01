//上下文
//情况1：作为对象的方法里使用this，指向对象
var pet = {
	words:"...";
	speak: function(){
		console.log(this.words) ;
		console.log(this === pet); //true,这里的this确实指向的是pet
	}
}
pet.speak();

//情况2：函数内部使用this，指向全局对象
function pet(words){
	this.words = words;

	console.log(this.words);
	console.log(this); //这里的this指向的是global对象（也可以理解为window对象）
	console.log(this === global); //true
}
pet("...");

//情况3：构造函数里使用this，指向新构建的对象
function pet(words){
	this.words = words;
	this.speak =function(){
		console.log(this.words);
		console.log(this);//这里的this指向的是cat对象
	}
}
var cat = new pet('miao');
cat.speak();



/*上下文：this通常指向所在执行函数的拥有者，this只能在函数内部使用。
对于上下文this的执行对象，需要根据当前的运行环境来定，