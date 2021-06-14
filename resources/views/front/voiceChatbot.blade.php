@extends('layouts.app')
@section('title','Voice Chatbot')
@section('main')
<section id="chatbot" class="chatbot">
    <div class="container">
        <div class="row">
          <div class="col-lg-4" data-aos="fade-right">
            <div class="section-title">
              <h2>Voice Chatbot</h2>
              <p>The purpose of Voice based chatbot is to help the user of this system.Trying to say "hello"</p>
            </div>
          </div>

            <div class="col-lg-8" data-aos="fade-up" data-aos-delay="100">
                <p>
                   You can ask to this bot about services provided by VBES.
                    </p>
                <ul>
                    <li><i class="ri-check-double-line"></i> you can ask question like "how do i login?"," how do i compose message", "how do i logout",
                    etc using voice command.</li>
                </ul>
                <p class="font-italic">
                    
                </p>
            </div>
        </div>

      </div>
</section><!-- End About Section -->
@endsection
@section('scripts')
<script type="text/javascript" src="https://studio.alan.app/web/lib/alan_lib.min.js"></script>
<script>
if(annyang){
    annyang.abort();// stopping annyang
}
  var alanBtnInstance = alanBtn({
    key: "983c8c964915dcc505a4c00f4373c1db2e956eca572e1d8b807a3e2338fdd0dc/stage",
    onCommand: function (commandData) {
      if (commandData.command === "goBack") {
        history.back();
      }if(commandData.command  === "goToPage"){
            window.location = "/"+commandData.page;
      }
    },
    rootEl: document.getElementById("alan-btn"),
  });
  // if()
alanBtnInstance.activate();
var window_focus;
$(window).focus(function() {
    window_focus = true;
}).blur(function() {
    window_focus = false;
});
function checkReload(){
    if(!window_focus){
        location.reload();  // if not focused, reload

    }
}
setInterval(checkReload, 3*60*1000);  // check if not focused, every 5 seconds
// setInterval("console.clear();",1);
     /*var time = new Date().getTime();
     $(document.body).bind("mousemove keypress", function(e) {
         time = new Date().getTime();
     });

     function refresh() {
         if(new Date().getTime() - time >= 60000) 
             window.location.reload(true);
         else 
             setTimeout(refresh, 10000);
     }

     setTimeout(refresh, 10000);*/
</script>
@endsection

