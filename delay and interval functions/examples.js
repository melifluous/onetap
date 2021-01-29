const aaa = interval(function() {
    Cheat.Print("teste\n")
}, 1000)

delay(function() {
    clearInterval(aaa)
}, 4000)
