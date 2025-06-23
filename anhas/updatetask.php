<?php
include("conn.php");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

$obj=json_decode(file_get_contents("php://input"));

$i=$obj->tid;
$t=$obj->title;
$d=$obj->date;
$e=$obj->empid;

$up= "update task set title='$t',date='$d',empid='$e' where tid='$i'";
$ex=mysqli_query($link,$up);

if($ex)
{
    $msg=["Result"=>"Task Updated Successfully"];
    echo json_encode($msg);
}
else
{
    $msg=["Result"=>"Try Again"];
    echo json_encode($msg);
};
?>
