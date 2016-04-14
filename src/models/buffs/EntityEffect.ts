namespace Funesti {
    export interface EntityEffect {
        id: number;
        visible: boolean;
        isLimited: boolean;
        duration: number; //in milliseconds
        activatedOn: number;
        handle: any; //the handle of the buff
        appliedTo: Entity;
        attach(ent:Entity): void;
        valid(): boolean;
        apply(): void;
        remove(): void;
    }
}