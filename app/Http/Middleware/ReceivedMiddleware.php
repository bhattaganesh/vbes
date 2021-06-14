<?php

namespace App\Http\Middleware;

use BotMan\BotMan\BotMan;
// use BotMan\BotMan\Interfaces\Middleware\Matching;
use BotMan\BotMan\Interfaces\Middleware\Received;
use BotMan\BotMan\Messages\Incoming\IncomingMessage;

class ReceivedMiddleware implements Received//, Matching
{

    public function received(IncomingMessage $message, $next, BotMan $bot)
    {

        $original_msg = $message->getText();
        $message->setText(strtolower($original_msg));
        return $next($message);
    }

    /**
     * @param \BotMan\BotMan\Messages\Incoming\IncomingMessage $message
     * @param string $pattern
     * @param bool $regexMatched Indicator if the regular expression was matched too
     * @return bool
     */
/*    public function matching(IncomingMessage $message, $pattern, $regexMatched)
    {
        return true;
    }*/

}
