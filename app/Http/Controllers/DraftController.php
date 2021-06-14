<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Mail;
use App\Models\Inbox;
use App\Models\Outbox;
use App\Models\Draft;
use App\Models\important;
use App\Models\Trash;

class DraftController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    protected $mail;
    protected $inbox;
    protected $outbox;
    protected $draft;
    protected $important;

    public function __construct(Mail $mail,Inbox $inbox,Outbox $outbox,Draft $draft,Important $important,Trash $trash)
    {
        $this->mail = $mail;
        $this->inbox = $inbox;
        $this->outbox = $outbox;
        $this->draft = $draft;
        $this->important = $important;
        $this->trash = $trash;

    }
   /*  showing all records  */
    public function index()
    {
        $this->draft = $this->draft->where('user_id',auth()->user()->id)->orderBy('id','desc')->paginate(5);
        return view('dashboard.draft')->with('data',$this->draft);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $this->draft = $this->draft->findOrFail($id);
        $user_name = "To: ".$this->draft->mail->receiver_id;
        return view('dashboard.read')
        ->with('user_name',$user_name)
        ->with('folder_name','draft')
        ->with('data',$this->draft);
    }
/* deleting draft_record(s)  and saving it into trashes table*/
    public function deleteRecord(Request $request){
        if($request->del_record){ //for deleting multiple records
            foreach (array_unique($request->del_record) as $value) {
                $this->draft = $this->draft->findOrFail($value);
                $record = $this->draft;
                $status = $this->draft->delete();
                if($status){
                    $this->trash = new Trash();
                    $data['mail_id'] = $record->mail_id;
                    // $data['user_name'] = $record->sender_id;
                    $data['user_id'] = $record->user_id;
                    $data['isInbox'] = 'no';
                    $this->trash->fill($data);
                    $this->trash->save();
                }
            }
            if($status){
                request()->session()->flash('success','Mail deleted successfully.');
                return  redirect()->route('draft.index');
            }else{
                request()->session()->flash('error','Sorry!, error while deleting email.');
                return  redirect()->back();
            }
        }elseif($request->id){ // for deleting single records
            $this->draft = $this->draft->findOrFail($request->id);
            $record = $this->draft;
            $status = $this->draft->delete();
            if($status){
                $this->trash = new Trash();
                $data['mail_id'] = $record->mail_id;
                // $data['user_name'] = $record->sender_id;
                $data['user_id'] = auth()->user()->id;
                $data['isInbox'] = 'no';
                $this->trash->fill($data);
                $this->trash->save();
                request()->session()->flash('success','Mail deleted successfully.');
                return  redirect()->route('draft.index');
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
        $this->draft = $this->draft->findOrFail($request->id);
        if($this->draft->isImp == 'no'){ // if record is not important
            $this->draft->isImp = 'yes'; // make it important
            $data['draft_id'] = $request->id;
            $data['user_name'] = $this->draft->sender_id;
            $this->important->fill($data);
            $this->important->save(); // saving into important table
            $status = $this->draft->save();
            if($status){
                request()->session()->flash('success','it is added to important successfully.');
            }else{
                request()->session()->flash('error','Sorry!, error while adding it to important.');
            }
        }else{ // if record is important
            $this->draft->isImp = 'no';
            $this->important = $this->important->where('draft_id',$request->id);
            if($this->important){
                $this->important->delete(); //deleting this record from important table
            }
            $status = $this->draft->save();
            if($status){
                request()->session()->flash('success','it is removed from important successfully.');
            }else{
                request()->session()->flash('error','Sorry!, error while removing it from important.');
            }
        }
        return  redirect()->back();
    }
}
