function delay(callback, milliseconds) {
    const registeredSymbol = Symbol.for("isDelayRegistered?")
    const delayCallbacksSymbol = Symbol.for("delayCallbacks")

    if(typeof callback == "function" && typeof milliseconds == "number") {
        const delaySymbol = Symbol()

        if(!this[delayCallbacksSymbol])
            this[delayCallbacksSymbol] = {}

        this[delayCallbacksSymbol][delaySymbol] = { callback: callback, milliseconds: milliseconds, start: Date.now() }

        if(this[registeredSymbol] !== true) {
            this[registeredSymbol] = true

            Cheat.RegisterCallback("Draw", "delay")
        }

        return delaySymbol
    } else {
        const symbols = Object.getOwnPropertySymbols(this[delayCallbacksSymbol])

        for(var i = 0; i < symbols.length; i++) {
            const delayObject = this[delayCallbacksSymbol][symbols[i]]
            const difference = Date.now() - delayObject.start

            if(difference >= delayObject.milliseconds) {    
                delayObject.callback()

                delete this[delayCallbacksSymbol][symbols[i]]
            }
        }
    }
}

function clearDelay(intervalSymbol) {
    delete this[Symbol.for("delayCallbacks")][intervalSymbol]
}

function interval(callback, milliseconds, executeImmediately) {
    const isRegisteredSymbol = Symbol.for("isIntervalRegistered?")
    const intervalCallbacksSymbol = Symbol.for("intervalCallbacks")

    if(typeof callback == "function" && typeof milliseconds == "number") {
        const intervalSymbol = Symbol()

        if(!this[intervalCallbacksSymbol])
            this[intervalCallbacksSymbol] = {}

        if(executeImmediately === true)
            callback()

        this[intervalCallbacksSymbol][intervalSymbol] = { callback: callback, milliseconds: milliseconds, start: Date.now(), lastExecution: Date.now() }

        if(this[isRegisteredSymbol] !== true) {
            this[isRegisteredSymbol] = true

            Cheat.RegisterCallback("Draw", "interval")
        }

        return intervalSymbol
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
}

function clearInterval(delaySymbol) {
    delete this[Symbol.for("intervalCallbacks")][delaySymbol]
}
