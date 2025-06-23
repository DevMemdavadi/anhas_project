<?php

include ("conn.php");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    $obj=json_decode(file_get_contents("php://input"));
    $id=$obj->tid;
    $status=$obj->sts;
    
    if($status == "Pending")
    {
        $up="update task set status='Completed' where tid='$id'";
        $ex=mysqli_query($link,$up);
        $msg=["Result"=>"Task Marked Completed"];
        echo json_encode($msg);
    }
    else if($status == "Completed")
    {
        $up="update task set status='Pending' where tid='$id'";
        $ex=mysqli_query($link,$up);
        $msg=["Result"=>"Task Marked Pending"];
        echo json_encode($msg);
    }

?>