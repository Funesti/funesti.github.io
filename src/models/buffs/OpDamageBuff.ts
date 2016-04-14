namespace Funesti {
    export class OpDamageBuff implements EntityEffect {
    id: number = 1;
    visible: boolean = true;
    isLimited: boolean = true;
    duration: number = 5000; //10s
    activatedOn: number;
    handle: any;
    appliedTo: Entity;
    
    constructor() {
        
    }
    
    attach(ent:Entity) {
        this.appliedTo = ent;
        this.appliedTo.addBuff(this);
        this.activatedOn = (new Date()).getTime();
        this.apply();
    }
    valid() {
        let now = (new Date()).getTime();
        if (now > (this.activatedOn + this.duration)) {
            return false;
        } else {
            return true;
        }
    }
    apply() {
        if (this.appliedTo == null) {
            throw "Buff needs to be attached to an entity before applying it.";
        }
        this.appliedTo._buffStr += 1000;
        this.appliedTo._buffInt += 1000;
        this.appliedTo._buffAgi += 1000;
    }
    remove() {
        this.appliedTo.removeBuff(this);
    }
    }
}

