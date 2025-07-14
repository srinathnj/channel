<?php
session_start();
require_once 'db_connect.php'; // Include the database connection

// Signup Logic
if (isset($_POST['signup'])) {
    $username = $_POST['username'];
    $password = password_hash($_POST['password1'], PASSWORD_DEFAULT);
    $firstname = $_POST['firstname'];
    $lastname = $_POST['lastname'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $city = $_POST['city'];
    $zip = $_POST['zip'];


    // date_default_timezone_set('Asia/Kolkata'); // Set PHP time zone to IST

   $dateTime = new DateTime();
   $formattedTimestamp = $dateTime->format('Y-m-d H:i:s');

    $query = "INSERT INTO users (username, password, email, firstname,lastname, phone,city,zip,registered) VALUES (:username, :password, :email, :firstname,:lastname, :phone,:city,:zip,:registered)";
    $stmt = $conn->prepare($query);
    $stmt->bindValue(':username', $username);
    $stmt->bindValue(':password',$password);
    $stmt->bindValue(':email',$email);
    $stmt->bindValue(':firstname',$firstname);
    $stmt->bindValue(':lastname',$lastname);
    $stmt->bindValue(':phone',$phone);
    $stmt->bindValue(':city',$city);
    $stmt->bindValue(':zip',$zip);
    $stmt->bindValue(':registered',$formattedTimestamp);
    // $stmt->store_result();

    if ($stmt->execute()) {
        // echo "Signup successful!";
        header("Location: dashboard.php");
      } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->closeCursor();
  }







// Login Logic
if (isset($_POST['login'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $rememberMe=null;
    if(isset($_POST['rememberMe'])) {
          $rememberMe = $_POST['rememberMe'];
    }
    // var_dump($username,$password,$rememberMe);
    $query = "SELECT * FROM users WHERE username = :username";
    // $query = "SELECT userId, username, password FROM users WHERE username = :username";
    $stmt = $conn->prepare($query);
    $stmt->bindValue('username', $username);
    $stmt->execute();
    // $stmt->store_result();
    $rows = $stmt->fetchAll();

    if (count($rows) == 1) {
       foreach ($rows as $row) {
         $id = $row['userId'];
         $dbUsername = $row['username'];
         $dbPassword = $row['password'];
         $dbRole = $row['role'];
       }

        if (password_verify($password, $dbPassword)) {
            $_SESSION['user_id'] = $id;
            $_SESSION['username'] = $dbUsername;
            $_SESSION['role'] = $dbRole;
            // var_dump($rememberMe);
            if($rememberMe)
            {
              // var_dump('inside rememberMe');
              // var_dump(setcookie('rememberMe', $dbUsername, time()+60*60*24*7));
              setcookie('rememberMe', $dbUsername, time()+60*60*24*7);
            }
            // var_dump($_COOKIE['rememberMe']);
            header("Location: /ui/status/");
            exit();
        } else {
            echo "Incorrect password.";
        }
    } else {
        echo "User not found.";
    }
    $stmt->closeCursor();
}

$conn = null
?>
