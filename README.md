#Continuous

##About
Continuous is an event based utility used for setTimeout and setInterval.
It is useful when trying to have code that runs at random or continuous intervals.


##How to Install:
```
npm install continuous
``` 

##How to Use:

```
var continuous = require('continuous');
    
//tell it to run 5 times
//every 1 to 3 seconds
var options = {
    limit: 5,
    minTime: 1000,
    maxTime: 3000,
    callback: function(){
        console.log('I have run');
        return Math.round(new Date().getTime()/1000.0);
    },
    random: true
};
    
var run = new continuous( options );

run.on('started', function(){
    console.log('It has begun to run');
});
    
run.on('stopped', function(){
    console.log('All Done');
});
    
run.on('complete', function(count, result){
    console.log('I have run ' + count + ' times');
    console.log('The return of callback is:');
    console.dir(result);
});
    
//start it
run.start();
    
//force it to stop after 5 seconds
setTimeout( function(){
    run.stop();
}, 5000 );
```

##Options:
 
* `limit`: Number - optional, default: -1(forever)
* `time`: Number - milliseconds between runs (non-random only), default: 1000
* `minTime`: Number - min allowed milliseconds between runs (random only), default: 0
* `maxTime`: Number - max allowed milliseconds between runs (random only), default: 1000
* `random`: Boolean - whether or not it should run randomly between minTime and maxTime, default: false
* `callback`: Function - function to run continuously
    
##Methods:

* `start()` - start running
* `stop()` - stop running
