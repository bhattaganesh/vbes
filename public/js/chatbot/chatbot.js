var botmanWidget = {
    // frameEndpoint:  "{{ route('chatbox') }}",
    title:'ReplicaBot',
    introMessage: 'Hello, I am a Replica I am here to assist you and answer all your questions about our VBES and services. Also i can do wheather forecasting.',
    mainColor:'#009970',
    bubbleBackground:'#009970',
    headerTextColor: '#fff',
    bodyBackround:"#ccc",
    bubbleAvatarUrl: "img/avatar.png",
    // aboutLink: "{{route('about')}}",
    // aboutText: "Powered by VBES",
    aboutText: "",
};

$(document).on('click', '.desktop-closed-message-avatar img #botmanWidgetRoot', function() {
    var iframe = document.getElementById("chatBotManFrame");
    iframe.addEventListener('load', function () {
        var htmlFrame = this.contentWindow.document.getElementsByTagName("html")[0];
        var bodyFrame = this.contentWindow.document.getElementsByTagName("body")[0];
        var headFrame = this.contentWindow.document.getElementsByTagName("head")[0];
        headFrame.style.backgroundColor = "#fff";
        bodyFrame.style.backgroundColor = "#efffff";
        (function() {
            var css = '/css/chatbot/chat.css';
            link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = css;
            // link = link.cloneNode(true);
            headFrame.appendChild(link);
        })();
        (function() {
            var css = [
                // '/chat/scorllbar/css/OverlayScrollbars.min.css'
            ],
            i = 0;
            link.rel = 'stylesheet';
            link = document.createElement('link');
            var tmp;
            for(; i < css.length; i++){
                tmp = link.cloneNode(true);
                tmp.href = css[i];
                headFrame.appendChild(tmp);
            }
        })();
        (function() {
            var js = [
                '/emoji-picker/lib/jquery/jquery.min.js',
                '/js/emoji.js',
                // '/chat/scorllbar/js/jquery.overlayScrollbars.min.js'
            ],
            i = 0;
            script = document.createElement('script');
            var tmp;
            for(; i < js.length; i++){
                tmp = script.cloneNode(true);
                tmp.src = js[i];
                bodyFrame.appendChild(tmp);
            }
        })();
        /*const elem = document.createElement('button');
        elem.innerText = "emoji";
        var att = document.createAttribute("class"); // Create a "class" attribute
        att.value = "emoji-trigger";                // Set the value of the class attribute
        elem.setAttributeNode(att);

        var userText = this.contentWindow.document.getElementById("userText");
        userText.parentNode.insertBefore(elem, userText.nextSibling); */

        /*var emojiBtn = this.contentWindow.document.querySelector('.emoji-trigger');
        emojiBtn.style.float = "right"; */
        // var btn = $("<button></button>").text("emoji");
        $(iframe.contentWindow.document.querySelector('#botmanChatRoot')).find("#userText").
        after('<button  style = "display:hidden;"></button>');
        (function(){
        $(iframe.contentWindow.document.querySelector('#botmanChatRoot')).find("#userText").
        after('<button  class="emoji-trigger" title = "Insert emoji">&#128540;</button>');
        $(iframe.contentWindow.document.querySelector('.emoji-trigger')).css({
            "padding":"6px",
            "background-color": "#98bf21",
            "border":"none",
            "float":"right",
            "font-size":"32px",
            "margin-top": "5px",
            "padding-buttom": "5px",
            "margin-right": "0px"
        });
        })();

        $(this.contentWindow.document.querySelector('.textarea')).css({
        "color": "white",
        "width": "83%",
        "height": "45px",
        "background-color": "#98bf21",
        "font-family": "Arial",
        "font-size": "20px",
        "padding": "5px",
        "box-shadow": "none"
    });
        /*const root = $(this.contentWindow.document.querySelector('#messageArea')).
        after('<div class="row"><div class = "col-8"><input id = "userText" type="text" placeholder="Send a message..." autofocus="" class="textarea form-control" style = "width:70%; background:red;"></div><div class = "col-4"><button  class="emoji-trigger" style = "float:right;">emoji</button></div></div>');
        console.log(root); */
        // OverlayScrollbars(document.querySelector("iframe"), { });
        $(this.contentWindow.document.querySelector('.emoji-trigger')).focus(function(){
            $(this).css({
                "outline": "none",
            });
        });
        $(this.contentWindow.document.querySelector('.emoji-trigger')).hover(function(){
            $(this).css({
                "cursor": "pointer",
            });
        });

    });
});
