<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Mail;
use App\Models\Inbox;
use App\Models\Outbox;
use App\Models\Trash;
use App\Models\important;
use App\Models\Attachment;
class TrashController extends Controller
{
    protected $mail;
    protected $inbox;
    protected $outbox;
    protected $trash;
    protected $important;
    protected $attachment;
    public function __construct(Mail $mail,Inbox $inbox,Outbox $outbox,Trash $trash,Important $important,Attachment $attachment)
    {
        $this->mail = $mail;
        $this->inbox = $inbox;
        $this->outbox = $outbox;
        $this->trash = $trash;
        $this->important = $important;
        $this->attachment = $attachment;
    }

    public function index()
    {
        $this->trash = $this->trash->where('user_id',auth()->user()->id)->orderBy('id','desc')->paginate(5);
        if($this->trash->count() > 0){
            $trash = $this->trash->items();
            $attachments = array();
            foreach ($trash as $key => $value) {
                $this->mail = $this->mail->find($value->mail_id);
                $attachment = $this->mail->attachments;
                $attachments [] = $attachment;
            }
        }
        return view('dashboard.trash')
        ->with('attachments',$attachments ?? '')
        ->with('data',$this->trash);
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $this->trash = $this->trash->findOrFail($id);
        $this->mail = $this->mail->find($this->trash->mail_id);
        $attachments = $this->mail->attachments;
        $user_name = ($this->trash->isInbox == 'yes') ? 'From: '.$this->trash->mail->sender_id : 'To: '.$this->trash->mail->receiver_id;
        return view('dashboard.read')
        ->with('user_name',$user_name)
        ->with('folder_name','trash')
        ->with('attachments',$attachments)
        ->with('data',$this->trash);
    }

    public function deleteRecord(Request $request){
        if($request->del_record){
            foreach (array_unique($request->del_record) as $value) {
                $this->trash = $this->trash->findOrFail($value);
                if($this->trash->mail->draft == 'yes'){
                    $this->mail = $this->mail->find($this->trash->mail_id);
                    if($this->mail->count() > 0){
                        $this->mail->delete();
                    }
                }
                // if it is in inbox side but if there is no this mail on another side (outbox as well as trash)
                elseif($this->trash->isInbox == 'yes'){
                    $this->outbox = $this->outbox->where('mail_id',$this->trash->mail_id);
                    if($this->outbox->count() <= 0){
                        $trash_outbox = $this->trash->where('mail_id',$this->trash->mail_id)->where('user_id','<>',auth()->user()->id);
                        if($trash_outbox->count() <= 0){
                            $this->mail = $this->mail->find($this->trash->mail_id);
                            $attachments = $this->mail->attachments;
                            $main_status1 = $this->mail->delete();
                            if($main_status1){
                                if($attachments->count() > 0){
                                    $dir = '';
                                    foreach ($attachments as $attachment) {
                                        $file_info = pathinfo((public_path('attachments/'.$attachment->attachment)));
                                        $file_name = $file_info['basename'];
                                        $full_name = explode('/'.$file_name,$attachment->attachment);
                                        $dir  = $full_name[0];
                                        deleteAttachment($attachment->attachment);
                                    }
                                    deleteDirectory($dir);
                                }
                            }
                        }
                    }
                }else{ // if it is in outbox side but if there is no this mail on another side (inbox as well as trash)
                    $this->inbox = $this->inbox->where('mail_id',$this->trash->mail_id);
                    if($this->inbox->count() <= 0){
                        $trash_inbox = $this->trash->where('mail_id',$this->trash->mail_id)->where('user_id','<>',auth()->user()->id);
                        if($trash_inbox->count() <= 0){
                            $this->mail = $this->mail->find($this->trash->mail_id);
                            $attachments = $this->mail->attachments;
                            $main_status2 = $this->mail->delete();
                            if($main_status2){
                                if($attachments->count() > 0){
                                    $dir = '';
                                    foreach ($attachments as $attachment) {
                                        $file_info = pathinfo((public_path('attachments/'.$attachment->attachment)));
                                        $file_name = $file_info['basename'];
                                        $full_name = explode('/'.$file_name,$attachment->attachment);
                                        $dir  = $full_name[0];
                                        deleteAttachment($attachment->attachment);
                                    }
                                    deleteDirectory($dir);
                                }
                            }
                        }
                    }
                }
                if($this->trash->count() > 0){
                    $status = $this->trash->delete();
                }
            }
            // if($status){
            request()->session()->flash('success','Mail deleted successfully.');
            return  redirect()->route('trash.index');
/*            }else{
                request()->session()->flash('error','Sorry!, error while deleting email.');
                return  redirect()->back();
            }*/
        }
        if($request->id){
            $this->trash = $this->trash->findOrFail($request->id);
                if($this->trash->mail->draft == 'yes'){
                    $this->mail = $this->mail->find($this->trash->mail_id);
                    if($this->mail->count() > 0){
                        $this->mail->delete();
                    }
                }elseif($this->trash->isInbox == 'yes'){
                    $this->outbox = $this->outbox->where('mail_id',$this->trash->mail_id);
                    if($this->outbox->count() <= 0){
                        $trash_outbox = $this->trash->where('mail_id',$this->trash->mail_id)->where('user_name','<>',auth()->user()->email);
                        if($trash_outbox->count() <= 0){
                            $this->mail = $this->mail->find($this->trash->mail_id);
                            $attachments = $this->mail->attachments;
                            $main_status1 = $this->mail->delete();
                            if($main_status1){
                                if($attachments->count() > 0){
                                    $dir = '';
                                    foreach ($attachments as $attachment) {
                                        $file_info = pathinfo((public_path('attachments/'.$attachment->attachment)));
                                        $file_name = $file_info['basename'];
                                        $full_name = explode('/'.$file_name,$attachment->attachment);
                                        $dir  = $full_name[0];
                                        deleteAttachment($attachment->attachment);
                                    }
                                    deleteDirectory($dir);
                                }
                            }
                        }
                    }
                }else{ // if it is in outbox side but if there is no this mail on another side (inbox as well as trash)
                    $this->inbox = $this->inbox->where('mail_id',$this->trash->mail_id);
                    if($this->inbox->count() <= 0){
                        $trash_inbox = $this->trash->where('mail_id',$this->trash->mail_id)->where('user_name','<>',auth()->user()->email);
                        if($trash_inbox->count() <= 0){
                            $this->mail = $this->mail->find($this->trash->mail_id);
                            $main_status2 = $this->mail->delete();
                            if($main_status2){
                                if($attachments->count() > 0){
                                    $dir = '';
                                    foreach ($attachments as $attachment) {
                                        $file_info = pathinfo((public_path('attachments/'.$attachment->attachment)));
                                        $file_name = $file_info['basename'];
                                        $full_name = explode('/'.$file_name,$attachment->attachment);
                                        $dir  = $full_name[0];
                                        deleteAttachment($attachment->attachment);
                                    }
                                    deleteDirectory($dir);
                                }
                            }
                        }
                    }
                }
                if($this->trash->count() > 0){
                    $status = $this->trash->delete();
                }
            // if($status){
                    request()->session()->flash('success','Mail deleted successfully.');
                    return  redirect()->route('trash.index');
/*            }else{
                request()->session()->flash('error','Sorry!, error while deleting email.');
                return  redirect()->back();
            }*/
        }/*else{
            request()->session()->flash('error','You must select at least one mail.');
            return  redirect()->back();
        }*/
    }

    public function makeItImp(Request $request){
        $this->trash = $this->trash->findOrFail($request->id);
        if($this->trash->isImp == 'no'){
            $this->trash->isImp = 'yes';
            $data['trash_id'] = $request->id;
            $data['user_name'] = $this->trash->userByTrash->email;
            $this->important->fill($data);
            $this->important->save();
            $status = $this->trash->save();
            if($status){
                request()->session()->flash('success','it is added to important successfully.');
            }else{
                request()->session()->flash('error','Sorry!, error while adding it to important.');
            }
        }else{
            $this->trash->isImp = 'no';
            $this->important = $this->important->where('trash_id',$request->id);
            if($this->important){
                $this->important->delete();
            }
            $status = $this->trash->save();
            if($status){
                request()->session()->flash('success','it is removed from important successfully.');
            }else{
                request()->session()->flash('error','Sorry!, error while removing it from important.');
            }
        }
        return  redirect()->back();
    }
}
