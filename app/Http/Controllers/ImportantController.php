<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Mail;
use App\Models\Inbox;
use App\Models\Outbox;
use App\Models\Trash;
use App\Models\important;
use App\Models\Draft;
class ImportantController extends Controller
{
    protected $mail;
    protected $inbox;
    protected $outbox;
    protected $trash;
    protected $important;
    protected $draft;
    public function __construct(Mail $mail,Inbox $inbox,Outbox $outbox,Trash $trash,Important $important,Draft $draft)
    {
        $this->mail = $mail;
        $this->inbox = $inbox;
        $this->outbox = $outbox;
        $this->trash = $trash;
        $this->important = $important;
        $this->draft = $draft;
    }
    public function index()
    {
        $this->important = $this->important->where('user_name',auth()->user()->email)->orderBy('id','desc')->paginate(5);

        if($this->important->count() > 0){
/*            $important = $this->important->items();
            if($important[0]->trash_id != null){
                $data = $this->trash->findOrFail($important[0]->trash_id);
            }
            if ($important[0]->draft_id != null) {
                $data = $this->draft->findOrFail($important[0]->draft_id);
            }
            if ($important[0]->inbox_id != null) {
                $data = $this->inbox->findOrFail($important[0]->inbox_id);
            }
            if ($important[0]->outbox_id != null) {
                $data = $this->outbox->findOrFail($important[0]->outbox_id);
            }
            $this->mail = $this->mail->find($data->mail_id);
            $attachments = $this->mail->attachments;
/*            $attachments = array();
            foreach ($data as $key => $value) {
              dd($value->mail_id);
                $this->mail = $this->mail->find($data->mail_id);
                $attachment = $this->mail->attachments;
                $attachments [] = $attachment;
            }*/
          foreach ($this->important as $key => $value) {
            if($value->trash_id != null){
                $data = $this->trash->findOrFail($value->trash_id);
            }
            if ($value->draft_id != null) {
                $data = $this->draft->findOrFail($value->draft_id);
            }
            if ($value->inbox_id != null) {
                $data = $this->inbox->findOrFail($value->inbox_id);
            }
            if ($value->outbox_id != null) {
                $data = $this->outbox->findOrFail($value->outbox_id);
            }
            $this->important[$key]->mail_id = $data->mail_id;
          }

            $important = $this->important->items();
          // dd($important);

            $attachments = array();
            foreach ($important as $key => $value) {
                $this->mail = $this->mail->find($value->mail_id);
                $attachment = $this->mail->attachments;
                $attachments [] = $attachment;
            }
            // dd($attachments);
        }
        return view('dashboard.imp')
        ->with('attachments',$attachments ?? '')
        ->with('data',$this->important);
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
        $this->important = $this->important->findOrFail($id);
          if($this->important->trash_id != null){
            $data = $this->trash->findOrFail($this->important->trash_id);
            $imp_type = ($data->isInbox == 'yes') ? 'in' : 'out';
            $user_name = ($data->isInbox == 'yes') ? "From: ".$data->mail->sender_id : "To: ".$data->mail->receiver_id;
          }
          if ($this->important->draft_id != null) {
            $imp_type = 'out';
            $data = $this->draft->findOrFail($this->important->draft_id);
            $user_name = "To: ".$data->mail->receiver_id;
          }
          if ($this->important->inbox_id != null) {
            $imp_type = 'in';
            $data = $this->inbox->findOrFail($this->important->inbox_id);
            $user_name = "From: ".$data->mail->sender_id;
          }
          if ($this->important->outbox_id != null) {
            $imp_type = 'out';
            $data = $this->outbox->findOrFail($this->important->outbox_id);
            $user_name = "To: ".$data->mail->receiver_id;
          }
        $this->mail = $this->mail->find($data->mail_id);
        $attachments = $this->mail->attachments;
        return view('dashboard.read')
        ->with('user_name',$user_name)
        ->with('record_id',$this->important->id)
        ->with('imp_mail_id',$data->mail_id)
        ->with('folder_name','important')
        ->with('attachments',$attachments)
        ->with('imp_type',$imp_type)
        ->with('data',$data);
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
        foreach (array_unique($request->del_record) as $value) {
          $this->important = $this->important->findOrFail($value);
          $record = $this->important;
          $status = $this->important->delete();
          if($status){
            $required_data = $record->draft_id != null ? $this->draft->find($record->draft_id) : ($record->inbox_id != null ? $this->inbox->find($record->inbox_id) : ($record->outbox_id != null ? $this->outbox->find($record->outbox_id) : $this->trash->find($record->trash_id)));
            if($required_data->isImp == 'yes'){
              $required_data->isImp = 'no';
              $required_data->save();
            }
          }
        }
        if($status){
            request()->session()->flash('success','Mail deleted successfully.');
            return  redirect()->route('imp.index');
        }else{
            request()->session()->flash('error','Sorry!, error while deleting email.');
            return  redirect()->back();
        }
    }elseif($request->id){
        $this->important = $this->important->findOrFail($request->id);
        $record = $this->important;
        $status = $this->important->delete();
        if($status){
          //  while deleting imp mail and  it(imp_id_type) is required to reset  imp_status in corresponding table if required
            $required_data = $record->draft_id != null ? $this->draft->find($record->draft_id) : ($record->inbox_id != null ? $this->inbox->find($record->inbox_id) : ($record->outbox_id != null ? $this->outbox->find($record->outbox_id) : $this->trash->find($record->trash_id)));
            if($required_data->isImp == 'yes'){
              $required_data->isImp = 'no';
              $required_data->save();
            }
            request()->session()->flash('success','Mail deleted successfully.');
            return  redirect()->route('imp.index');
        }else{
            request()->session()->flash('error','Sorry!, error while deleting email.');
            return  redirect()->back();
        }
    }else{
        request()->session()->flash('error','You must select at least one mail.');
        return  redirect()->back();
    }
    }
}
