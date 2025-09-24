<?php
$conn = null;
$servername = "server-channel-db-1";
$username = "master";
$password = "rooter";
$dbname = "channeldb";

// $conn = new mysqli($servername, $username, $password, $dbname);
try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // echo "Connected successfully";
} catch(PDOException $e) {
 error_log("Database connection error: " . $e->getMessage(), 0);
}

// if ($conn->connect_error) {
//     die("Connection failed: " . $conn->connect_error);
// }
?>
