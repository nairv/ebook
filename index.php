	<?php

	?>
<html>
<head>
<style type='text/css'>
 /*thead { text-align: left; }*/
 td { padding: 5px; border-bottom: 1px solid black; border-collapse: collapse; border-spacing: 1px; }
 table { border: 2px solid black; }
 #filler{
 	position:absolute;
    left:0;
    right:0;
    height:50px;
    width:100%;
    background:white;
    color:white;
 }
 #container{
 	position:relative;
 	top:50px;
    height:800px;
    width:100%;
    background:white;
 }
 #tablecontainer{
 	position:relative;
 	float:left;
 	width:50%;
 }
 #querycontainer{
 	position:relative;
 	float:right;
 	width:50%;
 }
 #querybox{
 	float:right;
 	position:relative;
 	width:100%;
 	height:100px;
 	top:200px;
 	border: 2px solid black;
 }
 p{
 	font: bold 20px Georgia, serif;
 }
</style>
<title>Row indexes</title>

<script type = "text/javascript" src="http://code.jquery.com/jquery-latest.js"></script>

<script type="text/javascript" src="jsset.js"></script>
</head>
<body>
	

	<div id = "filler">
	</div>
	<div id="container">
	<script type="text/javascript">
	var a = 0;
	$.post('dbtest.php', a);
	var b = <?php echo json_encode($collist); ?>;
	console.log(b);
	</script>
	<script type = "text/javascript" src="populate.js"></script>
		<div id="tablecontainer">
		<?php
			require_once('dbtest.php');

			//echo $pk;

			//Close the connection
			mysql_close($link);
		?>
		</div>
		<div id="querycontainer">
			<div id="querybox">
			<div>
		</div>
	</div>
</body>
</html>