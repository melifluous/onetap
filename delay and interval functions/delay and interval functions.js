function delay(callback, milliseconds) {
    const registeredSymbol = Symbol.for("isDelayRegistered?")
    const delayCallbacksSymbol = Symbol.for("delayCallbacks")
    const delaySymbol = Symbol()

    if(typeof callback == "function" && typeof milliseconds == "number") {
        if(!this[delayCallbacksSymbol])
            this[delayCallbacksSymbol] = {}

        this[delayCallbacksSymbol][delaySymbol] = { callback: callback, milliseconds: milliseconds, start: Date.now() }

        if(this[registeredSymbol] !== true) {
            this[registeredSymbol] = true

            Cheat.RegisterCallback("Draw", "delay")
        }
    } else {
        const symbols = Object.getOwnPropertySymbols(this[delayCallbacksSymbol])

        for(var i = 0; i < symbols.length; i++) {
            const intervalObject = this[delayCallbacksSymbol][symbols[i]]
            const difference = Date.now() - intervalObject.start

            if(difference >= intervalObject.milliseconds) {    
                intervalObject.callback()

                delete this[delayCallbacksSymbol][symbols[i]]
            }
        }
    }

    return delaySymbol
}

function clearDelay(intervalSymbol) {
    const delayCallbacksSymbol = Symbol.for("delayCallbacks")

    delete this[delayCallbacksSymbol][intervalSymbol]
}

function interval(callback, milliseconds, executeImmediately) {
    const isRegisteredSymbol = Symbol.for("isIntervalRegistered?")
    const intervalCallbacksSymbol = Symbol.for("intervalCallbacks")
    const intervalSymbol = Symbol()

    if(typeof callback == "function" && typeof milliseconds == "number") {
        if(!this[intervalCallbacksSymbol])
            this[intervalCallbacksSymbol] = {}

        if(executeImmediately === true)
            callback()

        this[intervalCallbacksSymbol][intervalSymbol] = { callback: callback, milliseconds: milliseconds, start: Date.now(), lastExecution: Date.now() }

        if(this[isRegisteredSymbol] !== true) {
            this[isRegisteredSymbol] = true

            Cheat.RegisterCallback("Draw", "interval")
        }
    } else {
        const symbols = Object.getOwnPropertySymbols(this[intervalCallbacksSymbol])

        for(var i = 0; i < symbols.length; i++) {
            const intervalObject = this[intervalCallbacksSymbol][symbols[i]]
            const difference = Date.now() - intervalObject.lastExecution

            if(difference >= intervalObject.milliseconds) {    
                intervalObject.callback()
                intervalObject.lastExecution += intervalObject.milliseconds
            }
        }
    }

    return intervalSymbol
}

function clearInterval(delaySymbol) {
    const intervalCallbacksSymbol = Symbol.for("intervalCallbacks")

    delete this[intervalCallbacksSymbol][delaySymbol]
}
