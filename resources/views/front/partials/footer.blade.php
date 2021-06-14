    {{--<div class="container d-md-flex py-4">
      <div class="mr-md-auto text-center text-md-left">
        <div class="copyright">
            &copy; Copyright {{ date('Y') }} <strong>VBES</strong>. All Rights Reserved
        </div>
        <div class="credits">
            Developed by <a href="javascript:;"><b>Ganesh Bhatta</b></a>
            <div id="player" class = "d-none"></div>
        </div>
      </div>
      <div class="social-links text-center text-md-right pt-3 pt-md-0">
        <a href="javascript:;" class="twitter"><i class="bx bxl-twitter"></i></a>
        <a href="javascript:;" class="facebook"><i class="bx bxl-facebook"></i></a>
        <a href="javascript:;" class="instagram"><i class="bx bxl-instagram"></i></a>
        <a href="javascript:;" class="google-plus"><i class="bx bxl-skype"></i></a>
        <a href="javascript:;" class="linkedin"><i class="bx bxl-linkedin"></i></a>
      </div>
    </div>--}}
    <div class="container py-4">
      <div class="mr-md-auto text-center">
        <div class="copyright credits">
             <strong>Copyright &copy; {{ date('Y') }} <a href="{{ route('landing') }}">VBES</a>. All Rights Reserved</strong>
        </div>
      </div>
    </div>
  </footer><!-- End Footer -->

<a href="javascript:;" class="back-to-top"><i class="icofont-simple-up"></i></a>
<div class="alan-btn"></div>
<script src="{{ mix('js/manifest.js') }}"></script>
<script src="{{ mix('js/vendor.js') }}"></script>
<script src="{{ mix('js/app.js') }}"></script>
<script>    
/* general purpose functions for frontend */
    function fillFormField(wildcard,id){
        let get_elem = document.getElementById(id);
        get_elem.value = wildcard;
    }
    function resetFormField(id){
        let get_elem = document.getElementById(id);
        get_elem.value = '';
    }
    function readFormField(id){
        let get_elem = document.getElementById(id);
        play(get_elem.value);
    }
    function addCommands(command_list){
        for( var i = 0; i <= command_list.length -1; i++ ){
            annyang.addCommands(command_list[i]);
        }
    }

    /* $.getJSON("https://api.countapi.xyz/hit/vbes.test{{ request()->getRequestUri() }}", function(response) {
        alert("you have visited this page "+response.value);
    }); */
    if("{{ is_connected() }}"){
        var path = "{{ request()->getRequestUri() }}";
        var pageName = path.split("/");
        pageName = pageName[1];
        countapi.hit('vbes.test', pageName).then((result) => {
            if(result.value == 1){
                if(path == '/password/reset'){
                    play("You are in password reset page");
                }else{
                    play("You are in "+pageName+" page");
                }
            }
        });
    }


if (annyang) {
    goToPageCommand = {
        'go to :tag (page)' : goToPage,'go :tag (page)' : goToPage
        ,'go to in :tag (page)' : goToPage
    }
    function goToPage(tag){
        play("Going to "+tag);
        if(tag == 'home' || tag == 'landing'){
            window.location = "/";
        }else if(tag == 'voice'){
            window.location = "/voice_chatbot";
        }else if(tag == 'back'){
            history.back();
        }else{
            window.location = "/"+tag;
        }
    }

    listeningCommand = {
        'hey are you listening me' : listen,'are you listening me' : listen
    }
    function listen(){
        play("yes i am listening you. you can give me command");
    }

    goBackCommand = {
        'go back' : goBack,'go to previous (page)' : goBack
    }

    function goBack(){
        play("Going to back");
        history.back();
    }

    whoAmICommand = {
        'who am i' : whoAmI,'what is my name' : whoAmI,
        'do you know me' : whoAmI,'can you tell me what is my name' : whoAmI,
        'please tell me my name' : whoAmI
    }
    function whoAmI(){
        let name = "{{ @(auth()->user()->name) }}";
        let txt = "";
        if(name != null){
            txt = "you are anonymous for me";
        }else{
            txt = "you are "+name;
        }
        play(txt);
    }

    whatTimeCommand = {
        'what time it is' : whatTime,'what is time now' : whatTime
    }

    function whatTime(){
        let txt = "{{ "it is ".date('H i  a') }}";
        play(txt);
    }

    pauseCommand = {
        'pause reading' : pause, 'pause playing the speech' : pause,
        'please pause reading' :  pause, 'please pause your speeach' : pause,
        'puase your speech' : pause
    }
    function pause() {
        play("pausing the speech");
      responsiveVoice.pause();
    }

    resumeCommand = {
        'resume reading' : resume, 'resume the speech' : resume,
        'please resume reading' :  resume, 'please resume your speeach' : resume,
        'resume your speech' : resume, 'resume speech' : resume
    }
    function resume() {
        play("resuming the speech");
      responsiveVoice.resume();
    }

    cancelCommand = {
        'cancel reading' : cancel, 'cancel the speech' : cancel,
        'please cancel reading' :  cancel, 'please cancel your speeach' : cancel,
        'cancel your speech' : cancel, 'cancel speech' : cancel
    }
    function cancel() {
        play("canceling the speech");
      responsiveVoice.cancel();
    }

    var whereAmICommand = {
        'where am i' : whereAmI,'i am in which page ' : whereAmI,
        'now i am in which page' : whereAmI,'what is my current page' : whereAmI,
        'what is name of this page' : whereAmI
    }
    function whereAmI(){
        var path = "{{ request()->getRequestUri() }}";
        var pageName = path.split("/");
        pageName = pageName[1];
        if(path == '/password/reset'){
            offLinePlay("You are in password reset page");
        }else{
            offLinePlay("You are in "+pageName+" page");
        }
    }

    var noOfTimesVisitedCommand = {
        'how many times i have visited this page' : noOfTimesVisited,'how many times this page is visited ' : noOfTimesVisited,
    }
    function noOfTimesVisited(){
        var path = "{{ request()->getRequestUri() }}";
        var pageName = path.split("/");
        pageName = pageName[1];
        countapi.hit('vbes.test', pageName).then((result) => {
            play("you have visited this  "+ result.value+" times");
        });
    }
    // var commands = ;
    addCommands([
        goToPageCommand,listeningCommand,goBackCommand,whoAmICommand,
        whatTimeCommand,pauseCommand,resumeCommand,cancelCommand,whereAmICommand,
        noOfTimesVisitedCommand
    ]);
    annyang.start();
    // console.log(annyang.getSpeechRecognizer());

}
</script>
@yield('scripts')
@if(!is_connected())
    <script>
        document.load
        if(annyang){
            annyang.abort();
        }
        if(!navigator.onLine){
            $(document).ready(function(){
                $(this).one(function(){
                    offLinePlay( "Make sure internet is connected or not.");
                });
                // setInterval('offLinePlay( "Make sure internet is connected or not.");', 3*60*1000); 
            });
        }
    </script>
@endif
</body>
</html>
