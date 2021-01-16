function _BetterDataFile() {
  function SetObjectValue(Obj, Path, Value) {
    var NewObj = Obj
    
    if(Path.length == 0) 
      return Value

    if(typeof Path[0] != "string") 
      throw "[NewDataFile] SetValue error: Path items must be strings, found " + Path[0]

    if(typeof NewObj != "object" && !Array.isArray(NewObj)) 
      NewObj = {}

    if(Path.length == 1) {
      NewObj[Path[0]] = Value

      return NewObj
    }

    if(!NewObj[Path[0]]) 
      NewObj[Path[0]] = {}
    
    NewObj[Path[0]] = SetObjectValue(NewObj[Path[0]], Path.slice(1, Infinity), Value)
    
    return NewObj
  }

  function DeleteObjectValue(Obj, Path) {
    var NewObj = Obj

    if(Path.length == 0) 
      return undefined

    if(typeof Path[0] != "string") 
      throw "[NewDataFile] DeleteValue error: Path items must be strings, found " + Path[0]

    if(!NewObj[Path[0]]) 
      throw "[NewDataFile] DeleteValue error: Invalid Path, found " + Path[0]

    if(Path.length == 1) {
      delete NewObj[Path[0]]

      return NewObj
    }

    if(!NewObj[Path[0]]) 
      NewObj[Path[0]] = {}

    NewObj[Path[0]] = DeleteObjectValue(NewObj[Path[0]], Path.slice(1, Infinity))

    return NewObj
  }

  DataFile.GetValue = function(FileName, Path) {
    if(typeof FileName != "string") 
      throw "[NewDataFile] GetValue error: FileName must be a string, found " + FileName
    
    if(!Array.isArray(Path)) 
      throw "[NewDataFile] GetValue error: Path must be an array, found " + Path

    if(typeof Path[0] != "string") 
      throw "[NewDataFile] GetValue error: Path items must be strings, found " + Path[0]

    const KeyLength = parseInt(DataFile.GetKey(FileName, Path[0]))

    if(isNaN(KeyLength)) 
      return ""
    
    var Json = ""

    for(var i = 1; i <= KeyLength; i++)
      Json += DataFile.GetKey(FileName, Path[0] + i.toString())//.toString()

    try {
      Json = JSON.parse(Json)

      for(var i = 1; i < Path.length; i++) {
        if(typeof Path[i] != "string") 
          throw "[NewDataFile] GetValue error: Path items must be strings, found " + Path[i]

        if(Json) 
          Json = Json[Path[i]]
      }
    } catch(_) {}

    return Json
  }

  DataFile.SetValue = function(FileName, Path, Value) {
    if(typeof FileName != "string") 
      throw "[NewDataFile] SetValue error: FileName must be a string, found " + FileName

    if(!Array.isArray(Path)) 
      throw "[NewDataFile] SetValue error: Path must be an array, found " + Path
    
    if(typeof Path[0] != "string") 
      throw "[NewDataFile] SetValue error: Path items must be strings, found " + Path[0]

    const Json = SetObjectValue(DataFile.GetValue(FileName, [Path[0]]), Path.slice(1, Infinity), Value)
    const Jstring = JSON.stringify(Json)
    const KeyLength = Math.ceil(Jstring.length / 255)
    const _length = DataFile.GetKey(FileName, Path[0])

    for(var i = 1; i <= _length; i++)
      DataFile.SetKey(FileName, Path[0] + i.toString(), "")

    DataFile.SetKey(FileName, Path[0], KeyLength.toString())

    for(var i = 1; i <= KeyLength; i++)
      DataFile.SetKey(FileName, Path[0] + i.toString(), Jstring.slice((i - 1) * 255, i * 255))

    return Path
  }

  DataFile.DeleteValue = function(FileName, Path) {
    if(typeof FileName != "string") 
      throw "[NewDataFile] DeleteValue error: FileName must be a string, found " + FileName
    
    if(!Array.isArray(Path))
      throw "[NewDataFile] DeleteValue error: Path must be an array, found " + Path
    
    if(typeof Path[0] != "string")
      throw "[NewDataFile] DeleteValue error: Path items must be strings, found " + Path[0]

    if(Path.length == 1) {
      const Json = DataFile.GetValue(FileName, Path)

      DataFile.SetKey(FileName, Path[0], "0")

      return Json
    }
    
    const Json = DeleteObjectValue(DataFile.GetValue(FileName, [Path[0]]), Path.slice(1, Infinity))
    const Jstring = JSON.stringify(Json)
    const KeyLength = Math.ceil(Jstring.length / 255)
    const _length = DataFile.GetKey(FileName, Path[0])

    for(var i = 1; i <= _length; i++)
      DataFile.SetKey(FileName, Path[0] + i.toString(), "")

    DataFile.SetKey(FileName, Path[0], KeyLength.toString())

    for(var i = 1; i <= KeyLength; i++)
      DataFile.SetKey(FileName, Path[0] + i.toString(), Jstring.slice((i - 1) * 255, i * 255))

    return Json
  }
}

exports.BetterDataFile = _BetterDataFile