function EventDispatcher(){throw('Cannot instantiate a static class');}

EventDispatcher._listeners = {};

EventDispatcher.addListener = function(object, event_name, callback) {
    if(!EventDispatcher._listeners[event_name]) EventDispatcher._listeners[event_name] = [];
    EventDispatcher._listeners[event_name].push({
        object: object,
        callback: callback,
    });
}
    
EventDispatcher.dispatch = function(object, event_name, argument) {
    if(!EventDispatcher._listeners[event_name]) return;
    for(i in EventDispatcher._listeners[event_name]) {
        listener = EventDispatcher._listeners[event_name][i];
        if(listener['object'] == object) {
            listener['callback'](argument);
        }
    }
}