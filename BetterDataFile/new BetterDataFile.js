var BetterDataFile = (function() {
    const createFile = function(fileName) {
        var json = ''
    
        for(var i = 0; i < DataFile.GetKey(fileName, '_'); i++) {
            json += DataFile.GetKey(fileName, '_' + i.toString())
        }
    
        try {
            files[fileName] = JSON.parse(json)
        } catch(error) {
            files[fileName] = {}
        }
        
        Object.defineProperties(files[fileName], {
            fileName: {
                value: fileName
            },

            Load: {
                value: function() {
                    return data.Load(this.fileName)
                }
            },

            Save: {
                value: function() {
                    return data.Save(this.fileName)
                }
            },
        })
    }

    const files = {}
    const data = function(fileName) {
        if(!(fileName in files)) {
            createFile(fileName)
        }

        return files[fileName]
    }
    
    data.Load = function(fileName) {
        DataFile.Load(fileName)

        createFile(fileName)

        return files[fileName]
    }

    data.Save = function(fileName) { 
        const jsonStringified = JSON.stringify(files[fileName])
        const previousLength = DataFile.GetKey(fileName, '_')
        const length = Math.ceil(jsonStringified.length / 255)
    
        for(var i = length; i < previousLength; i++) {
            DataFile.EraseKey(fileName, '_' + i.toString())
        }
    
        DataFile.SetKey(fileName, '_', length.toString())
    
        for(var i = 0; i < length; i++) {
            DataFile.SetKey(fileName, '_' + i.toString(), jsonStringified.slice(i++ * 255, i * 255))
        }
    
        DataFile.Save(fileName)

        return files[fileName]
    }
    
    return data
})()

exports.BetterDataFile = BetterDataFile
