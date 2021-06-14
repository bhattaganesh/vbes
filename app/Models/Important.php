<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Important extends Model
{
    use HasFactory;
    protected $fillable = ['inbox_id','outbox_id','trash_id','draft_id','user_name'];


    public function trash(){
    	return $this->belongsTo('App\Models\Trash','trash_id','id');
    }

    public function draft(){
    	return $this->belongsTo('App\Models\Draft','draft_id','id');
    }
    public function inbox(){
    	return $this->belongsTo('App\Models\Inbox','inbox_id','id');
    }
    public function outbox(){
    	return $this->belongsTo('App\Models\Outbox','outbox_id','id');
    }

}
