<?php
$user = "root";
$db_pass= "root";
$db_name = "employees";
$table_name = "employees";
$host = "localhost";
$pk;

$link = mysql_connect('localhost', 'root', 'root');
if (!$link) {
    die('Could not connect: ' . mysql_error());
}
//echo 'Connected successfully' . "<br>";

if (!mysql_select_db($db_name, $link)) {
    echo 'Could not select database';
    exit;
}

//Very very MySql specific code ... Bad ... !!!
$sql1 = " SHOW INDEX FROM employees.employees WHERE Key_name = 'PRIMARY' ";


//$sql    = "SELECT first_name FROM employees LIMIT 0,30";
$result = mysql_query($sql1, $link);
if (!$result) {
    echo "DB Error, could not query the database\n";
    echo 'MySQL Error: ' . mysql_error();
    exit;
}

while ($row = mysql_fetch_assoc($result)) {
    $pk = $row['Column_name'];
}
//echo $pk . "<br>";

mysql_free_result($result);

// Getting column headers
$result = mysql_query("SHOW COLUMNS FROM $db_name");
if (!$result) {
    echo 'Could not run query: ' . mysql_error();
    exit;
}

function mysql_fetch_col($res)
{
	while ($row = mysql_fetch_assoc($res)) {
	    $return[] = $row['Field'];      
	}
	return $return;
}

function create_head($dataArr)
{

    for($j = 0; $j < count($dataArr); $j++) {
        echo "<td>".$dataArr."</td>";
    }
}

$collist = mysql_fetch_col($result);
mysql_free_result($result);



//Getting actual data
$qry = "SELECT * FROM $db_name LIMIT 0,15";
$res = mysql_query($qry);

function mysql_fetch_all($res) {
   while($row=mysql_fetch_array($res))
   {
   		$return[] = $row;
   }
   return $return;
}

function create_row($dataArr , $collist , $pk) {
    echo "<tr>";
    for($j = 0; $j < count($dataArr)/2; $j++) {
        echo "<td data-col-val='".$collist[$j] ."' data-pk-val= '". $dataArr[$pk] ."'>".$dataArr[$j]."</td>";
    }
    echo "</tr>";
}

$all = mysql_fetch_all($res);

//echo implode(",", $all) . "<br>";
echo "<table id='mytable' border='1'>";
echo "<thead>";
for($i = 0; $i < count($collist); $i++) {
	//echo implode(",",$all[$i]);
    create_head($collist[$i]);
}
echo "</thead>";
echo "<tbody>";
for($i = 0; $i < count($all); $i++) {
	//echo implode(",",$all[$i]);
    create_row($all[$i] , $collist , $pk);
}
echo "</tbody></table>";


mysql_free_result($res);
mysql_close($link);
?>