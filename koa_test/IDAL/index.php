<?php
	header('Content-Type: text/html; charset=utf-8');
	insertCount();
	
	function insertCount(){
		$obj = (object) [];
		$con=connect();
		$count=selectCount()+1;
		$result = mysql_query("update finger set count = '".$count."' where id=1");
		if(!$result )
		{
		    $obj->stats=-1;
		    $obj->msg='无法更新数据';
		}
		mysql_close($con);
		$obj->stats=1;
		$obj->count=$count;
		echo json_encode($obj);
	}
	function selectCount(){
		$result = mysql_query("SELECT count FROM finger");
		$data=mysql_fetch_assoc($result);
		if(!($data)){
			return 0;
		}
		return $data['count'];
	}
	function connect(){
		$con = mysql_connect("localhost","root","zhang123456789");
		if (!$con)
	  	{
		  die('Could not connect: ' . mysql_error());
	  	}
	  	mysql_select_db("finger", $con);
	  	return $con;
	}
?>