var continuous = require('../');

var run = new continuous({
    limit: 20,
    time: 500,
    callback: function(){
        return Math.round(new Date().getTime()/1000.0);
    }
});


run.on('started', function(){
    console.log('running');
});

run.on('stopped', function(){
    console.log('stopped');
});

run.on('complete', function(count,result){
    console.log('The count is: ' + count);
    console.log('The time is: ' + result);
});

run.start();

setTimeout( function(){
    run.stop();
}, 5000 );
