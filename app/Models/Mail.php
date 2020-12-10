<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\Rule;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;



class Mail extends Model
{
    use HasFactory;
    protected $fillable = ['subject','message','attachment','sender_id','receiver_id','draft'];

    public function getRules($draft='yes'){
        $rules =  [
            'receiver_id' => ['nullable','exists:users,email','notIn:'.auth()->user()->email],
            'subject' => ['nullable','string'],
            'message' => ['required','string'],
            'attachment.*'=> ['sometimes','file','max:32000'],
            'draft' => ['required','in:yes,no'],
        ];
        if($draft != 'yes'){
            $rules['receiver_id'] = ['required','exists:users,email','notIn:'.auth()->user()->email];
        }
        return $rules;
    }
    public function messages(){
        return [
            'receiver_id.exists' => 'Email address does not exists.',
            'receiver_id.notIn' => 'You can not send mail to yourself.',
            'receiver_id.required' => ":attribute is required.",
            'message.required' => 'Message is required.',
             'notIn'      => ':attribute must be valid.',
        ];
    }
    public function attributes(){
        return [
            'receiver_id' => "Receiver email address"
        ];
    }


    public function attachments(){
        return $this->hasMany('App\Models\Attachment','mail_id','id');
    }

    public function render(){
        return '<div class="float-right">
                  1-50/200
                  <div class="btn-group">
                    <button type="button" class="btn btn-default btn-sm">
                      <i class="fas fa-chevron-left"></i>
                    </button>
                    <button type="button" class="btn btn-default btn-sm">
                      <i class="fas fa-chevron-right"></i>
                    </button>
                  </div>
                  <!-- /.btn-group -->
                </div>';
    }

    function attachmentsByMailId($mail_id,$mail_obj){
        $mail_obj = $mail_obj->find($mail_id);
        $attachments = $mail_obj->attachments();
        if($attachments->count() > 0){
            return true;
        }else{
            return false;
        }
    }

    function subjectCreate($subject,$message){
        if(!empty($subject)){
            $subject = \Str::limit($subject,80,'...');
        }else{
            $subject = \Str::words($message,2,'...');
        }
        return $subject;
    }

    function createDiffForHumans($created_at){
        $diffForHumans = Carbon::parse($created_at)->diffForHumans();
        return $diffForHumans;
    }

    function impTableFilter($table_name){
        return (DB::table('importants')->join($table_name, function ($join) {
                $join->on('importants.mail_id', '=', $table_name+'.id')
                ->where('importants.user_name', '=', auth()->user()->email);
                })->Where($table_name+'.isImp','=','yes'));
    }
}
