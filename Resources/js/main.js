function Worktimer() {
    
    this.timer = null;
    
    this.saveData = function(storage, container, override_data) {
        var data = {
            start_time: this.timer.getStartTime().format('HH:MM'),
            stop_time: this.timer.getStopTime().format('HH:MM'),
            project: $('#project').val(),
            task: $('#task').val(),
            comment: $('#comment').val()
        };
        for(i in override_data) data[i] = override_data[i];
        
        return log_storage.save(data, log_file_name);
    };
    
    this.loadDatas = function() {
        // Retrieve datas
        projects = data_storage.getAll('projects');
        tasks = data_storage.getAll('tasks');
        
        $projects_tag = $('#project');
        $projects_tag.html('');
        for(i in projects) {
            $projects_tag.append($('<option>').val(i).text(projects[i]));
        }
        
        $tasks_tag = $('#task');
        $tasks_tag.html('');
        for(i in tasks) {
            $tasks_tag.append($('<option>').val(i).text(tasks[i]));
        }
    };
    
    this.displayClock = function(hours, minutes) {
        $('#hours_display').text(hours);
        $('#minutes_display').text(minutes);
    }
    
    this.resetClock = function() {
        this.displayClock('00', '00');
    }
}


$(function(){
    // init
    $('#stop_button').hide();
    
    worktimer = new Worktimer();
    timer = new Timer(3);
    st = new Status();
    date = new Date();
    date_format = 'HH:MM';

    // Storage config
    s = Titanium.Filesystem.getSeparator();
    data_storage = new FileStorage(Titanium.Filesystem.getUserDirectory()+s+'worktimer'+s+'datas', 'list.txt');
    log_file_name = date.getFullYear()
                    + date.format('mm')
                    + date.format('dd');
    log_storage = new FileStorage(Titanium.Filesystem.getUserDirectory()+s+'worktimer'+s+'logs', '.log');
    

    
    notification = Titanium.Notification.createNotification(this);
    notification.setTimeout(3);
    notification.setTitle('Worktimer');
    
    // User notifications
    EventDispatcher.addListener(st, 'new_message', function(message){
        notification.setTitle('Worktimer - '+message.status);
        notification.setMessage(message.text);
        notification.show();
    });
    // Refresh clock
    EventDispatcher.addListener(timer, 'delay', function(timer){
        console.debug('duration : ' + timer.getDuration());
        var h = timer.getDuration().format('HH', true);
        var m = timer.getDuration().format('MM', true);
        worktimer.displayClock(h, m);
    });
    // Confirm user when it starts
    EventDispatcher.addListener(timer, 'start', function(timer){
        worktimer.resetClock();
        st.addInfo('Timer started');
    });
    // Save to file
    EventDispatcher.addListener(timer, 'stop', function(timer){
        if(timer.getDuration().getTime() < 60000) {
            st.addInfo("Short time, skipping data save");
            return;
        }
        alert('save')
        saved = worktimer.saveData(log_storage, log_file_name);
        saved ? st.addInfo("Data saved successfully") : st.addError("Error occured while trying to save data");
    });
    
    
    $('#start_button, #stop_button').click(function(){
        $('#stop_button, #start_button').toggle();
        timer.toggle();
    });
    $('#refresh_button').click(function(){
        worktimer.loadDatas();
    });
    $('#add_log').click(function(){
        saved = worktimer.saveData(log_storage, log_file_name, {
            start_time: $('#start_time').val(),
            stop_time:  $('#stop_time').val()
        });
        saved ? st.addInfo("Data added to log") : st.addError("Error occured while trying to add to log");
    });
    
    worktimer.timer = timer;
    worktimer.loadDatas();
    
});


