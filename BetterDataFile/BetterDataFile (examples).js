const BetterDataFile = new (require("BetterDataFile1.js")).BetterDataFile()

BetterDataFile.Load("fileName")
// Loads a DataFile

BetterDataFile.SetValue("fileName", ["path1", "path2"], value)
// Set a Value on a specific Path

BetterDataFile.GetValue("fileName", ["path1"])
// Get a Value from a specific Path

BetterDataFile.DeleteValue("fileName", ["path1"])
// Delete a Value from a specific Path

BetterDataFile.Save("fileName")
// Save all changes
