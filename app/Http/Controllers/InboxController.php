<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Mail;
use App\Models\Inbox;
use App\Models\Outbox;
use App\Models\Trash;
use App\Models\Important;


class InboxController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    protected $mail;
    protected $inbox;
    protected $outbox;
    protected $trash;
    protected $important;
    public function __construct(Mail $mail,Inbox $inbox,Outbox $outbox,Trash $trash,Important $important)
    {
        $this->mail = $mail;
        $this->inbox = $inbox;
        $this->outbox = $outbox;
        $this->trash = $trash;
        $this->important = $important;
    }

    public function index()
    {
        $this->inbox = $this->inbox->where('user_id',auth()->user()->id)->orderBy('id','desc')->paginate(5);
        if($this->inbox->count() > 0){
            $inbox = $this->inbox->items();
            $attachments = array();
            foreach ($inbox as $key => $value) {
                $this->mail = $this->mail->find($value->mail_id);
                $attachment = $this->mail->attachments;
                $attachments [] = $attachment;
            }
        }
        return view('dashboard.inbox')
        ->with('attachments',$attachments ?? '')
        ->with('data',$this->inbox);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id,Request $request)
    {

/*        if($request->inbox_not_id){
            $notification = auth()->user()->notifications()->find($request->inbox_not_id);
            if($notification) {
                $notification->markAsRead();
            }
           $this->inbox = $this->inbox->find($id);
            return response()->json([
                "data" =>$this->inbox,
                "status" =>true,
                "message" => "success"
            ]);
        }*/
        $this->inbox = $this->inbox->findOrFail($id);
        $this->mail = $this->mail->find($this->inbox->mail_id);
        $attachments = $this->mail->attachments;
        $user_name = "From: ".$this->inbox->mail->sender_id;
        $notification = auth()->user()->notifications()->where('data->notification_for','user')->where('data->inbox_id',$id)->first();
        if($notification) {
            $notification->markAsRead();
        }
        return view('dashboard.read')
        ->with('user_name',$user_name)
        ->with('folder_name','inbox')
        ->with('attachments',$attachments)
        ->with('data',$this->inbox);

    }

/* deleting draft_record(s)  and saving it into trashes table*/

    public function deleteRecord(Request $request){
        if($request->del_record){//for deleting multiple records
            foreach (array_unique($request->del_record) as $value) {
                $this->inbox = $this->inbox->findOrFail($value);
                $record = $this->inbox;
                $status = $this->inbox->delete();
                $status = true;
                $this->trash = new Trash();
                $data['mail_id'] = $record->mail_id;
                // $data['user_name'] = $record->receiver_id;
                $data['user_id'] = $record->user_id;
                $data['isInbox'] = 'yes';
                $this->trash->fill($data);
                $this->trash->save();
                $notification = auth()->user()->notifications()
                ->where('data->notification_for','user')
                ->where('data->inbox_id',$value)->first();
                if($notification) {
                    $notification->delete();
                }
            }
            if($status){
                /* $notification = auth()->user()->notifications()->where('data->inbox_id',$value)->first();
                    if($notification) {
                        $notification->delete();
                    } */
                    request()->session()->flash('success','Mail deleted successfully.');
            }else{
                request()->session()->flash('error','Sorry!, error while deleting email.');
            }
            return  redirect()->back();
        }elseif($request->id){ // for deleting single record
            $this->inbox = $this->inbox->findOrFail($request->id);
            $record = $this->inbox;
            $status = $this->inbox->delete();
            if($status){
                $notification = auth()->user()->notifications()->where('data->inbox_id',$record->id)->first();
                    if($notification) {
                        $notification->delete();
                    }
                $this->trash = new Trash();
                $data['mail_id'] = $record->mail_id;
                // $data['user_name'] = $record->receiver_id;
                $data['user_id'] = $record->user_id;
                $data['isInbox'] = 'yes';
                $this->trash->fill($data);
                $this->trash->save();
                request()->session()->flash('success','Mail deleted successfully.');
                return  redirect()->route('inbox.index');
            }else{
                request()->session()->flash('error','Sorry!, error while deleting email.');
                return  redirect()->back();
            }
        }else{
            request()->session()->flash('error','You must select at least one mail.');
            return  redirect()->back();
        }
    }

    /* for making draft_record as important label */

    public function makeItImp(Request $request){
        $this->inbox = $this->inbox->findOrFail($request->id);
        if($this->inbox->isImp == 'no'){ // if record is not important
            $this->inbox->isImp = 'yes'; // make it important
            $data['inbox_id'] = $request->id;
            $data['user_name'] = $this->inbox->receiver_id;
            $this->important->fill($data);
            $this->important->save();// saving into important table
            $status = $this->inbox->save();
            if($status){
/*            return response()->json([
                'status' => true,
                'message' => 'it is added to important successfully',
                'data' => null
            ]);*/
                request()->session()->flash('success','it is added to important successfully.');
            }else{
                request()->session()->flash('error','Sorry!, error while adding it to important.');
/*            return response()->json([
                'status' => false,
                'message' => 'Sorry!, error while adding it to important.',
                'data' => null
            ]);*/
            }
        }else{ // if record is important
            $this->inbox->isImp = 'no';
            $this->important = $this->important->where('inbox_id',$request->id);
            if($this->important){
                $this->important->delete();
            }
            $status = $this->inbox->save();
            if($status){
                request()->session()->flash('success','it is removed from important successfully.');
/*            return response()->json([
                'status' => true,
                'message' => 'it is removed from important successfully.',
                'data' => null
            ]);*/
            }else{
                request()->session()->flash('error','Sorry!, error while removing it from important.');
/*            return response()->json([
                'status' => true,
                'message' => 'Sorry!, error while removing it from important.',
                'data' => null
            ]);*/
            }
        }
        return redirect()->back();
    }
/*
    public function inboxMarkAsRead(Request $request){
        if($request->inbox_id){
            return response()->json([
                "data" =>$this->user,
                "status" =>true,
                "message" => "success"
            ]);
        }else{
            return response()->json([
                "data" => null,
                "status" => false,
                "message" =>"No user found!"
            ]);
        }
    }*/

}
