<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trash extends Model
{
    use HasFactory;
    protected $fillable = ['mail_id','user_name','isInbox','isImp'];

    public function mail(){
    	return $this->belongsTo('App\Models\Mail','mail_id','id');
    }
}
