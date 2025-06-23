<?php
include("conn.php");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

$data = [];

$sel = "select * from emp";
$ex = mysqli_query($link, $sel);

while ($emp = mysqli_fetch_assoc($ex)) 
{
    $eid = $emp['eid'];
    $ename = $emp['ename'];
    $sel1 = "select sum(status = 'Pending') as pending, sum(status = 'Completed') as completed, count(*) AS total from task where empid = '$eid'";
    
    $ex1 = mysqli_query($link, $sel1);
    $row = mysqli_fetch_assoc($ex1);

    $data[] = [
        "empid"     => $eid,
        "ename"     => $ename,
        "pending"   => (int)$row['pending'],
        "completed" => (int)$row['completed'],
        "total"     => (int)$row['total']
    ];
}

echo json_encode(["Result" => $data]);
?>
