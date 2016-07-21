var self;

function Game() {
    /**
     * init the game.
     **/
    this.width = 10;
    this.height = 10;
    this.board = document.querySelectorAll("#board div");

    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;

    this.scoreElement = document.querySelector("#score span");

    // start game
    self = this;
    this.handler = setInterval(this.tick, 250);
    document.addEventListener("keydown", this.keyboard);
}

Game.prototype.position = function(x, y) {
    return x + y * this.height;

}
Game.prototype.render = function() {
    for (var i = 0; i < this.board.length; i++) {
        this.board[i].classList.remove("furry");
    }

    // rendering coin
    var coinField = this.position(this.coin.x, this.coin.y);
    this.board[coinField].classList.add("coin");

    // rendering Furry
    var furryField = this.position(this.furry.x, this.furry.y);
    this.board[furryField].classList.add("furry");
};

Game.prototype.check = function() {

    // checking borders
    if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
        clearInterval(this.handler);
        document.querySelector("#board").classList.add("hide");
        document.querySelector("#game-over").classList.remove("hide");
    }

    // checking coin and Furry position
    var pos = this.position(this.furry.x, this.furry.y);
    if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
        this.score++;
        this.scoreElement.innerHTML = this.score;
        this.board[pos].classList.remove("coin");
        this.coin = new Coin();
    }
};

Game.prototype.keyboard = function(event) {
    var key = event.which;
    switch (key) {
        case 37:
            self.furry.direction = "left";
            break;
        case 38:
            self.furry.direction = "up";
            break;
        case 39:
            self.furry.direction = "right";
            break;
        case 40:
            self.furry.direction = "down";
            break;
    }
};

Game.prototype.tick = function() {
    self.check();
    switch (self.furry.direction) {
        case "up":
            self.furry.y--;
            break;
        case "down":
            self.furry.y++;
            break;
        case "left":
            self.furry.x--;
            break;
        case "right":
            self.furry.x++;
            break;
    }
    self.render();
};

function Furry() {
    this.x = 0;
    this.y = 0;
    this.direction = "right";
}

function Coin() {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
}

document.addEventListener("DOMContentLoaded", function() {

    var game = new Game();

});
