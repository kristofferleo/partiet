
var map = new Map();
console.log(document.cookie);

var player = Player();

console.log(player.coins);

var time = 0;
var timer = new Timer();
timer.Interval = 1000;
timer.Tick = timer_tick;
timer.Start()

function timer_tick()
{
    time = time + 1;
    console.log(time);
}
