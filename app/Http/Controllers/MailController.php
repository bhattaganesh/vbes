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

    public function index()
    {

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        // return view('dashboard.compose');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if(!isset($request->draft)){
            $request->request->add(['draft' => 'no']);
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
            if($request->attachment && $request->draft == 'no'){
                $request->validate(['attachment.*'=> ['sometimes','file','max:32000']]);
                $dir = date('YmdHis');
                foreach ($request->attachment as $files) {
                    $data['attachment'] = uploadAttachment($files,$dir);
                    $attachment = new Attachment();
                    $attachment->fill($data);
                    $attachment->save();
                }
            }
            if($request->draft == 'no'){
                $this->inbox->fill($data);
                $inbox_status = $this->inbox->save();
                if($inbox_status){
                    $to_notification = $this->user->where('email',$this->mail->receiver_id)->get();
                    // dd($to_notification);
                    Notification::send($to_notification,new InboxNotification($this->mail,$this->inbox->id));
                }
                $this->outbox->fill($data);
                $this->outbox->save();
            }else{
                $this->draft->fill($data);
                $this->draft->save();
            }
            if($request->draft == 'no'){
                request()->session()->flash('success','Email sent successfully.');
            }else{
                request()->session()->flash('success','Draft saved successfully.');
            }
            return redirect()->back();
        }else{
            if($request->draft == 'no'){
                request()->session()->flash('error','Sorry!, error while sending email.');
            }else{
                request()->session()->flash('error','Sorry!, error while saving draft.');
            }
            return redirect()->back();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */   public function show($id)
    {
        // $this->inbox = $this->inbox->findOrFail($id);
        // $data = Mail::with('inboxes')->find($this->inbox->mail_id);
        // return view('dashboard.read')->with('data',$data);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $this->draft = $this->draft->findOrFail($id);
        return view('dashboard.compose')->with('draft_data',$this->draft);
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

    public function compose(){
        return view('dashboard.compose');
    }

    public function reply(Request $request){
        $this->mail = $this->mail->findOrFail($request->mail_id);
        return view('dashboard.compose')->with(($request->mail_type == 'out' ? 'out_data' : 'in_data'),$this->mail);
    }

    public function listAllTrashedMails(Request $request){
        $this->inbox = $this->inbox->onlyTrashed()->where('receiver_id',auth()->user()->email)->paginate(5);
        $this->outbox = $this->outbox->onlyTrashed()->where('sender_id',auth()->user()->email)->paginate(5);
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

    public function mailUserSearch(Request $request){
        if($request->search){
/*            foreach ($request->query as $value) {
                $this->user = $this->user->Where('email','<>',auth()->user()->email)->where("email","LIKE",$value)
                ->get();
            }*/
                $this->user = $this->user->Where('email','<>',auth()->user()->email)->where("email","LIKE",$request->search)
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

    public function mailSendBySearch(Request $request){
        $this->user = $this->user->findOrFail($request->user_id);
        return view('dashboard.compose')->with('search_data',$this->user->email);
    }

    public function mailSearch(Request $request){
        if($request->ajax()){
            if(strtolower($request->table_name) == 'trash'){
                $data = DB::table('trashes')
                    ->join('mails', function ($join) {
                        $join->on('trashes.mail_id', '=', 'mails.id')
                            ->where('trashes.user_name', '=', auth()->user()->email);
                    })
                    // ->Where('mails.draft','=','no')
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
            }elseif (strtolower($request->table_name) == 'inbox') {
                $data = DB::table('inboxes')
                    ->join('mails', function ($join) {
                        $join->on('inboxes.mail_id', '=', 'mails.id')
                            ->where('mails.receiver_id', '=', auth()->user()->email);
                    })
                    ->Where('mails.draft','=','no')
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
            }elseif (strtolower($request->table_name) == 'sent') {
                $data = DB::table('outboxes')
                    ->join('mails', function ($join) {
                        $join->on('outboxes.mail_id', '=', 'mails.id')
                            ->where('mails.sender_id', '=', auth()->user()->email);
                    })
                    ->Where('mails.draft','=','no')
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
            }elseif (strtolower($request->table_name) == 'draft') {
                $data = DB::table('drafts')
                    ->join('mails', function ($join) {
                        $join->on('drafts.mail_id', '=', 'mails.id')
                            ->where('mails.sender_id', '=', auth()->user()->email);
                    })
                    ->Where('mails.draft','=','yes')
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
            }elseif (strtolower($request->table_name) == 'important') {
                $inbox = DB::table('inboxes')
                    ->join('mails', function ($join) {
                        $join->on('inboxes.mail_id', '=', 'mails.id')
                            ->where('mails.receiver_id', '=', auth()->user()->email);
                    })
                    ->Where('inboxes.isImp','=','yes')
                    ->Where('mails.draft','=','no')
                    ->where('mails.subject','LIKE','%'.$request->data.'%')
                    ->orWhere('mails.message','LIKE','%'.$request->data.'%')
                    ->select('inboxes.id as id','inboxes.created_at','mails.id as mail_id','mails.subject','mails.message','mails.receiver_id','mails.sender_id')
                    ->orderBy('inboxes.id','desc')
                    // ->paginate(5);
                    ->get();
                    foreach ($inbox as $key => $value) {
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
                            ->where('mails.sender_id', '=', auth()->user()->email);
                    })
                    ->Where('outboxes.isImp','=','yes')
                    ->Where('mails.draft','=','no')
                    ->where('mails.subject','LIKE','%'.$request->data.'%')
                    ->orWhere('mails.message','LIKE','%'.$request->data.'%')
                    ->select('outboxes.id as id','outboxes.created_at','mails.id as mail_id','mails.subject','mails.message','mails.receiver_id','mails.sender_id')
                    ->orderBy('outboxes.id','desc')
                    // ->paginate(5);
                    ->get();
                    foreach ($outbox as $key => $value) {
                      $outbox[$key]->subject = $this->mail->subjectCreate($value->subject,$value->message);
                        $outbox[$key]->show_email = $value->receiver_id;
                        $outbox[$key]->mail_type = 'in';
                        $outbox[$key]->viewRoute = "/mail/sent/".$value->id;
                        $outbox[$key]->diffForHumans = $this->mail->createDiffForHumans($value->created_at);
                        $outbox[$key]->attachments = $this->mail->attachmentsByMailId($value->mail_id,$this->mail);
                    }
                $trash = DB::table('trashes')
                    ->join('mails', function ($join) {
                        $join->on('trashes.mail_id', '=', 'mails.id')
                            ->where('trashes.user_name', '=', auth()->user()->email);
                    })
                    ->Where('trashes.isImp','=','yes')
                    // ->Where('mails.draft','=','no')
                    ->where('mails.subject','LIKE','%'.$request->data.'%')
                    ->orWhere('mails.message','LIKE','%'.$request->data.'%')
                    ->select('trashes.id as id','trashes.created_at','trashes.isInbox','mails.id as mail_id','mails.subject','mails.message','mails.receiver_id','mails.sender_id')
                    ->orderBy('trashes.id','desc')
                    // ->paginate(5);
                    ->get();
                    foreach ($trash as $key => $value) {
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
                            ->where('mails.sender_id', '=', auth()->user()->email);
                    })
                    ->Where('mails.draft','=','yes')
                    ->Where('drafts.isImp','=','yes')
                    ->where('mails.subject','LIKE','%'.$request->data.'%')
                    ->orWhere('mails.message','LIKE','%'.$request->data.'%')
                    ->select('drafts.id as id','drafts.created_at','mails.id as mail_id','mails.subject','mails.message','mails.receiver_id','mails.sender_id')
                    ->orderBy('drafts.id','desc')
                    // ->paginate(5);
                    ->get(); 
                    // ->toSql();
                    dd($draft);
                    foreach ($draft as $key => $value) {
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
            /*
                $currentPage = LengthAwarePaginator::resolveCurrentPage();
                $collection = new Collection($data);
                $perPage = 5;
                //Slice the collection to get the items to display in current page
                $currentPageSearchResults = $collection->slice($currentPage * $perPage, $perPage)->all();

                //Create our paginator and pass it to the view
                $data = new LengthAwarePaginator($currentPageSearchResults, count($collection), $perPage);

            }*/
                return response()->json([
                    'data' => $data,
                    'pagination' => (string)$data->links(),
                    'status' => true,
                    'msg' => 'success'
                ]);
            }else{
                return response()->json([
                    'data' => null,
                    'status' => false,
                    'msg' => 'mails not found'
                ]);
            }
        }
    }
}
