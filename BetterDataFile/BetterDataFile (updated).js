function _BetterDataFile() {
  this.files = {}

  function _SetObjectValue(object, path, value) {
    var newObject = object

    if(path.length == 0) 
      return value

    if(typeof path[0] != "string") 
      throw "[BetterDataFile] SetValue error: Path items must be strings, found " + path[0]

    if(typeof newObject != "object" && !Array.isArray(newObject)) 
      newObject = {}

    if(path.length == 1) {
      newObject[path[0]] = value

      return newObject
    }

    if(!(path[0] in newObject))
      newObject[path[0]] = {}
    
    newObject[path[0]] = _SetObjectValue(newObject[path[0]], path.slice(1, Infinity), value)
    
    return newObject
  }

  function _DeleteObjectValue(object, path) {
    var newObject = object

    if(path.length == 0) 
      return undefined

    if(typeof path[0] != "string") 
      throw "[BetterDataFile] DeleteValue error: Path items must be strings, found " + path[0]

    if(!(path[0] in newObject)) 
      throw "[BetterDataFile] DeleteValue error: Invalid Path, found " + path[0]

    if(path.length == 1) {
      delete newObject[path[0]]

      return newObject
    }

    newObject[path[0]] = _DeleteObjectValue(newObject[path[0]], path.slice(1, Infinity))

    return newObject
  }

  function _GetValue(fileName, key) {
    const keyLength = parseInt(DataFile.GetKey(fileName, key))
    var json = ""

    if(isNaN(keyLength)) 
      return json

    for(var i = 1; i <= keyLength; i++)
      json += DataFile.GetKey(fileName, key + i.toString())

    try {
      json = JSON.parse(json)
    } catch(_) {}

    return json
  }

  this.Load = function(fileName) {
    if(typeof fileName != "string") 
      throw new Error("[BetterDataFile] GetValue error: FileName must be a string, found " + fileName)

    DataFile.Load(fileName)

    const keys = _GetValue(fileName, "______keys______") || []

    if(!(fileName in this.files))
      this.files[fileName] = {}

    this.files[fileName].values = {}

    for(var i in keys)
      this.files[fileName].values[keys[i]] = _GetValue(fileName, keys[i])
  }

  this.GetValue = function(fileName, path) {
    if(typeof fileName != "string") 
      throw new Error("[BetterDataFile] GetValue error: FileName must be a string, found " + fileName)
    
    if(!Array.isArray(path)) 
      throw new Error("[BetterDataFile] GetValue error: Path must be an array, found " + path)

    if(typeof path[0] != "string") 
      throw new Error("[BetterDataFile] GetValue error: Path items must be strings, found " + path[0])

    if(!(fileName in this.files))
      this.Load(fileName)

    var json = this.files[fileName].values[path[0]]

    for(var i = 1; i < path.length; i++) {
      if(typeof path[i] != "string") 
        throw new Error("[NewDataFile] GetValue error: Path items must be strings, found " + path[i])

      if(!(path[i] in json))
        throw new Error("[NewDataFile] GetValue error: Invalid Path, found " + path[i])

      json = json[path[i]]
    }

    return json
  }

  this.SetValue = function(fileName, path, value) {
    if(typeof fileName != "string") 
      throw new Error("[BetterDataFile] SetValue error: FileName must be a string, found " + fileName)

    if(!Array.isArray(path)) 
      throw new Error("[BetterDataFile] SetValue error: Path must be an array, found " + path)
    
    if(typeof path[0] != "string") 
      throw new Error("[BetterDataFile] SetValue error: Path items must be strings, found " + path[0])

    if(!(fileName in this.files))
      this.Load(fileName)

    const json = _SetObjectValue(this.GetValue(fileName, [path[0]]), path.slice(1), value)
    const jsonStringified = JSON.stringify(json)
    const keyLength = Math.ceil(jsonStringified.length / 255)
    const length = DataFile.GetKey(fileName, path[0])

    this.files[fileName].values[path[0]] = json

    for(var i = 1; i <= length; i++)
      DataFile.SetKey(fileName, path[0] + i.toString(), "")

    DataFile.SetKey(fileName, path[0], keyLength.toString())

    for(var i = 1; i <= keyLength; i++)
      DataFile.SetKey(fileName, path[0] + i.toString(), jsonStringified.slice((i - 1) * 255, i * 255))

    return path
  }

  this.DeleteValue = function(fileName, path) {
    if(typeof fileName != "string") 
      throw new Error("[BetterDataFile] DeleteValue error: FileName must be a string, found " + fileName)
    
    if(!Array.isArray(path))
      throw new Error("[BetterDataFile] DeleteValue error: Path must be an array, found " + path)
    
    if(typeof path[0] != "string")
      throw new Error("[BetterDataFile] DeleteValue error: Path items must be strings, found " + path[0])

    if(!(fileName in this.files))
      this.Load(fileName)

    if(path.length == 1) {
      const json = this.GetValue(fileName, path)
      const length = DataFile.GetKey(fileName, path[0])

      DataFile.SetKey(fileName, path[0], "")

      for(var i = 1; i <= length; i++)
        DataFile.SetKey(fileName, path[0] + i.toString(), "")

      delete this.files[fileName].values[path[0]]

      return json
    }
    
    const json = _DeleteObjectValue(this.GetValue(fileName, [path[0]]), path.slice(1, Infinity))
    const jsonStringified = JSON.stringify(json)
    const keyLength = Math.ceil(jsonStringified.length / 255)
    const length = DataFile.GetKey(fileName, path[0])

    this.files[fileName].values[path[0]] = json

    for(var i = 1; i <= length; i++)
      DataFile.SetKey(fileName, path[0] + i.toString(), "")

    DataFile.SetKey(fileName, path[0], keyLength.toString())

    for(var i = 1; i <= keyLength; i++)
      DataFile.SetKey(fileName, path[0] + i.toString(), jsonStringified.slice((i - 1) * 255, i * 255))

    return json
  }

  this.GetKeys = function(fileName) {
    if(!(fileName in this.files))
      this.Load(fileName)

    const keys = []

    for(var i in this.files[fileName].values)
      keys.push(i)

    return keys
  }

  this.Save = function(fileName) {
    if(typeof fileName != "string") 
      throw new Error("[BetterDataFile] Save error: FileName must be a string, found " + fileName)

    DataFile.Save(fileName)
  }
}

exports.BetterDataFile = _BetterDataFile
