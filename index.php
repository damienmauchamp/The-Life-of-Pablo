<?php
	$text = 'THE LIFE OF PABLO';
	if (isset($_GET['text']) && !empty($_GET['text'])) {
		$text = strtoupper($_GET['text']);
		$text = preg_replace("/[^A-Za-z0-9 ]/", "", $text);
	}
?>

<!DOCTYPE html>
<html>
	<head>
		<title>The Life of Pablo</title>
		<meta property="og:title" content="The Life of Pablo" />
		<meta property="og:description" content="Generate your own Life of Pablo album artwork!" />	
		<meta property="og:url" content="http://www.dmchp.fr/" />
		<meta property="og:image" content="http://www.dmchp.fr/favicon.png" />
		<meta property="og:type" content="website" />
		<meta name="viewport" content="initial-scale=1,user-scalable=no">
		<meta name="description" content="Generate your own Life of Pablo album artwork!">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black">
		<meta name="theme-color" content="#000000">
		<link rel="icon" type="image/png" href="favicon.png" />
		<!--[if IE]><link rel="shortcut icon" type="image/x-icon" href="favicon.ico" /><![endif]-->
		<link rel="apple-touch-icon-precomposed" href="favicon.png" />
		<link rel="apple-touch-icon-precomposed" sizes="76x76" href="favicon.png" />
		<link rel="apple-touch-icon-precomposed" sizes="120x120" href="favicon.png" />
		<link rel="apple-touch-icon-precomposed" sizes="152x152" href="favicon.png" />
		<link rel="stylesheet" type="text/css" href="./css/pablo.css"/>
		<script src='http://code.jquery.com/jquery-latest.min.js'></script>
		<script src="./js/pablo.js"></script>
	</head>
	<body>
		<div id='elements'>
			<img id="image" src="./images/pablo_1.png" />
			<input id="text" name="text" type="text" value="<?php echo $text; ?>" maxlength="30" />
			<input id="pic" name="pic" type="file" accept="image/*" />
		</div>
		<div id='main'>
			<div id='wrapper'>
				<div id="upload-box"></div>
				<canvas id="pablo" width="1500" height="1500">
					Veuillez mettre votre navigateur à jour.
				</canvas>
			</div>
			<div id='instructions'>
				<div id='upload-button' class='button'>
					<a id='upload' href="#">Glissez-déposez une image ou cliquez ici pour changer la photo</a>
				</div>
				<div>
					Pressez une touche pour changer le texte
				</div>
				<div id='download-button' class='button'>
					<a id='download' href="#">Télécharger</a>
				</div>
			</div>
		</div>
		<div id='social'>
			<div class="link" id='twitter'>
				<a target="about_blank" href="http://www.twitter.com/d_mchp">@d_mchp</a>
			</div>
		</div>
	</body>
</html>