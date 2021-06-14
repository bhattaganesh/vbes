<?php

namespace App\Http\Controllers;

use App\Models\Mail;
use App\Models\Inbox;
use App\Models\Outbox;
use App\Models\Draft;
use App\Models\User;
use App\Models\Trash;
use App\Notifications\InboxNotification;
use App\Models\Attachment;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\File;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Notification;
use Carbon\Carbon;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class MailController extends Controller
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
    protected $attachment;
    protected $user;
    public function __construct(Mail $mail,Inbox $inbox,Outbox $outbox,Draft $draft,Attachment $attachment, User $user)
    {
        $this->mail = $mail;
        $this->inbox = $inbox;
        $this->outbox = $outbox;
        $this->draft = $draft;
        $this->attachment = $attachment;
        $this->user = $user;
    }

    private function validateId($id){
        $this->inbox = $this->inbox->find($id);
        if(!$this->inbox){
            request()->session()->flash('error','Sorry!, mail does not exists');
            return  redirect()->route('mail.index');
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if(!isset($request->isDraft)){ //if form does not send draft field, by default draft field contains value "no"
            $request->request->add(['isDraft' => 'no']);
            $request->validate($this->mail->getRules('no'),$this->mail->messages(),$this->mail->attributes());
        }else{
            $request->validate($this->mail->getRules(),$this->mail->messages(),$this->mail->attributes());
        }
        $data = $request->except('attachment');
        $data['sender_id'] = auth()->user()->email;
        $this->mail->fill($data);
        $status = $this->mail->save();
        if($status){
            $data['mail_id'] = $this->mail->id;
            if($request->attachment && $request->isDraft == 'no'){ // mail is not draft and it contains attachment(s)
                $request->validate(['attachment.*'=> ['sometimes','file','max:32000']]);
                $dir = date('YmdHis');
                foreach ($request->attachment as $files) {
                    $data['attachment'] = uploadAttachment($files,$dir);
                    $attachment = new Attachment();
                    $attachment->fill($data);
                    $attachment->save();
                }
            }
            if($request->isDraft == 'no'){ // if mail is not draft

                //  saving mail into outbox
                $data['user_id'] = auth()->user()->id;//for outbox, user_id contains sender's id for user
                $this->outbox->fill($data);
                $this->outbox->save();

                // saving mail into inbox
                $user_info = $this->user->where('email',$this->mail->receiver_id)->first();
                $data['user_id'] = $user_info->id;// for inbox, user_id contains receiver's id for user
                $this->inbox->fill($data);
                $inbox_status = $this->inbox->save();
                if($inbox_status){
                    $to_notification = $this->user->where('email',$this->mail->receiver_id)->first();
                    Notification::send($to_notification,new InboxNotification($this->mail,$this->inbox->id));
                }
            }else{  // if mail is draft
                // saving mail into draft
                $data['user_id'] = auth()->user()->id;// for draft, user_id contains sender's id for user
                $this->draft->fill($data);
                $this->draft->save();
            }
            if($request->isDraft == 'no'){
                request()->session()->flash('success','Email sent successfully.');
            }else{
                request()->session()->flash('success','Draft saved successfully.');
            }
            return redirect()->back();
        }else{
            if($request->isDraft == 'no'){
                request()->session()->flash('error','Sorry!, error while sending email.');
            }else{
                request()->session()->flash('error','Sorry!, error while saving draft.');
            }
            return redirect()->back();
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id) // showing compose form while clicking on draft mail
    {
        $this->draft = $this->draft->findOrFail($id);
        return view('dashboard.compose')->with('draft_data',$this->draft);
    }

    // for showing compose form
    public function compose(){
        return view('dashboard.compose');
    }

    // for showing compose form  while clicking on reply button
    public function reply(Request $request){
        $this->mail = $this->mail->findOrFail($request->mail_id);
        return view('dashboard.compose')->with(($request->mail_type == 'out' ? 'out_data' : 'in_data'),$this->mail);
    }

    public function listAllTrashedMails(Request $request){
        $this->inbox = $this->inbox->onlyTrashed()->where('receiver_id',id)->paginate(5);
        $this->outbox = $this->outbox->onlyTrashed()->where('sender_id',id)->paginate(5);
        $all_trashed_emails = $this->inbox->merge($this->outbox);
        // dd($all_trashed_emails);

        return view('dashboard.trash') ->with('data',$all_trashed_emails);
        // return view('dashboard.trash') ->with('data',$this->inbox)->with('data',$this->outbox);

    }

    function attachDownload(Request $request){
        $file = public_path('attachments/'.$request->dir.'/'.$request->file_name);
        $headers = array(
            'content-type: '.mime_content_type($file),
        );
        return response()->download($file,$request->file_name,$headers);
        // dd($file);
    }

    function attachDisplay(Request $request){
        $file = asset('attachments/'.$request->dir.'/'.$request->file_name);
        return response('<iframe src="'.URL::to($file).'" width="100%" height="600px"></iframe>',200)->header('Content-Type', 'text/html');
        // return response()->download($file,$request->file_name);
        // dd($file);
    }

    // for searching user by users mail address
    public function mailUserSearch(Request $request){
        if($request->search){
                $this->user = $this->user->Where('email','<>',$request->id)->where("email","LIKE",$request->search)
                ->get();
                // dd($this->user);
            if($this->user->count() > 0){
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
        }
    }

    //showing compose form while clicking on searched user result (only when user exists)
    public function mailSendBySearch(Request $request){
        $this->user = $this->user->findOrFail($request->user_id);
        return view('dashboard.compose')->with('search_data',$this->user->email);
    }

   /*   for searching mail in their repective folder(trash, inbox, outbox, draft, important) */

   public function mailSearch(Request $request){
        if($request->ajax()){
            if(strtolower($request->table_name) == 'trash'){ // searching funnctionality in trash folder
                $data = DB::table('trashes')
                    ->join('mails', function ($join) {
                        $join->on('trashes.mail_id', '=', 'mails.id')
                            ->where('trashes.user_id', '=', auth()->user()->id);
                    })
                    // ->Where('mails.isDraft','=','no')
                    ->where('mails.subject','LIKE','%'.$request->data.'%')
                    ->orWhere('mails.message','LIKE','%'.$request->data.'%')
                    ->select('trashes.id as id','trashes.created_at','trashes.isImp','trashes.isInbox','mails.id as mail_id','mails.subject','mails.message','mails.receiver_id','mails.sender_id')
                    ->orderBy('trashes.id','desc')
                    ->paginate(5);
                    foreach ($data as $key => $value) {
                      $data[$key]->subject = $this->mail->subjectCreate($value->subject,$value->message);
                        if($value->isInbox == 'yes'){
                            $data[$key]->show_email = $value->sender_id;
                            $data[$key]->mail_type = 'in';
                        }else{
                            $data[$key]->show_email = $value->receiver_id;
                            $data[$key]->mail_type = 'out';
                        }
                        $data[$key]->diffForHumans = $this->mail->createDiffForHumans($value->created_at);
                        $data[$key]->attachments = $this->mail->attachmentsByMailId($value->mail_id,$this->mail);
                    }
                    // dd($data);
            }elseif (strtolower($request->table_name) == 'inbox') { // searching funnctionality in inbox folder
                $data = DB::table('inboxes')
                    ->join('mails', function ($join) {
                        $join->on('inboxes.mail_id', '=', 'mails.id')
                            ->where('inboxes.user_id', '=', auth()->user()->id);
                    })
                    ->Where('mails.isDraft','=','no')
                    ->where('mails.subject','LIKE','%'.$request->data.'%')
                    ->orWhere('mails.message','LIKE','%'.$request->data.'%')
                    ->select('inboxes.id as id','inboxes.created_at','inboxes.isImp','mails.id as mail_id','mails.subject','mails.message','mails.receiver_id','mails.sender_id')
                    ->orderBy('inboxes.id','desc')
                    ->paginate(5);
                    foreach ($data as $key => $value) {
                      $data[$key]->subject = $this->mail->subjectCreate($value->subject,$value->message);
                        $data[$key]->show_email = $value->sender_id;
                        $data[$key]->mail_type = 'in';
                        $data[$key]->diffForHumans = $this->mail->createDiffForHumans($value->created_at);
                        $data[$key]->attachments = $this->mail->attachmentsByMailId($value->mail_id,$this->mail);
                    }
            }elseif (strtolower($request->table_name) == 'sent') { // searching funnctionality in outbox or sent folder
                $data = DB::table('outboxes')
                    ->join('mails', function ($join) {
                        $join->on('outboxes.mail_id', '=', 'mails.id')
                            ->where('outboxes.user_id', '=', auth()->user()->id);
                    })
                    ->Where('mails.isDraft','=','no')
                    ->where('mails.subject','LIKE','%'.$request->data.'%')
                    ->orWhere('mails.message','LIKE','%'.$request->data.'%')
                    ->select('outboxes.id as id','outboxes.created_at','outboxes.isImp','mails.id as mail_id','mails.subject','mails.message','mails.receiver_id','mails.sender_id')
                    ->orderBy('outboxes.id','desc')
                    ->paginate(5);
                    foreach ($data as $key => $value) {
                      $data[$key]->subject = $this->mail->subjectCreate($value->subject,$value->message);
                        $data[$key]->show_email = $value->receiver_id;
                        $data[$key]->mail_type = 'out';
                        $data[$key]->diffForHumans = $this->mail->createDiffForHumans($value->created_at);
                        $data[$key]->attachments = $this->mail->attachmentsByMailId($value->mail_id,$this->mail);
                    }
            }elseif (strtolower($request->table_name) == 'draft') { // searching funnctionality in draft folder
                $data = DB::table('drafts')
                    ->join('mails', function ($join) {
                        $join->on('drafts.mail_id', '=', 'mails.id')
                            ->where('drafts.user_id', '=', auth()->user()->id);
                    })
                    ->Where('mails.isDraft','=','yes')
                    ->where('mails.subject','LIKE','%'.$request->data.'%')
                    ->orWhere('mails.message','LIKE','%'.$request->data.'%')
                    ->select('drafts.id as id','drafts.created_at','drafts.isImp','mails.id as mail_id','mails.subject','mails.message','mails.receiver_id','mails.sender_id')
                    ->orderBy('drafts.id','desc')
                    ->paginate(5);

                    foreach ($data as $key => $value) {
                        $data[$key]->subject = $this->mail->subjectCreate($value->subject,$value->message);
                        $data[$key]->show_email = $value->receiver_id;
                        $data[$key]->mail_type = 'out';
                        $data[$key]->diffForHumans = $this->mail->createDiffForHumans($value->created_at);
                        $data[$key]->attachments = $this->mail->attachmentsByMailId($value->mail_id,$this->mail);
                    }
            }elseif (strtolower($request->table_name) == 'important') { // searching funnctionality in important folder
                /*
                // only for testing purpose
                $important = DB::table('importants')
                ->select('id','outbox_id','inbox_id','draft_id','trash_id','user_name as show_email')
                ->where('user_name',auth()->user()->email)->get();
                foreach ($important as $key => $value) {
                    if($value->outbox_id != null){
                        $outbox = DB::table('outboxes')
                        ->select('mail_id','created_at')
                        ->where('id',$value->outbox_id)->first();
                        $important[$key]->mail_id = $outbox->mail_id;
                        $important[$key]->created_at = $outbox->created_at;
                        $mail = DB::table('mails')->select('*')
                        ->where('id',$outbox->mail_id)->first();
                        $important[$key]->subject = $this->mail->subjectCreate($mail->subject,$mail->message);
                        $important[$key]->mail_type = 'out';
                        $important[$key]->viewRoute = "/mail/sent/".$value->id;
                        $important[$key]->message = $mail->message;
                        $important[$key]->created_at = $this->mail->createDiffForHumans($outbox->created_at);
                        $important[$key]->sender_id = $mail->sender_id;
                        $important[$key]->receiver_id = $mail->receiver_id;
                        $important[$key]->attachments = $this->mail->attachmentsByMailId($outbox->mail_id,$this->mail);

                    }
                    if($value->inbox_id != null){
                        $this->inbox = $this->inbox->find($value->inbox_id)->get();
                    }
                    if($value->draft_id != null){
                        $this->draft = $this->draft->find($value->draft_id)->get();
                    }
                    if($value->trash_id != null){
                        $this->trash = $this->trash->find($value->trash_id)->get();
                    }
                }
                $data = $important->toArray();
                dd($data);

                */

                $inbox = DB::table('inboxes')
                    ->join('mails', function ($join) {
                        $join->on('inboxes.mail_id', '=', 'mails.id')
                            // ->where('mails.receiver_id', '=', auth()->user()->email);
                            ->where([['inboxes.user_id', '=', auth()->user()->id],['inboxes.isImp','=','yes'],['mails.isDraft','=','no']]);

                    })
                /*->Where('inboxes.isImp','=','yes')
                    ->Where('mails.isDraft','=','no') */
                    ->where('mails.subject','LIKE','%'.$request->data.'%')
                    ->orWhere('mails.message','LIKE','%'.$request->data.'%')
                    ->select('inboxes.id as id','inboxes.created_at','mails.id as mail_id','mails.subject','mails.message','mails.receiver_id','mails.sender_id')
                    ->orderBy('inboxes.id','desc')
                    // ->paginate(5);
                    ->get();
                    foreach ($inbox as $key => $value) {
                        $important = DB::table('importants')->select('id')->where('inbox_id',$value->id)->first();
                        $outbox[$key]->id = $important->id;
                        $inbox[$key]->subject = $this->mail->subjectCreate($value->subject,$value->message);
                        $inbox[$key]->show_email = $value->sender_id;
                        $inbox[$key]->mail_type = 'in';
                        $inbox[$key]->viewRoute = "/mail/inbox/".$value->id;
                        $inbox[$key]->diffForHumans = $this->mail->createDiffForHumans($value->created_at);
                        $inbox[$key]->attachments = $this->mail->attachmentsByMailId($value->mail_id,$this->mail);
                    }
                $outbox = DB::table('outboxes')
                    ->join('mails', function ($join) {
                        $join->on('outboxes.mail_id', '=', 'mails.id')
                            // ->where('mails.sender_id', '=', auth()->user()->email);
                            ->where([['outboxes.user_id', '=', auth()->user()->id],['outboxes.isImp','=','yes'],['mails.isDraft','=','no']]);

                    })
                    // ->Where('outboxes.isImp','=','yes')
                    // ->Where('mails.isDraft','=','no')
                    ->where('mails.subject','LIKE','%'.$request->data.'%')
                    ->orWhere('mails.message','LIKE','%'.$request->data.'%')
                    ->select('outboxes.id as id','outboxes.created_at','mails.id as mail_id','mails.subject','mails.message','mails.receiver_id','mails.sender_id')
                    ->orderBy('outboxes.id','desc')
                    // ->paginate(5);
                    ->get();
                    foreach ($outbox as $key => $value) {
                        $important = DB::table('importants')->select('id')->where('outbox_id',$value->id)->first();
                        $outbox[$key]->id = $important->id;

                        $outbox[$key]->subject = $this->mail->subjectCreate($value->subject,$value->message);
                        $outbox[$key]->show_email = $value->receiver_id;
                        $outbox[$key]->mail_type = 'out';
                        $outbox[$key]->viewRoute = "/mail/sent/".$value->id;
                        $outbox[$key]->diffForHumans = $this->mail->createDiffForHumans($value->created_at);
                        $outbox[$key]->attachments = $this->mail->attachmentsByMailId($value->mail_id,$this->mail);
                    }
                $trash = DB::table('trashes')
                    ->join('mails', function ($join) {
                        $join->on('trashes.mail_id', '=', 'mails.id')
                            // ->where('trashes.user_id', '=', auth()->user()->id);
                            ->where([['trashes.user_id', '=', auth()->user()->id],['trashes.isImp','=','yes'],['mails.isDraft','=','no']]);

                    })
                    // ->Where('trashes.isImp','=','yes')
                    // ->Where('mails.isDraft','=','no')
                    ->where('mails.subject','LIKE','%'.$request->data.'%')
                    ->orWhere('mails.message','LIKE','%'.$request->data.'%')
                    ->select('trashes.id as id','trashes.created_at','trashes.isInbox','mails.id as mail_id','mails.subject','mails.message','mails.receiver_id','mails.sender_id')
                    ->orderBy('trashes.id','desc')
                    // ->paginate(5);
                    ->get();
                    foreach ($trash as $key => $value) {
                      $important = DB::table('importants')->select('id')->where('trash_id',$value->id)->first();
                      $outbox[$key]->id = $important->id;
                      $trash[$key]->subject = $this->mail->subjectCreate($value->subject,$value->message);
                        if($value->isInbox == 'yes'){
                            $trash[$key]->show_email = $value->sender_id;
                            $trash[$key]->mail_type = 'in';
                        }else{
                            $trash[$key]->show_email = $value->receiver_id;
                            $trash[$key]->mail_type = 'out';
                        }
                        $trash[$key]->viewRoute = "/mail/trash/".$value->id;

                        $trash[$key]->diffForHumans = $this->mail->createDiffForHumans($value->created_at);
                        $trash[$key]->attachments = $this->mail->attachmentsByMailId($value->mail_id,$this->mail);
                    }
                $draft = DB::table('drafts')
                    ->join('mails', function ($join) {
                        $join->on('drafts.mail_id', '=', 'mails.id')
                            ->where([['drafts.user_id', '=', auth()->user()->id],['drafts.isImp','=','yes'],['mails.isDraft','=','yes']]);
                    })
                    // ->Where('mails.isDraft','=','yes')
                    // ->Where('drafts.isImp','=','yes')
                    ->where('mails.subject','LIKE','%'.$request->data.'%')
                    ->orWhere('mails.message','LIKE','%'.$request->data.'%')
                    ->select('drafts.id as id','drafts.created_at','mails.id as mail_id','mails.subject','mails.message','mails.receiver_id','mails.sender_id')
                    ->orderBy('drafts.id','desc')
                    // ->paginate(5);
                    ->get();
                    // ->toSql();
                    // dd($draft);
                    foreach ($draft as $key => $value) {
                        $important = DB::table('importants')->select('id')->where('draft_id',$value->id)->first();
                        $outbox[$key]->id = $important->id;
                        $draft[$key]->subject = $this->mail->subjectCreate($value->subject,$value->message);
                        $draft[$key]->show_email = $value->receiver_id;
                        $draft[$key]->mail_type = 'out';
                        $draft[$key]->viewRoute = "/mail/draft/".$value->id;
                        $draft[$key]->diffForHumans = $this->mail->createDiffForHumans($value->created_at);
                        $draft[$key]->attachments = $this->mail->attachmentsByMailId($value->mail_id,$this->mail);
                    }
                $data = array_merge($inbox->toArray(),$outbox->toArray(),$draft->toArray(),$trash->toArray());
                // $data = (object) $data;
                $object = new \stdClass();
                foreach ($data as $key => $value)
                {
                    $object->$key = $value;
                }
                // dd($object);
                $data = new Paginator($object, 5);
                $data->setPath(route('mail-search'));
                // dd($data);
            }else{
                return response()->json([
                    'data' => null,
                    'status' => false,
                    'msg' => 'mails not found'
                ]);
                // $data = null;
            }
            return response()->json([
                'data' => $data,
                'pagination' => (string)$data->links(),
                'status' => true,
                'msg' => 'success'
            ]);
            // return view('dashboard.pagination_child',compact('data'))->render();
        }
    }
}
