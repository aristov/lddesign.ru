<?
require_once 'config.php';

$offset = (int) $_GET['offset'];
if(!$offset) {
  $offset = 0;
}
$request_params = array(
  'v' => '5.131',
  'access_token' => $access_token,
  'owner_id' => $owner_id,
  'count' => 5,
  'offset' => $offset
);
$get_params = http_build_query($request_params);
$result = json_decode(file_get_contents('https://api.vk.com/method/wall.get?' . $get_params));

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

echo json_encode($result -> response);
