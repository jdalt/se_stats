'use strict'

var fs = require('fs')
var _ = require('lodash')

let sports = JSON.parse(fs.readFileSync('./dist/sports.json'))

function statModules(sport) {
  return sports[sport].stats
}

_.each(sports, function(module, sport) {

  describe(sport, function() {
    it('should have unique stat type keys', function() {
      var keys = _.chain(module.stats).map((stat) => _.keys(stat.types)).flatten().value()
      expect(keys.length).toBe(_.uniq(keys).length)
    })
  })

})
