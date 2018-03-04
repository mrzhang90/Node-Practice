var ajax={
	error:function(){
		error_msg('服务器异常')
	}
}
function alert(msg){
	layer.open({
        content: msg,
        skin: 'msg',
        time:2
    });
}
function error_msg(msg){
	layer.open({
	  content: msg
	  ,style: 'background-color:#fff; color:red; border:none;' //自定风格
	  ,btn: '我知道了'
	});
}