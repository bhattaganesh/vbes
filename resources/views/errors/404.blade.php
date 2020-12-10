<!DOCTYPE HTML>
<html>
	<head>
		<title>VBES | 404 Page not found</title>
		<meta name="keywords" content="404 iphone web template, Android web template, Smartphone web template, free webdesigns for Nokia, Samsung, LG, Sony Ericsson, Motorola web design" />
		<link href="{{ asset('css/404.css') }}" rel="stylesheet" type="text/css"  media="all" />
		<script src="https://code.responsivevoice.org/responsivevoice.js"></script>
		<script src="//cdnjs.cloudflare.com/ajax/libs/annyang/2.6.0/annyang.min.js"></script>
	</head>
	<body>
		<!--start-wrap--->
		<div class="wrap">
			<!---start-header---->
				<div class="header">
					<div class="logo">
						<h1><a href="#">Ohh</a></h1>
					</div>
				</div>
			<!---End-header---->
			<!--start-content------>
			<div class="content">
				<img src="https://p.w3layouts.com/demos/ohh/web/images/error-img.png" title="error" />
				<p><span><label>O</label>hh.....</span>You Requested the page that is no longer There.</p>
				<a href="javascript:;" id="go_back" onclick="history.back();">Go Back</a>
   			</div>
			<!--End-Cotent------>
		</div>
		<!--End-wrap--->
		<script>
			responsiveVoice.clickEvent();
			responsiveVoice.setTextReplacements([{
			    searchvalue: "404",
			    newvalue: "four O four"
			}]);
			function play(txt){
			    responsiveVoice.setDefaultVoice("US English Female");
			    responsiveVoice.speak("ohh. You Requested the page that is no longer There. Now you are in 404 page.");
			}
            var something = (function() {
                var executed = false;
                return function() {
                    if (!executed) {
                        executed = true;
                        play();
                    }
                };
            })();
            something();
            if(annyang) {
              var commands = {
                'go back': function() {
                	document.getElementById('go_back').click();
                }
              };
              annyang.addCommands(commands);
              annyang.start();
            }
		</script>
	</body>
</html>
