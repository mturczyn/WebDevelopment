class CoffeeMachine {
    _waterAmount = 0;

    set waterAmount(value) {
        if (value < 0) throw new Error("Negative water");
        this._waterAmount = value;
    }

    get waterAmount() {
        return this._waterAmount;
    }

    constructor(power) {
        this._power = power;
    }

}

function coffeeMachineTests() {
    // create the coffee machine
    let coffeeMachine = new CoffeeMachine(100);

    // add water
    coffeeMachine.waterAmount = -10; // Error: Negative water
}