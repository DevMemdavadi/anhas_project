<?php
include("conn.php");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");


    $sel="select * from task join emp on emp.eid=task.empid";
    $ex=mysqli_query($link, $sel);
    $no = mysqli_num_rows($ex);
    
    if($no>0)
    {
        while($row=mysqli_fetch_assoc($ex))
        {
            $arr[]=$row;
        }
        echo json_encode($arr);
    }
    else
    {
        echo json_encode([]);
    }
?>
