/// <reference path="../typings/jquery.d.ts" />
namespace Funesti {
    export class Game {
        public active: boolean;
    public player: Player;
    
    constructor() {
        this.setup();
        this.active = false;
        console.log("Game started");
    }
    
    setup() {
        this.player = new Player();
    }
    
    start() {
        this.active = true;
        this.tick();
        
    }
    
    stop() {
        this.active = false;
    }
    
    countFPS:any = (() => {
        let lastLoop:number = (new Date()).getMilliseconds();
        let count:number = 1;
        let fps:number = 0;

        return  () => {
        let currentLoop:number = (new Date()).getMilliseconds();    
        if (lastLoop > currentLoop) {
            fps = count;
            count = 1;
        } else {
            count += 1;
        }
        lastLoop = currentLoop;
        return fps;
        };
    })();
    
    tick = () => {
        if (!this.active) {
            return;
        }
        
        window.requestAnimationFrame(() => {
            $("#active").text(this.active);
        $("#fps").text(this.countFPS()); 
        this.tick();
        });
        
        this.player.process();
            
        var playerDetails = "";
        playerDetails += this.player.str;
        
        $("#playerDetails").text(playerDetails);
    }
    
    }
}