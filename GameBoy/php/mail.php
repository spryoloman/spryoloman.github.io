<?php
//читаем json
$json = file_get_contents('../games.json');
$json = json_decode($json, true);

//письмо
$message = '';
$message .= '<h1>Замовлення у магазині</h1>';
$message .= '<p>Ім*я : '.$_POST['ename'].'</p>';
$message .= '<p>Призвіще : '.$_POST['esurname'].'</p>';
$message .= '<p>Телефон : '.$_POST['ephone'].'</p>';
$message .= '<p>Email : '.$_POST['email'].'</p>';
$message .= '<p>Доставка : '.$_POST['edelivery'].'</p>';

$cart = $_POST['cart'];
$sum = 0;
foreach ($cart as $id => $count) {
    $message .= $json[$id]['name'].' --- ';
    $message .= $count.' --- ';
    $message .= $json[$id]['cost']*$count;
    $message .= '<br>'
    $sum = $sum +$count*$json[$id]['cost'];
}
$message .='Усього: '.$sum;

$to = 'spr.yoloman@gmail.com'.','; 
$to .=$_POST['email'];
$spectext = '<!DOCTYPE HTML><html><head><title>Замовлення</title></head><body>';
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";

$m = mail($to, 'Закамовлення у магазині', $spectext.$message.'</body></html>', $headers);

if ($m) {echo 1;} else {echo 0;}
print_r($message);