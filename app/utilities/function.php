<?php
function uploadAttachment($file,$dir){
	$upload_dir = public_path()."/attachments/".$dir;
/*	$j =1;
	while (File::exists($upload_dir)) {
		$upload_dir = $upload_dir.$j;
		$j++;
	}*/
	if(!File::exists($upload_dir)){
		File::makeDirectory($upload_dir,0777,true,true);
	}
	$file_name = $file->getClientOriginalName();
	$i = 1;
	while(File::exists($upload_dir.'/'.$file_name)){
		$first_name_file = explode('.'.$file->getClientOriginalExtension(),$file->getClientOriginalName());
		$file_name = $first_name_file[0].'('.$i.')'.'.'.$file->getClientOriginalExtension();
		$i++;
	}
	$status = $file->move($upload_dir,$file_name);
	if($status){
		return $dir.'/'.$file_name;
	}
}


function deleteAttachment($file){
	$file = public_path()."/attachments/".$file;
	if(File::exists($file)){
        unlink($file);
	}
}
 
function deleteDirectory($dir){
	$dir = public_path()."/attachments/".$dir;
	if(File::exists($dir)){
        rmdir($dir);
	}
}


function filePreview($file){
	$ext = pathinfo(public_path('attachments/'.$file),PATHINFO_EXTENSION);
	$doc  = ['doc','docx'];
	$xls  = ['xls','xlsx'];
	$ppt  = ['ppt','pptx'];
	$zip  = ['zip','rar','tar','gzip','gz','7z'];
	$txt  = ['txt','ini','csv','java','php','js','css'];
	$html = ['htm',"html"];
	$mov  = ['avi','mpg','mkv','mov','mp4','3gp','webm','wmv'];
	$mp3  = ['mp3','wav'];
	$pdf = ['pdf'];
	$img = ['jpg','jpeg','png','bmp','gif'];
	$list_of_ext_list = [$doc,$xls,$ppt,$zip,$txt,$html,$mov,$ppt,$pdf,$img];
	$ext_index = 0;
	foreach ($list_of_ext_list as $key => $ext_list) {
		if(checkExtension(strtolower($ext),$ext_list)){
			$ext_index = $key+1;
			break;
		}
	}
	if($ext_index == 1){
		echo '<i class="fas fa-file-word text-primary"></i>';
	}elseif ($ext_index == 2) {
   		echo '<i class="fas fa-file-excel text-success"></i>';
	}elseif ($ext_index == 3) {
   		echo '<i class="fas fa-file-powerpoint text-danger"></i>';
	}elseif ($ext_index == 4) {
   		echo '<i class="fas fa-file-archive text-muted"></i>';
	}elseif ($ext_index == 5) {
   		echo '<i class="fas fa-file-code text-info"></i>';
	}elseif ($ext_index == 6) {
   		echo '<i class="fas fa-file-text text-info"></i>';
	}elseif ($ext_index == 7) {
   		echo '<i class="fas fa-file-movie-o text-warning"></i>';
	}elseif ($ext_index == 8) {
   		echo '<i class="fas fa-file-audio text-warning"></i>';
	}elseif ($ext_index == 9) {
   		echo '<i class="fas fa-file-pdf text-danger"></i>';
	}elseif ($ext_index == 10) {
   		echo '<i class="fas fa-file-image text-danger"></i>';
	}else{
		echo '<div class="jFiler-item-thumb-image"><span class="jFiler-icon-file f-file" style="background-color: rgb(71, 209, 116);">.'.$ext.'</span></div>';
	}
}
function checkExtension($ext,$ext_list){
	if(in_array($ext, $ext_list)){
		return true;
	}else{
		return false;
	}
}


function imageUpload($file,$dir,$thumb = null){
    $upload_dir = public_path()."/uploads/".$dir;
    if(!File::exists($upload_dir)){
        File::makeDirectory($upload_dir,0777,true,true);
    }
    $file_name = ucfirst($dir)."-".date('YmdHis').rand(0,999).".".$file->getClientOriginalExtension();
    $status = $file->move($upload_dir,$file_name);
    if($status){
        if($thumb !== null){
            list($thumb_width,$thumb_height) = explode("x",$thumb);
            Image::make($upload_dir.'/'.$file_name)->resize($thumb_width,$thumb_height,function($constraint){
                return $constraint->aspectRatio();
            })->save($upload_dir.'/'.$file_name);
        }
        return $file_name;
    }else{
        return  false;
    }

}
function  deleteImage($image_name,$dir){
    $user_image_path = public_path('uploads/'.$dir);
    if(File::exists($user_image_path) && File::exists($user_image_path.'/'.$image_name)){
        unlink($user_image_path.'/'.$image_name);
        return true;
    }else{
        return false;
    }
}

function myCustomFunction($pwd){
	// $example_password = "hash capital g g40028008";
    $capitals=['capital a','capital b','capital c','capital d','capital e','capital f','capital g','capital h','capital i','capital j','capital k','capital l','capital m','capital n','capital o','capital p','capital q','capital r','capital s','capital t','capital v','capital u','capital w','capital x','capital y','capital z'];
    $real=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','V','U','W','X','Y','Z'];
    $special_chars=['Exclamation','Hash','Dollar','Percent','Ampersand','Asterisk','Plus','Minus','Stop','Slash','Colon','Semicolon','Less','Equal','Greater','Question','At','Backslash','Caret','Underscore','Backtick','Vertical','Tilde'];
    $spec=['!','#','$','%','&','*','+','-','.','/',':',';','<','=','>','?','@','\\','^','_','`','|','~'];
    if(!empty($pwd)){
        $pos=array();
        $pos1=array();
        $aim=array();
        $find=array();
        $ca=array();
        $aim2=array();
        $finalpos=array();
        //for replacing like 'hash'  with '#'
        $expost=explode(" ", $pwd);
        // $expost = ['hash','captal','g','g40028008'];
        for ($i=0; $i<count($special_chars); $i++) { 
            $specpos=array_search(strtolower($special_chars[$i]), $expost);
            if($specpos!==false){
                $pos[]=$specpos;// position of special chars(like hash) in $expost array
                //eg. $pos = [0];
            }
        }
        if(!empty($pos)){
            for ($i=0; $i <count($pos) ; $i++) { 
            $aim[]=$expost[$pos[$i]]; // $aim = $expost[0]
            // $aim = ['hash'];
            }
            for ($i=0; $i < count($aim); $i++) { 
                $f=array_search(ucwords(strtolower($aim[$i])), $special_chars);
                if($f!==false){
                    $find []=$f;//position of special chars(like hash) in $expost array
                }
             }
        }
        if(!empty($find)){
            for ($i=0; $i <count($find) ; $i++) { 
                $pwd=str_replace(strtolower($special_chars[$find[$i]]), $spec[$find[$i]], $pwd);// replacing special_chars with spec in pwd
            }
        }

        // for repacing like 'capital g' with 'G'
        for ($i=0; $i <count($expost); $i++) { 
            if($expost[$i]==='capital'){
                $ca []=$i;
            }
        }
        for ($i=0; $i < count($ca); $i++) { 
            $aim2[]=$expost[$ca[$i]]." ".$expost[$ca[$i]+1];
            //for storing like $aim2 = ['captial g']
        }
        for ($i=0; $i <count($aim2) ; $i++) { 
            $fin=array_search($aim2[$i], $capitals);
            // searching $aim3 in  capitals
            if($fin!==false){
                $finalpos []=$fin;
            }
        }
        if(!empty($finalpos)){
            for ($i=0; $i < count($finalpos); $i++) { 
                $pwd=str_replace($capitals[$finalpos[$i]], $real[$finalpos[$i]], $pwd);
                // replacing  capitals  with  real in pwd
            }
        }
        $pwd=str_replace(" ","", $pwd);
        return $pwd;
    }else{
    	return false;
    }
}

function nameMaker($name){
	$name_parts = explode(' ',$name);
	foreach ($name_parts as $value) {
		$new_name[] = ucfirst($value);
	}
	return implode(' ', $new_name);
}

function readLoud($txt){
  $txt=htmlspecialchars($txt);
  $txt=rawurlencode($txt);
  $html=file_get_contents('https://translate.google.com/translate_tts?ie=UTF-8&client=gtx&q='.$txt.'&tl=en-np');
  $player="<audio controls='controls' autoplay hidden ><source src='data:audio/mpeg;base64,".base64_encode($html)."'></audio>";
  return $player;
}
