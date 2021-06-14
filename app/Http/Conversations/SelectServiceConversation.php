<?php

namespace App\Http\Conversations;

use Illuminate\Foundation\Inspiring;
use BotMan\BotMan\Messages\Incoming\Answer;
use BotMan\BotMan\Messages\Outgoing\Question;
use BotMan\BotMan\Messages\Outgoing\Actions\Button;
use BotMan\BotMan\Messages\Conversations\Conversation;

class SelectServiceConversation extends Conversation
{
    public function askService()
    {
        $question = Question::create('What kind of Service you are looking for?')
            ->callbackId('select_service')
            ->addButtons([
                Button::create('How do i login?')->value('login'),
                Button::create('How do i create new account')->value('register'),
                Button::create('How do i compose or send mail?')->value('send mail'),
                Button::create('How do i logout?')->value('logout'),
                Button::create('How do i navigate one page to another?')->value('navigate'),
                Button::create('How do i go back to previous page?')->value('go back'),
                Button::create('How do i know in which page i am?')->value('which page'),
                Button::create('How do i submit form?')->value('submit form'),
                Button::create('How do i paginate?')->value('paginate'),
                Button::create('How do i read/delete mail?')->value('read delete'),
            ]);
        $this->ask($question, function(Answer $answer) {
            if ($answer->isInteractiveMessageReply()) {
                if ($answer->getValue() == 'login') {

                    $this->say("In Login Page, you must have fill your login credentials to form field
                    (email or username field and password field)");
                    $this->say("
                        You cand fill email field by using command 'write email `email address`'.<br>
                        You fill password field by using command 'write password `password`'.<br>
                        You can also check or uncheck 'remember me' checkbox by using 'check or uncheck remember me' command");
                }elseif ($answer->getValue() == 'register') {

                    $this->say('For creating new account you must have fill register form which contains name, email, password and confirm password field. <br> you can fill each field using "write" command.<br>general syntax for write commands is "write field_name field_value.');
                }elseif ($answer->getValue() == 'send mail') {

                    $this->say('For composing mail, you have to fill receiver\'s email address, subject and message field.You can fill each field using "write" command.general syntax for write command is "write field_name field_value". And then say "send mail(or email)" command.');
                }elseif ($answer->getValue() == 'logout') {

                    $this->say("For logout, you can use 'logout or logout me' command.");
                }elseif ($answer->getValue() == 'navigate') {

                    $this->say('For navigating pages you can use "go to page_name or go page_name" command.');
                }elseif ($answer->getValue() == 'go back') {

                    $this->say(' For going back to previous page simply you can use "go back" command.');
                }elseif ($answer->getValue() == 'which page') {

                    $this->say(' "where am i" command will tell you in which page you are.');
                }elseif ($answer->getValue() == 'submit form') {

                    $this->say("For sending form, you can use simply 'send form or submit form or send `form_name`' command .");
                }elseif ($answer->getValue() == 'paginate') {

                    $this->say("For paginating, you can use simply 'paginate  next or paginate  back' command .");
                }elseif ($answer->getValue() == 'read delete') {
                    
                    $this->say('Each folder contains at most 5 mails per paginate.So we can say first mail, second mail , third mail upto fifth.<br>For deleting ," delete first mail" command can be used.<br>For reading ," read first mail" command can be used.<br>Here folder means inbox, outbox or sent, trash, draft and important.');
                }else {
                    $this->say(Inspiring::quote());
                }
            }else{
                // $this->repeat();
            }
        });
    }

    public function run()
    {
        $this->askService();
    }
}
