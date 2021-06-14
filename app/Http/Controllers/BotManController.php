<?php
namespace App\Http\Controllers;

use BotMan\BotMan\BotMan;
use Illuminate\Http\Request;
use BotMan\BotMan\Messages\Attachments\Image;
use BotMan\BotMan\Messages\Outgoing\OutgoingMessage;
use Illuminate\Foundation\Inspiring;
use BotMan\BotMan\Messages\Incoming\Answer;
use BotMan\BotMan\Messages\Outgoing\Question;
use App\Http\Conversations\SelectServiceConversation;
use App\Http\Conversations\OnboardingConversation;
use App\Http\Middleware\ReceivedMiddleware;

class BotManController extends Controller
{
    public function handle(){
        $botman = app('botman');

        $botman->middleware->received(new ReceivedMiddleware());

        /*$botman->fallback(function($bot){
            $message = $bot->getMessage();
            $bot->reply("Sorry!, i don't understand <b>".$message->getText()."</b>");
            // $bot->reply("My known commands are: <br> wheather in location name");
        });*/

        $botman->fallback(function($bot){
            $bot->reply('Sorry!, i don\'t understand your message.For more help, type help and hit enter.');
        });

        /*            Wheather        */
        $botman->hears('wheather (in|of) {location}',function($bot, $location){
            $url = 'https://nepal-weather-api.herokuapp.com/api/?place='.urlencode(ucfirst($location));
            $response = \json_decode(file_get_contents($url));
            if($response->status == "true"){
                $bot->reply("wheather in ".ucfirst($location)." is");
                $bot->reply("Minimum Tempreture is ".$response->min." <br> Maximum Tempreture is ".$response->max." <br> Rain is ".$response->rain);
            }else{
                $valid_places = '["Dadeldhura","Dipayal","Dhangadi","Birendranagar","Nepalgunj","Jumla","Dang","Pokhara","Bhairahawa","Simara","Kathmandu","Okhaldhunga","Taplejung","Dhankuta","Biratnagar","Jomsom","Dharan","Lumle","Janakpur","Jiri"]';
                $bot->reply($response->msg." <br><br> valid places list is ".$valid_places);

            }
        });

        /* Wheather end*/
        $botman->hears('(hi|hello|hii!|hlo|hey).*', function($bot){            
            if($bot->userStorage()->get('name') == ''){
                $bot->reply('Hii!.  And how can i help you? ');

            }else{
                $bot->reply('Hii! '.$bot->userStorage()->get('name').'. And how can i help you? ');
            }
        });

        $botman->hears('call me {name}', function ($bot,$name) {
            $bot->userStorage()->save([
                'name' => ucfirst($name),
            ]);
            // $bot->typesAndWaits(2);
            $bot->reply('Okay! '.$name);
        });


        $botman->hears('(good|gud|gd) {time}', function ($bot,$time) {
            $bot->reply('Good '.$time);
        });

        $botman->hears('.*(help).*', function ($bot) {
            $bot->startConversation(new SelectServiceConversation());
        });

        $botman->hears('survey', function ($bot) {
            $bot->startConversation(new OnboardingConversation());
        });

        $botman->hears("gif {name}", function ($bot,$name) {
            $url = 'http://api.giphy.com/v1/gifs/search?q='.urlencode($name).'&api_key=5mMKhGIZAlp6CBmYceku4S0T2oweuRza&limit=1';
            $result = json_decode(file_get_contents($url));
            $image = $result->data[0]->images->downsized_large->url;
            $message = OutgoingMessage::create('This is  gif')->withAttachment(new Image($image));

            $bot->reply($message);
        });

        $botman->hears("image {name}", function ($bot,$name) {
            $image = 'https://source.unsplash.com/1600x900/?'.urlencode($name);
            $message = OutgoingMessage::create('This is image')->withAttachment(new Image($image));

            $bot->reply($message);
        });

        $botman->hears("tell me {word}", function ($bot,$word) {
            if ($word == 'joke') {
                $joke = json_decode(file_get_contents('http://api.icndb.com/jokes/random'));
                $bot->reply($joke->value->joke);
            } else {
                $bot->reply(Inspiring::quote());
            }
        });

        $botman->hears('.*vbes.*', function ($bot) {
            $bot->reply("VBES means Voice Based Email System by using which you can send/receive messages using voice commands.");
        });

        $botman->hears('(.*login.*)|(.*signin .*)', function ($bot) {
            $bot->reply("In Login Page, you must have fill your login credentials to form field
                (email or username field and password field)");
            $bot->reply("
                You cand fill email field by using command 'write email `email address`'.<br>
                You fill password field by using command 'write password `password`'.<br>
                You can also check or uncheck 'remember me' checkbox by using 'check or uncheck remember me' command");
        });


        $botman->hears('(.*create new account.*)|(.*signup.*)|(.*register.*)', function ($bot) {
            $bot->reply('For creating new account you must have fill register form which contains name, email, password and confirm password field.<br>you can fill each field using "write" command.<br>general syntax for write commands is "write field_name field_value.');
        });

        $botman->hears('.*navigat.*', function ($bot) {
            $bot->reply('For navigating pages you can use "go to page_name or go page_name" command.');
        });

        $botman->hears('(.*previous page.*)|(.*go back.*)', function ($bot) {
            $bot->reply(' For going back to previous page simply you can use "go back" command.');
        });

        $botman->hears('.*which page.*|.*where am i.*', function ($bot) {
            $bot->reply(' "where am i" command will tell you in which page you are.');
        });

        $botman->hears('.*current time.*|(.*what time.*)', function ($bot) {
            $bot->reply('"what time it is" command will tell you current time.');
        });

        $botman->hears('(.*(compose|send) (mail|email).*)', function ($bot) {
            $bot->reply('For composing mail, you have to fill receiver\'s email address, subject and message field.You can fill each field using "write" command.general syntax for write command is "write field_name field_value". And then say "send mail(or email)" command.');
        });

        $botman->hears('(.*(submit|send) form.*)', function ($bot) {
            $bot->reply("For sending form, you can use simply 'send form or submit form or send `form_name`' command .");
        });

        $botman->hears('(.*logout.*)', function ($bot) {
            $bot->reply("For logout, you can use 'logout or logout me' command.");
        });

        $botman->hears('(.*(delete|read) (mail|email).*)', function ($bot) {
            $bot->reply('Each folder contains at most 5 mails per paginate.So we can say first mail, second mail , third mail upto fifth.<br>For deleting ," delete first mail" command can be used.<br>For reading ," read first mail" command can be used.<br>Here folder means inbox, outbox or sent, trash, draft and important.');
        });

        $botman->hears('.*paginat.*', function ($bot) {
            $bot->reply("For paginating, you can use simply 'paginate  next or paginate  back' command .");
        });

        $botman->listen();
    }

}
