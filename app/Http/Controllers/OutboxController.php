<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Mail;
use App\Models\Inbox;
use App\Models\Outbox;
use App\Models\Trash;
use App\Models\Important;

class OutboxController extends Controller
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
        $this->outbox = $this->outbox->where('sender_id',auth()->user()->email)->orderBy('id','desc')->paginate(5);
            if($this->outbox->count() > 0){
            $outbox = $this->outbox->items();
            $attachments = array();
            foreach ($outbox as $key => $value) {
                $this->mail = $this->mail->find($value->mail_id);
                $attachment = $this->mail->attachments;
                $attachments [] = $attachment;
            }
        }
        return view('dashboard.sent')
        ->with('attachments',$attachments ?? '')
        ->with('data',$this->outbox);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $this->outbox = $this->outbox->findOrFail($id);
        $this->mail = $this->mail->find($this->outbox->mail_id);
        $attachments = $this->mail->attachments;
        $user_name = "To: ".$this->outbox->mail->receiver_id;
        return view('dashboard.read')
        ->with('user_name',$user_name)
        ->with('folder_name','outbox')
        ->with('attachments',$attachments)
        ->with('data',$this->outbox);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function deleteRecord(Request $request){
        if($request->del_record){
            foreach ($request->del_record as $value) {
                $this->outbox = $this->outbox->findOrFail($value);
                $record = $this->outbox;
                $status = $this->outbox->delete();
                if($status){
                    $this->trash = new Trash();
                    $data['mail_id'] = $record->mail_id;
                    $data['user_name'] = $record->sender_id;
                    $data['isInbox'] = 'no';
                    $this->trash->fill($data);
                    $this->trash->save();
                }
            }
            if($status){
                    request()->session()->flash('success','Mail deleted successfully.');
            }else{
                request()->session()->flash('error','Sorry!, error while deleting email.');
            }
            return  redirect()->back();
        }elseif($request->id){
            $this->outbox = $this->outbox->findOrFail($request->id);
            $record = $this->outbox;
            $status = $this->outbox->delete();
            if($status){
                $this->trash = new Trash();
                $data['mail_id'] = $record->mail_id;
                $data['user_name'] = $record->sender_id;
                $data['isInbox'] = 'no';
                $this->trash->fill($data);
                $this->trash->save();
                request()->session()->flash('success','Mail deleted successfully.');
                return  redirect()->route('sent.index');
            }else{
                request()->session()->flash('error','Sorry!, error while deleting email.');
                return  redirect()->back();
            }
        }else{
            request()->session()->flash('error','You must select at least one mail.');
            return  redirect()->back();
        }
    }

    public function makeItImp(Request $request){
        $this->outbox = $this->outbox->findOrFail($request->id);
        if($this->outbox->isImp == 'no'){
            $this->outbox->isImp = 'yes';
            $data['outbox_id'] = $request->id;
            $data['user_name'] = $this->outbox->sender_id;
            $this->important->fill($data);
            $this->important->save();
            $status = $this->outbox->save();
            if($status){
                request()->session()->flash('success','it is added to important successfully.');
            }else{
                request()->session()->flash('error','Sorry!, error while adding it to important.');
            }
        }else{
            $this->outbox->isImp = 'no';
            $this->important = $this->important->where('outbox_id',$request->id);
            if($this->important){
                $this->important->delete();
            }
            $status = $this->outbox->save();
            if($status){
                request()->session()->flash('success','it is removed from important successfully.');
            }else{
                request()->session()->flash('error','Sorry!, error while removing it from important.');
            }
        }
        return  redirect()->back();
    }
}
