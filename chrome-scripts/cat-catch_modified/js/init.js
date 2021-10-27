if(typeof localStorage['Ext']==='undefined' || localStorage['Ext'] == ''){
    var Ext = new Array(
        {"ext":"mpd","size":0},
        {"ext":"m3u8","size":0}
    );
    localStorage['Ext'] = JSON.stringify(Ext);
}

if(typeof localStorage['Type']==='undefined'){
    var Type = new Array(
        {"Type":"video/*"},
        {"Type":"audio/*"}
    );
    localStorage['Type'] = JSON.stringify(Type);
}

if(typeof localStorage['repeat']==='undefined'){
    localStorage['repeat'] = false;
}

if(typeof localStorage['repeatReg']==='undefined'){
    localStorage['repeatReg'] = "\\?[\\S]+";
}

if(typeof localStorage['Debug']==='undefined'){
    localStorage['Debug'] = false;
}

if(typeof localStorage['TitleName']==='undefined'){
    localStorage['TitleName'] = false;
}