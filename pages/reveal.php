<!DOCTYPE html>
<html>
<head>
  <meta charset='utf-8'>
  <meta http-equiv='X-UA-Compatible' content='IE=edge'>
  <title>Secret Santa</title>
  <meta name='viewport' content='width=device-width, initial-scale=1'>
  <link rel='stylesheet' type='text/css' media='screen' href='style.css'>
</head>
<body>
  <p class="tuto">Touche le nom pour l'arrêter !</p>
  <div class="background">
    <p class="name">
    <?php echo base64_decode($_GET['name']); ?>
    </p>
  </div>
  
</body>
</html>
