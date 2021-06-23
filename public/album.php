<?
require_once 'config.php';

$request_params = array(
  'v' => $version,
  'access_token' => $access_token,
  'owner_id' => -204943414,
  'album_id' => 278146389,
);
$get_params = http_build_query($request_params);
$result = json_decode(file_get_contents('https://api.vk.com/method/photos.get?' . $get_params));

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

echo json_encode($result -> response);
