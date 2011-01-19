String.prototype.minlength = function(min_length, fill) {
    return new Array(min_length-this.length+1).join(fill) + this;
}
//t = "ha".minlength(6, '>'); // ">>>>ha"
