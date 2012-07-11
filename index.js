var event = require('eventemitter2').EventEmitter2;
var util = require('util');

var continuous = function( options ){
    options = (options)?options:{};

    this.limit = (options.limit)?parseInt(options.limit):-1;
    this.time = (options.time)?parseInt(options.time):1000;
    this.minTime = (options.minTime)?parseInt(options.minTime):0;
    this.maxTime = (options.maxTime)?parseInt(options.maxTime):1000;
    this.random = (options.random)?options.random==true:false;
    this.callback = (typeof(options.callback)=='function')?options.callback:function(){};


    this._interval = null;
    this._timeout = null;
    this._count = 0;
    this._running = false;
};
util.inherits(continuous, event);

continuous.prototype.stop = function(){
    this._running = false;
    
    clearInterval(this._interval);
    clearTimeout(this._timeout);
    
    this.emit('stopped');
};

continuous.prototype.start = function(){
    this._count = 0;
    this._running = true;
    this._run();
    this.emit('started');
};

continuous.prototype._run = function(){
    if( !this._running ) return;
    
    var self = this;
    if( this.random ){
        this._timeout = setTimeout( function(){
            var result = self.callback();
            ++self._count;
            self.emit('complete', self._count, result);
            if( self._count == self.limit ) self.stop();
            self._run();
        }, self.randomNumber(self.minTime,self.maxTime) );
    } else{
        this._interval = setInterval( function(){
            var result = self.callback();
            ++self._count;
            self.emit('complete', self._count, result);
            if( self._count == self.limit ) self.stop();
        }, self.time );
    }
};

continuous.prototype.randomNumber = function(min,max){
    return Math.floor( Math.random()*(max-min)+1 ) + min;
};


module.exports = continuous;
