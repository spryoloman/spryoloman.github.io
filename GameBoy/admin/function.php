<?php
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "gameboy";

function connect(){
    $conn = mysqli_connect("localhost", "root", "root", "gameboy");
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    return $conn;
}

function init(){
    //вывожу список товаров
    $conn = connect();
    $sql = "SELECT id, name FROM games";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $out = array();
        while($row = mysqli_fetch_assoc($result)) {
            $out[$row["id"]] = $row;
        }
        echo json_encode($out);
    } else {
        echo "0";
    }
    mysqli_close($conn);
}

function selectOneGames(){

    $conn = connect();
    $id = $_POST['gid']
    $sql = "SELECT * FROM games WHERE id = '$id'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result); 
        echo json_encode($row);
    } else {
        echo "0";
    }
    mysqli_close($conn);
}

function updateGames(){
    $conn = connect();
    $id = $_POST['id'];
    $type = $_POST['gtype'];
    $name = $_POST['gname'];
    $cost = $_POST['gcost'];
    $descriprion1 = $_POST['gdesk1'];
    $description2 = $_POST['gdesk2'];
    $genre = $_POST['ggenre'];
    $gage = $_POST['gage'];
    $gplayers= $_POST['gplayers'];
    $gvr = $_POST['gvr'];

    $sql = "UPDATE games SET type='$type', name='$name', cost='$cost', descriprion1='$descriprion1', description2='$description2', genre='$genre', age='$age', vr='$vr', players='$gplayers' WHERE id='$id'";

    if ($conn->query($sql) === TRUE) {
    echo "1";
    } else {
    echo "Error updating record: " . $conn->error;
    }

        mysqli_close($conn);    
}
?>
