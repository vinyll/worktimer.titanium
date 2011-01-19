function Status() {
    
    var self = this;
    messages = [];
    
    
    function addMessage(status, text) {
        message =  {
            status: status,
            text: text,
        };
        messages.push(message);
        EventDispatcher.dispatch(self, 'new_message', message);
    }
    
    this.addInfo = function(text) {
        addMessage('info', text);
    }
    
    this.addError = function(msg) {
        addMessage('error', text);        
    }
}
