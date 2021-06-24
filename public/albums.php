<?
require_once 'config.php';

$owner_id = (int) $_GET['owner_id'];
$request_params = array(
  'v' => $version,
  'access_token' => $access_token,
  'owner_id' => $owner_id,
  'need_covers' => 1,
  'photo_sizes' => 1,
);
$get_params = http_build_query($request_params);
$result = json_decode(file_get_contents('https://api.vk.com/method/photos.getAlbums?' . $get_params));

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

echo json_encode($result -> response);
