//引入模块
var student = require('./student');
var teacher = require('./teacher');

//当前模块
function add(teacherName,students){
	teacher.add(teacherName);

	students.forEach(function(item,index){
		student.add(item);
	})
}

exports.add = add;
