Array.prototype.avgOfLast200 = function (index, prop) {
  var total = 0
  for ( var i = 0, _len = this.length; i < 200; i++ ) {
    total += Number(this[index - i][prop])
  }
  return Number((total/200).toFixed(2))
}

Array.prototype.avgOfLast124 = function (index, prop) {
  var total = 0
  for ( var i = 0, _len = this.length; i < 120; i++ ) {
    total += Number(this[index - i][prop])
  }
  return Number((total/120).toFixed(2))
}