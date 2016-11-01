var klass = require('./class');

//输出班级
klass.add('Scott',['白富美','高富帅']);

/*输出学校
往里面传入klasses，是一个老师和学生的数组，这样，学校的每个班级都能输出了，就创建了一个学校
exports.add = function(klasses){
	klasses.forEach(function(item,index){
		var _klass = item;
		var teacherName = item.teacherName;
		var students = item.students;

		klass.add(teacherName,students);
})	
}
*/