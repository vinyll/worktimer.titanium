
function Timer(delay) {
    
    var self = this;
    
    /**
     * @property int
     */
    this.delay = delay;
    
    /**
     * @property boolean
     */
    var started = false;
    
    /**
     * @property date
     */
    var start_time = new Date();
    
    /**
     * @property date
     */
    var stop_time = start_time;
    
    
    /**
     * @property int
     */
    var refresher;
    
    
    this.start = function(){
        this.started = true;
        this.start_time = new Date();
        this.stop_time = this.start_time;
        EventDispatcher.dispatch(self, 'start', self);
        self.refresher = setInterval(self.dispatchNotification, delay*1000);
    }
    
    this.dispatchNotification = function() {
        EventDispatcher.dispatch(self, 'delay', self);
    }
    
    this.stop = function(){
        this.started = false;
        this.stop_time = new Date();
        clearInterval(self.refresher);
        EventDispatcher.dispatch(self, 'stop', self);
    }
    
    this.toggle = function() {
        this.started ? this.stop() : this.start();
        EventDispatcher.dispatch(self, 'toggle', self);
    }
    
    /**
     * @param end_time date object
     * @return date
     */
    this.getDuration = function(end_time) {
        end_time = end_time || new Date();
        return new Date(end_time.getTime() - self.getStartTime().getTime());
    }
    
    /**
     * @return int Time in milliseconds when Timer was started
     */
    this.getStartTime = function() {
        return self.start_time;
    }
    
    /**
     * @return int Time in milliseconds when Timer was stopped
     */
    this.getStopTime = function() {
        return self.stop_time;
    }
    
}