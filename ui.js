var btn = document.getElementsByClassName("image")[0];
var myMusic = document.getElementById("Playing Music");
//var txt = document.getElementById("lyricText");
var lyricContent=document.getElementById("lyricText").value;
var con = document.getElementsByClassName("content")[0];
var songTime=document.getElementsByClassName("songTime")[0];
var playing = true;
var length = parseInt(myMusic.duration);
var progressBar=document.getElementsByClassName("progressBar")[0];
var barlength=parseInt(progressBar.clientWidth);
setSongTime(0);



btn.onclick = function(){ 
    if(playing){
        //this.className += " rotate";
        myMusic.play();
        playing = false;
    }else{
        //this.className = "image";
        myMusic.pause();
        playing = true;
    }
}


var lyricArray=lyricContent.split("[");
var lyric="";
var htmlContent="";
var title=lyricArray[1].split("]");
var singer=lyricArray[2].split("]");
console.log(title);
document.getElementsByClassName("title")[0].innerHTML=title[1];
document.getElementsByClassName("singer")[0].innerHTML=singer[1];
for(var i=0;i<lyricArray.length;i++){
    
    var completeTime=lyricArray[i].split("]");//00:44.51 lxx
    
    var second=completeTime[0].split(".");//00:44 51
    var splitminute=second[0].split(":");//00 44
    var timer=splitminute[0]*60 + 1*splitminute[1];

    var line=completeTime[0].split("l");
    console.log(line[1]);

    lyric=completeTime[1];
    if(lyric){
        htmlContent+="<p id="+timer+">"+lyric+"</p>";
    }
    con.innerHTML=htmlContent;
    
}

var num=new Number(0);
var getTag=con.getElementsByTagName("p");
myMusic.addEventListener("timeupdate",function(){
    
    var current=parseInt(this.currentTime);
    updateProgress(current);
    setSongTime(current);
    updateLyric(current);
    
});

function updateLyric(current){
    var gettingResult=document.getElementById(current);
    if(gettingResult){
        for(var i=0;i<getTag.length;i++){
            getTag[i].style.cssText="font-size:15px;";
        }
        //high ligt on going lyric
        document.getElementById(current).style.cssText="font-size:20px; color:#E773CA; font-weight:bold    ";
        if(getTag[ 7 + num].id == current){
            //let lyric moving up
            con.style.top = -20 * num + "px";
            num ++;
        }
//         else if(num>7){
//             var line=document.getElementById(current);
//             con.style.top = -20 * (line-7) + "px";
//             num=line+1;
//            " line="+line[1]+
//         }
    }
}

function getLineNum(current){
    var lineNum=document.getElementById(current);
    return lineNum.split("l")[1];
}
function updateProgress(current){
    document.getElementsByClassName("nowTime")[0].style.width=current*(barlength/length)+'px';
}


function setSongTime(current){
    var minute=parseInt(length/60);
    var second=parseInt(length%60);
    var currMin=parseInt(current/60);
    var currSec=parseInt(current%60);
    if(minute<10){
        minute='0'+minute;
    }
    if(second<10){
        second='0'+second;
    }
    if(currMin<10){
        currMin='0'+currMin;
    }
    if(currSec<10){
        currSec='0'+currSec;
    }
    songTime.innerHTML=currMin+":"+currSec+"/"+minute+":"+second;
}

var drag=false;
progressBar.addEventListener('mousedown',function(e){
    e.preventDefault();
    drag=true;
});
progressBar.addEventListener('mouseup',function(e){
    updateTime(e);
});
var nowTimeBar=document.getElementsByClassName("nowTime")[0];
nowTimeBar.addEventListener('mousedown',function(e){
    e.preventDefault();
    drag=true;
});
nowTimeBar.addEventListener('mouseup',function(e){
    updateTime(e);
});
function updateTime(e){
    var jumptime=0;
    e.preventDefault();
    if(drag){  
        jumptime=(e.clientX-50)/barlength*length;
        updateProgress(jumptime);
        updateLyric(jumptime-1);
        myMusic.currentTime=jumptime;
        myMusic.play();
        playing=false;
    }
}