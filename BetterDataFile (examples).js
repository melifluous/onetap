const BetterDataFile = new (require("BetterDataFile1.js")).BetterDataFile()

BetterDataFile.Load("fileName")

BetterDataFile.SetValue("fileName", ["path1", "path2"], value)

BetterDataFile.GetValue("fileName", ["path1"])

BetterDataFile.DeleteValue("fileName", ["path1"])

BetterDataFile.Save("fileName")
