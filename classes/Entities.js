/**
 * @class CSEntity
 * @param {number} entityIndex 
 */
function CSEntity(entityIndex) {
  this.entityIndex = entityIndex

  /** 
   * @method getSteamID gets SteamID of entity
   * @returns {number} SteamID
   */
  this.getSteamID = function() {
    return Entity.GetSteamID(this.entityIndex)
  }

  /**
   * @method disableESP disables ESP of entity
   */
  this.disableESP = function() {
    Entity.DisableESP(this.entityIndex)
  }

  /**
   * @method drawFlag draws an extra flag on entity
   * @param {string} text 
   * @param {number[]} color r, g, b, a
   */
  this.drawFlag = function(text, color) {
    Entity.DrawFlag(this.entityIndex, text, color)
  }

  /**
   * @method getCCSWeaponInfo gets weapon info
   * @returns {object} properties list
   */
  this.getCCSWeaponInfo = function() {
    return Entity.GetCCSWeaponInfo(this.entityIndex)
  }

  /**
   * @method getRenderBox gets the render box of entity
   * @returns {number[]} state, min x, min y, max x, max y
   */
  this.getRenderBox = function() {
    return Entity.GetRenderBox(this.entityIndex)
  }

  /**
   * @method getWeapons gets all weapons of entity
   * @returns {entity[]} weapons entity
   */
  this.getWeapons = function() {
    return Entity.GetWeapons(this.entityIndex).map(function(weapon) {
      return new CSEntity(weapon)
    })
  }

  /**
   * @method getWeapon gets the current weapon of entity
   * @returns {number} weapon entity
   */
  this.getWeapon = function() {
    return new CSEntity(Entity.GetWeapon(this.entityIndex))
  }

  /**
   * @method getHitboxPosition gets the position of entity's hitbox
   * @param {number} hitboxIndex
   * @returns {number[]} x, y, z
   */
  this.getHitboxPosition = function(hitboxIndex) {
    return Entity.GetHitboxPosition(this.entityIndex, hitboxIndex)
  }

  /**
   * @method getEyePosition gets the position of entity's eye
   * @returns {number[]} x, y, z
   */
  this.getEyePosition = function() {
    return Entity.GetEyePosition(this.entityIndex)
  }

  /**
   * @method isBot checks if entity is a bot
   * @returns {boolean} boolean
   */
  this.isBot = function() {
    return Entity.IsBot(this.entityIndex)
  }

  /**
   * @method isEnemy checks if entity is an enemy
   * @returns {boolean} boolean
   */
  this.isEnemy = function() {
    return Entity.IsEnemy(this.entityIndex)
  }

  /**
   * @method isTeammate checks if entity is a teammate
   * @returns {boolean} boolean
   */
  this.isTeammate = function() {
    return Entity.IsTeammate(this.entityIndex)
  }

  /**
   * @method isLocalPlayer checks if entity is the local entity
   * @returns {boolean} boolean
   */
  this.isLocalPlayer = function() {
    return Entity.IsLocalPlayer(this.entityIndex)
  }

  /**
   * @method isPlayer checks if entity is a entity
   * @returns {boolean} boolean
   */
  this.isPlayer = function() {
    return Entity.IsTeammate(this.entityIndex) || Entity.IsEnemy(this.entityIndex)
  }

  /**
   * @method isAlive checks if entity is alive
   * @returns {boolean} boolean
   */
  this.isAlive = function() {
    return Entity.IsAlive(this.entityIndex)
  }

  /**
   * @method isDormant checks if entity is dormant
   * @returns {boolean} boolean
   */
  this.isDormant = function() {
    return Entity.IsDormant(this.entityIndex)
  }

  /**
   * @method isValid checks if entity is valid
   * @returns {boolean} boolean
   */
  this.isValid = function() {
    return Entity.IsValid(this.entityIndex)
  }

  /**
   * @method setProp overrides property values
   * @param {string} tableName
   * @param {string} propertyName
   * @param {*} newValue
   */
  this.setProp = function(tableName, propertyName, newValue) {
    Entity.SetProp(this.entityIndex, tableName, propertyName, newValue)
  }

  /**
   * @method getProp gets property values
   * @param {string} tableName
   * @param {string} propertyName
   * @returns {*} property value
   */
  this.getProp = function(tableName, propertyName) {
    Entity.GetProp(this.entityIndex, tableName, propertyName)
  }

  /**
   * @method getFlags gets the flags of entity
   * @returns {number} entity flags
   */
  this.getFlags = function() {
    return Entity.GetProp(this.entityIndex, "CBasePlayer", "m_fFlags")
  }

  /**
   * @method getVecVelocity gets the velocity vector of entity
   * @returns {number[]} entity vector velocity
   */
  this.getVecVelocity = function() {
    return Entity.GetProp(this.entityIndex, "CBasePlayer", "m_vecVelocity[0]")
  }

  /**
   * @method getVelocity gets the velocity of entity
   * @returns {number} entity velocity
   */
  this.getVelocity = function() {
    const vecVelocity = Entity.GetProp(this.entityIndex, "CBasePlayer", "m_vecVelocity[0]")

    return Math.hypot(vecVelocity[0], vecVelocity[1], vecVelocity[2])
  }

  /**
   * @method getViewAngles gets the view angle of entity
   * @returns {number} entity vector velocity
   */
  this.getViewAngles = function() {
    return Entity.GetProp(this.entityIndex, "CCSPlayer", "m_angEyeAngles")
  }

  /**
   * @method getRenderOrigin gets the position of entity
   * @returns {number[]} x, y, z
   */
  this.getRenderOrigin = function() {
    return Entity.GetRenderOrigin(this.entityIndex)
  }

  /**
   * @method getName gets the name of entity
   * @returns {string} entity name
   */
  this.getName = function() {
    return Entity.GetName(this.entityIndex)
  }

  /**
   * @method getClassName gets the class name of entity
   * @returns {string} class name
   */
  this.getClassName = function() {
    return Entity.getClassName(this.entityIndex)
  }

  /**
   * @method getClassID gets the class ID of entity
   * @returns {number} class ID
   */
  this.getClassID = function() {
    return Entity.getClassID(this.entityIndex)
  }
}

/**
 * @class Entities
 * @returns {CSEntity[]} all entities
 */
function Entities() {
  return Entity.GetEntities().map(function(entity) {
    return new CSEntity(entity)
  })
}

/**
 * @memberof Entities
 * @function getEntityFromUserID gets the entity of given user ID
 * @param {number} userID
 * @returns {CSEntity} game rules entity
 */
Entities.getEntityFromUserID = function(userID) {
  return new CSEntity(Entity.GetEntityFromUserID(userID))
}

/**
 * @memberof Entities
 * @function getGameRulesProxy gets the game rules entity
 * @returns {CSEntity} game rules entity
 */
Entities.getGameRulesProxy = function() {
  return new CSEntity(Entity.GetGameRulesProxy())
}

/**
 * @memberof Entities
 * @function getEntitiesByClassID gets entities of given class ID 
 * @param {number} classID
 * @returns {CSEntity[]} entities
 */
Entities.getEntitiesByClassID = function(classID) {
  return Entity.GetEntitiesByClassID(classID).map(function(entity) {
    return new CSEntity(entity)
  })
}

/**
 * @memberof Entities
 * @function getLocalPlayer gets the local player entity 
 * @returns {CSEntity} local player
 */
Entities.getLocalPlayer = function() {
  return new CSEntity(Entity.GetLocalPlayer())
} 

/**
 * @memberof Entities
 * @function getTeammates gets teammates entities 
 * @returns {CSEntity[]} teammates entities 
 */
Entities.getTeammates = function() {
  return Entity.GetTeammates().map(function(teammate) {
    return new CSEntity(teammate)
  })
} 

/**
 * @memberof Entities
 * @function getEnemies gets enemies entities 
 * @returns {CSEntity[]} enemies entities 
 */
Entities.getEnemies = function() {
  return Entity.GetEnemies().map(function(enemy) {
    return new CSEntity(enemy)
  })
} 

/**
 * @memberof Entities
 * @function getPlayers gets players entities 
 * @returns {CSEntity[]} players entities 
 */
Entities.getPlayers = function() {
  return Entity.GetPlayers().map(function(player) {
    return new CSEntity(player)
  })
} 

/**
 * @memberof Entities
 * @function getBots gets bots entities 
 * @returns {CSEntity[]} bots entities 
 */
Entities.getBots = function() {
  return Entity.GetPlayers().filter(function(player) {
    return Entity.IsBot(player)
  }).map(function(bot) {
    return new CSEntity(bot)
  })
} 
