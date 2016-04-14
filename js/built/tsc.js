var Funesti;
(function (Funesti) {
    var Game = (function () {
        function Game() {
            var _this = this;
            this.countFPS = (function () {
                var lastLoop = (new Date()).getMilliseconds();
                var count = 1;
                var fps = 0;
                return function () {
                    var currentLoop = (new Date()).getMilliseconds();
                    if (lastLoop > currentLoop) {
                        fps = count;
                        count = 1;
                    }
                    else {
                        count += 1;
                    }
                    lastLoop = currentLoop;
                    return fps;
                };
            })();
            this.tick = function () {
                if (!_this.active) {
                    return;
                }
                window.requestAnimationFrame(function () {
                    $("#active").text(_this.active);
                    $("#fps").text(_this.countFPS());
                    _this.tick();
                });
                _this.player.process();
                var playerDetails = "";
                playerDetails += _this.player.str;
                $("#playerDetails").text(playerDetails);
            };
            this.setup();
            this.active = false;
        }
        Game.prototype.setup = function () {
            this.player = new Funesti.Player();
        };
        Game.prototype.start = function () {
            this.active = true;
            this.tick();
        };
        Game.prototype.stop = function () {
            this.active = false;
        };
        return Game;
    })();
})(Funesti || (Funesti = {}));
var Funesti;
(function (Funesti) {
    var Entity = (function () {
        function Entity() {
        }
        Entity.prototype.process = function () {
            this.processBuffs();
        };
        Entity.prototype.processBuffs = function () {
            this._buffStr = 0;
            this._buffInt = 0;
            this._buffAgi = 0;
            if (this._buffs == null) {
                return;
            }
            for (var _i = 0, _a = this._buffs; _i < _a.length; _i++) {
                var currBuff = _a[_i];
                if (!currBuff.valid()) {
                    currBuff.remove();
                }
                else {
                    currBuff.apply();
                }
            }
        };
        Entity.prototype.hasBuff = function (buff) {
            if (this._buffs == null) {
                return false;
            }
            for (var i in this._buffs) {
                if (this._buffs[i].id == buff.id) {
                    return i;
                }
            }
            return false;
        };
        Entity.prototype.addBuff = function (buff) {
            if (this._buffs == null)
                this._buffs = [];
            if (this.hasBuff(buff) == false)
                this._buffs.push(buff);
        };
        Entity.prototype.removeBuff = function (buff) {
            if (this._buffs == null) {
                return;
            }
            var buffIndex = this.hasBuff(buff);
            if (buffIndex >= 0) {
                this._buffs.splice(buffIndex, 1);
            }
        };
        Object.defineProperty(Entity.prototype, "str", {
            get: function () {
                return (this._baseStr || 0) + (this._buffStr || 0);
            },
            set: function (str) {
                this._baseStr = str;
            },
            enumerable: true,
            configurable: true
        });
        return Entity;
    })();
    Funesti.Entity = Entity;
})(Funesti || (Funesti = {}));
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Funesti;
(function (Funesti) {
    var Monster = (function (_super) {
        __extends(Monster, _super);
        function Monster() {
            _super.call(this);
        }
        return Monster;
    })(Funesti.Entity);
})(Funesti || (Funesti = {}));
var Funesti;
(function (Funesti) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player() {
            _super.call(this);
        }
        return Player;
    })(Funesti.Entity);
    Funesti.Player = Player;
})(Funesti || (Funesti = {}));
var Funesti;
(function (Funesti) {
    var OpDamageBuff = (function () {
        function OpDamageBuff() {
            this.id = 1;
            this.visible = true;
            this.isLimited = true;
            this.duration = 5000;
        }
        OpDamageBuff.prototype.attach = function (ent) {
            this.appliedTo = ent;
            this.appliedTo.addBuff(this);
            this.activatedOn = (new Date()).getTime();
            this.apply();
        };
        OpDamageBuff.prototype.valid = function () {
            var now = (new Date()).getTime();
            if (now > (this.activatedOn + this.duration)) {
                return false;
            }
            else {
                return true;
            }
        };
        OpDamageBuff.prototype.apply = function () {
            if (this.appliedTo == null) {
                throw "Buff needs to be attached to an entity before applying it.";
            }
            this.appliedTo._buffStr += 1000;
            this.appliedTo._buffInt += 1000;
            this.appliedTo._buffAgi += 1000;
        };
        OpDamageBuff.prototype.remove = function () {
            this.appliedTo.removeBuff(this);
        };
        return OpDamageBuff;
    })();
})(Funesti || (Funesti = {}));
//# sourceMappingURL=tsc.js.map