$(document).ready(function() {
	
	var canvas = document.getElementById('pablo');
	if (!canvas) {
		alert("Impossible de récupérer le canvas");
		return;
	}

	var context = canvas.getContext('2d');
	if (!context) {
		alert("Impossible de récupérer le context du canvas");
		return;
	}
	
	var uploadBox = $('#upload-box');
	
	var size = 1500;
	var height = 1024;
	var ratio = height/size;
	var min = 500;
	var fontSize = 40;
	var blocs = [
		[122, 129],
		[127, 432],
		[117, 803],
		[549, 277],
		[546, 604],
		[563, 996],
		[951, 250],
		[954, 624],
		[909, 970]
		];
	var ecart = 48;
	
	$(window).on('load', function () {
		// var currentUrl = window.location.href.substring(window.location.href.indexOf('?text')).contains('?text');
		var currentUrl = window.location.href.substring(window.location.href.indexOf('?text')).indexOf('?text') != -1;
		if (currentUrl)
			urlToText();
	});
	
	$(window).on('load resize', function () {
		height = $(window).height()-200;
		if (height < min)
			height = min;
		else if (height > size)
			height = size;
		resize();
	});
	
	$(document).on('dragenter', '#upload-box', function() {
		$(this).css('opacity', '1');
		$(this).css('border', '3px dashed #BBBBBB');
		return false;
	});

	$(document).on('dragover', '#upload-box', function(e) {
		e.preventDefault();
		e.stopPropagation();
		$(this).css('opacity', '1');
		$(this).css('border', '3px dashed #BBBBBB');
		return false;
	});

	$(document).on('dragleave', '#upload-box', function(e) {
		e.preventDefault();
		e.stopPropagation();
		$(this).css('opacity', '0');
		$(this).css('border', 'none');
		return false;
	});
	
	$(document).on('drop', '#upload-box', function(e) {
		if (e.originalEvent.dataTransfer){
			if (e.originalEvent.dataTransfer.files.length) {
				e.preventDefault();
				e.stopPropagation();
				upload(e.originalEvent.dataTransfer.files);
			}
			$(this).css('opacity', '0');
			$(this).css('border', 'none');
		}
		else {
			$(this).css('opacity', '0');
			$(this).css('border', 'none');
		}
		return false;
	});

	$('body').on('click keyup', function () {
		refocus();
	});
	
	$("#text").on('input', function() {
		urlToText();
	});
	
	$("#pic").on('change', function () {
		var reader = new FileReader();
		$(reader).on('load', function (e) {
			document.getElementById("image").src = e.target.result;
		});
		reader.readAsDataURL(this.files[0]);
	});
	
	$('img#image').on('load', function () {
		dessiner(ratio);
	});
	
	$('#upload').on('click', function() {
		$('#pic').trigger('click'); 
	});
	
	$('#download').on('click', function() {
		downloadCanvas($(this), 'pablo', 'pablo.png');
	});

	function dessiner(ratio) {
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.fillStyle = "rgb(245, 139, 87)";
		context.fillRect(0, 0, canvas.width, canvas.height);
		context.fillStyle = "rgb(0, 0, 0)";

		var img = document.getElementById("image");
		context.drawImage(img, 0, 0, img.width, img.height, 194*ratio, 1152*ratio, 348*ratio, 243*ratio);
		
		var text = $("#text").val().replace(/ /g, '  ');
		context.font = "bold "+(fontSize*ratio)+"px Helvetica, Arial, sans-serif";
		
		for (i = 0 ; i < blocs.length ; i++)
			for (j = 0 ; j < 8 ; j++)
				context.fillText(text, blocs[i][0]*ratio, blocs[i][1]*ratio+(j*ecart*ratio));
		refocus();
	}
	
	function downloadCanvas(link, canvasId, filename) {
		$('#pablo').css('width',size+'px');
		canvas.height = size;
		canvas.width = size;
		dessiner(1);
		link.attr('href', document.getElementById(canvasId).toDataURL());
		link.attr('download', filename);
		resize();
	}
	function refocus() {
		var strLength = $("#text").val().length * 2;
		$("#text").focus();
		$("#text")[0].setSelectionRange(strLength, strLength);
	}
	
	function resize() {
		$('#pablo').css('width',height+'px');
		ratio = height/size;
		canvas.height = height;
		canvas.width = height;
		resizeBox();
		dessiner(ratio);
	}
	
	function resizeBox() {
		uploadBox.css('left', $('#pablo').offset().left-3);
		uploadBox.css('height', height);
		uploadBox.css('width', height);
	}
	
	function upload(files) {
		var f = files[0] ;
		if (!f.type.match('image/*')) {
			alert("Attention ! Le fichier doit être une image !") ;
			return false ;
		}
		var reader = new FileReader();
		$(reader).on('load', function (e) {
			document.getElementById("image").src = e.target.result;
		});
		reader.readAsDataURL(f);			
	}
	
	function urlToText() {
		var url = window.location.href.substring(0, window.location.href.indexOf('?text'));
		// if ($('#instructions').css('display') != 'none') {
			// $('#instructions').css('display', 'none');
			// $('#buttons').css('display', 'block');
		// }
		$("#text").val($("#text").val().replace(/[^A-Za-z\s]/g,''));
		document.getElementById("text").value = document.getElementById("text").value.toUpperCase();
		dessiner(ratio);
		window.history.pushState("", "", url+'?text='+$("#text").val().toLowerCase());
	}
});