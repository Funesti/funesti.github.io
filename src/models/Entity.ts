namespace Funesti {
    export class Entity {
        public _id: number;
    public _name: string;
    public _health: number;
    public _armor: number; //physical defense
    public _resistance: number; //magical defense
    public _baseStr: number; //strength
    public _buffStr: number; 
    public _baseInt: number; //intelligence
    public _buffInt: number; 
    public _baseAgi: number; //agility
    public _buffAgi: number;
    public _buffs: EntityEffect[];
    public _debuffs: EntityEffect[];
    
    constructor() {
        
    }
    
    process() {
        this.processBuffs();
    }
    
    processBuffs() {
        this._buffStr = 0;
        this._buffInt = 0;
        this._buffAgi = 0;
        if (this._buffs == null) {
            return;
        }
        for (let currBuff of this._buffs) {
            if (!currBuff.valid()) {
            currBuff.remove();
        } else {
            currBuff.apply();
        }
        }
    }
    
    hasBuff(buff:EntityEffect):any {
        if (this._buffs == null) {
            return false;
        }
        for (let i in this._buffs) {
            if (this._buffs[i].id == buff.id) {
            return i;
        }
        }
        return false;
    }
    
    addBuff(buff: EntityEffect):any {
        if (this._buffs == null)
            this._buffs = [];
        if (this.hasBuff(buff) == false)
            this._buffs.push(buff);
    }
    
    removeBuff(buff:EntityEffect):any {
        if (this._buffs == null) {
            return;
        }
        let buffIndex: any = this.hasBuff(buff); 
        if (buffIndex >= 0) {
            this._buffs.splice(buffIndex,1);
        }
    }
    
    get str():number {
        
        return (this._baseStr || 0) + (this._buffStr || 0);
    }
    
    set str(str:number) {
        this._baseStr = str;
    }
    }
}