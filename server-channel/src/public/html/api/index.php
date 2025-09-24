<?php
// phpinfo();
// var_dump($_GET);

// <!-- Allow requests from any origin during development -->
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");


include dirname(__DIR__) . '/../../includes/api_proxy.php';


// Get the request path and method
$request_uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$request_method = $_SERVER['REQUEST_METHOD'];

$path_info = $_SERVER['PATH_INFO'] ?? '';


// Normalize the URI (e.g., remove trailing slash)
$uri_segments = explode('/', trim($request_uri, '/'));
// $uri_segments = explode('/', trim($path_info, '/'));

// var_dump("1",$path_info,"2",$request_uri,"3",$request_method,"4",$uri_segments);

// We expect the path to be like `api/add` or `api/remove`
// The action will be the second segment
$action = $uri_segments[1] ?? 'null';

// var_dump($action);



if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $jsonData = file_get_contents('php://input');
    $data=json_decode($jsonData,true);
    // var_dump($data);
    if(isset($data["srId"])) $srId = $data["srId"];
    if(isset($data["phone"])) $phone = $data["phone"];


if(isset($data["deviceType"])) $deviceType = $data["deviceType"];
if(isset($data["brand"])) $brand = $data["brand"];
if(isset($data["model"])) $model = $data["model"];
if(isset($data["message"])) $message = $data["message"];
if(isset($data["cname"])) $cname = $data["cname"];
if(isset($data["email"])) $email = $data["email"];
if(isset($data["phone"])) $phone = $data["phone"];
if(isset($data["pincode"])) $pincode = $data["pincode"];
if(isset($data["address"])) $address = $data["address"];
if(isset($data["inward"])) $inward = $data["inward"];
if(isset($data["outward"])) $outward = $data["outward"];
if(isset($data["changes"])) $changes = $data["changes"];


    // foreach ($data as $key => $value){
    //     echo "from for each => ".$key."  :  ".$value;
    // }

    switch($action) {
        case "addService":
                  $response = add_services(
                    $deviceType, $brand, $model, $message, $cname, $email, $phone, $pincode, $address,$inward,$outward
                );
                  break;
        case "updateService":
              $response = update_services(
                $srId, $changes
              );
              break;
             
            default:
            $error = "The Page does not exist.";
            include('../views/error.php');

        }
}

elseif(count($uri_segments) != 3){
    $response = ['status'=>'fail','message'=>'Incorrect Parameter'];
} else {



   
 switch($action) {
        case "getServicesCust":
                //  phpinfo();
                  $phone=$uri_segments[2];
                  $response = get_cust_service($phone);
                  break;
        case "getServicesAdmin":
                  $phone=$uri_segments[2];
                  $response = get_admin_service($phone);
                  break;
        case "getCustServicesRec":
                //  phpinfo();
                  $srId=$uri_segments[2];
                  $response = get_cust_services_rec($srId);
                  break;
        case "getAdminServicesRec":
                //  phpinfo();
                  $srId=$uri_segments[2];
                  $response = get_admin_services_rec($srId);
                  break;
        case "getAllServices":
              $status = $uri_segments[2];
              $response = get_all_service($status);
              break;
        case "deleteServices":
              $srId = $uri_segments[2];
              $response  = delete_services($srId);
              break;
        default:
            $error = "The Page does not exist.";
            include('../views/error.php');

        }

        }

  echo json_encode($response);
  exit;


?>