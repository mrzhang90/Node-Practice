$(function(){
	$('#btnSubmit').on('click',function(ev){
		ev.preventDefault();
		$.ajax({
			url:'/insert',
			data:{username:$('#username').val()},
			success:function(data){
				if(data.status=='ok'){
					alert($('#username').val()+data.msg);
				}
			}
		});
	})
})