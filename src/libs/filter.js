const NumFormat = function (value) {
  if (!value) {
    return '0.00'
  }
  value = String(value)
  var intPart = Number(value).toFixed(0)
  var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  var floatPart = ''
  var value2Array = value.split('.')
  if (value2Array.length === 2) {
    floatPart = value2Array[1].toString()
    if (floatPart.length === 1) {
      return intPartFormat + '.' + floatPart + '0'
    } else {
      return intPartFormat + '.' + floatPart
    }
  } else {
    return intPartFormat + floatPart
  }
}

export default {
  NumFormat
}
