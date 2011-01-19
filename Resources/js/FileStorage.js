function FileStorage(dir, suffix){
    
    var suffix = suffix || '.txt';
    var s = Titanium.Filesystem.getSeparator();
    
    function getAll(data_name) {
        // read
        stream = Titanium.Filesystem.getFileStream(dir+s+data_name+suffix);
        stream.open(Titanium.Filesystem.MODE_READ);
        var line = '', data = [];
        while(line = String(stream.readLine())) {
            if(line[0] === '#' || line === '') continue;
            data[line] = line;
        }
        stream.close();
        return data;
    }
    
    function save(data, filename) {
        // format
        string = (new Array(
            data['start_time'],
            data['stop_time'],
            data['project'],
            data['task'],
            data['comment']
        )).join(';')+';';
        // write
        var target_file = dir+s+filename+suffix;
        stream = Titanium.Filesystem.getFileStream(target_file);
        stream.open(Titanium.Filesystem.MODE_APPEND);
        var saved = stream.writeLine(string);
        stream.close();
        
        return saved;
    }
    
    this.getAll = getAll;
    this.save = save;
}
