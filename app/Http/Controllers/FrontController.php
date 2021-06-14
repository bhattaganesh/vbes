<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
class FrontController extends Controller
{
    public function index(){
    	return view('front.home');
    }

    public function about(){
    	return view('front.about');
    }
    public function service(){
    	return view('front.service');
    }
    public function team(){
    	return view('front.team');
    }
    public function contact(){
    	return view('front.contact');
    }
    public function faq(){
    	return view('front.faq');
    }
    public function voiceChatbot(){
    	return view('front.voiceChatbot');
    }
    public function chatbot(){
        return view('front.chatbot');
    }
    public function blog(){
    	return view('front.blog');
    }
    public function privacy(){
    	return view('front.privacy');
    }
    public function terms(){
    	return view('front.terms');
    }
    public function blogDetail(){
    	return view('front.blogDetail');
    }
    public function readAloud(Request $request){
        if($request->txt){
            // dd($request->txt);
            $data = readLoud($request->txt);
            return response()->json([
                "data" =>$data,
                "status" =>true,
                "message" => "success"
            ]);
        }
    }

    public function contactStore(Request $request){
        // dd($request->all());
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:4',
            'email' => 'required|email',
            'subject' => 'required|min:4',
            'message' => 'required|string',
        ]);

        if ($validator->passes()) {
            return response()->json([
                'success'=>'Your message has been sent. Thank you!'
            ]);
        }
        return response()->json([
            'error'=>$validator->errors()->all()
        ]);

    }

}
