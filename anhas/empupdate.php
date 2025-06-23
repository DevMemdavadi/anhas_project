<?php
include("conn.php");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

$obj=json_decode(file_get_contents("php://input"));

$i=$obj->eid;
$n=$obj->ename;
$m=$obj->email;

$up= "update emp set ename='$n',email='$m'where eid='$i'";
$ex=mysqli_query($link,$up);

if($ex)
{
    $msg=["Result"=>"Employee Data Updated Successfully"];
    echo json_encode($msg);
}
else
{
    $msg=["Result"=>"Try Again"];
    echo json_encode($msg);
};
?>
