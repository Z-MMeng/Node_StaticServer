//作用域
var globalVariable = "this is globalVariable";

function globalFunction() {
	var localVariable = "this is local variable";

	console.log('visit golbal/local variable');
	console.log(globalVariable);//局部作用域可以调用全局作用域
	console.log(localVariable);

	globalVariable = 'this is changed variable';
	console.log(globalVariable);

	function localFunction(){
		var innerLocalVariable="this is inner local variable";

		console.log(globalVariable);
		console.log(localVariable);
		console.log(innerLocalVariable);
	}
	localFunction();
}

globalFunction();

console.log(localVariable); //报错
console.log(innerLocalVariable);//报错

//局部可以调用全局，但全局不能调用局部。

