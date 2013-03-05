	<?php
	require_once('dbtest.php');

	//echo $pk;

	//Close the connection
	mysql_close($link);
	?>
<html>
<head>
<style type='text/css'>
 /*thead { text-align: left; }*/
 td { padding: 5px; border-bottom: 1px solid black; border-collapse: collapse; border-spacing: 1px; }
 table { border: 2px solid black; }
</style>
<title>Row indexes</title>

<script type = "text/javascript" src="http://code.jquery.com/jquery-latest.js"></script>
<script type="text/javascript">
var a = 0;
$.post('dbtest.php', a);
var b = <?php echo json_encode($collist); ?>;
console.log(b);
</script>
<script type="text/javascript" src="jsset.js"></script>
</head>
<body>
<script type = "text/javascript" src="populate.js"></script>


<div><br><br>
</div>

<div> <br> </div>

<!--<table id="my_table" border="1">
	<thead><td value="FirstColumn">First Column</td><td value ="SecondColumn">Second Column</td></thead>
<tbody>
    <tr><td name="first" >(1,1)</td><td >(1,2)</td></tr>
    <tr><td name = "second" >(2,1)</td><td >(2,2)</td></tr>
</tbody> 
</table>-->

<div> <br> <br> <br></div>
</body>
</html>