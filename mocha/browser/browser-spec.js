window.cache = require('../../index.js')
window.ndn = require('ndn-lib')
var utils = require('ndn-utils')


var na = new ndn.Name("something").append(utils.initSegment(0))
  , interest = new ndn.Interest(na)
  , content = "hello world"
  , si = new ndn.SignedInfo()
  , data = new ndn.Data(na, si, content)
si.setFreshnessPeriod(1000)
data.signedInfo.setFreshnessPeriod(1000)
data.signedInfo.setFields()
data.sign()

var encodedData = data.wireEncode().buffer
  , element = interest.wireEncode().buffer

var newTimeout = function(func, sec) {
  return new setTimeout(func, sec)
}

var initialCheck = false
var dataInserted = false
var cacheHit = false
describe('cache',function(){
  it('should trigger cache miss callback', function(done){
    cache.check(interest,element, null, function(){
      console.log(fail)
    }, function(){
      done()
    })

  })
  it('should accept data', function(done){
  function cb(err){
    if (!err) {
      done()
    } else {
      console.log(err)
    }
  }
     cache.data(data, encodedData, cb)
  })
  it('should trigger cache hit', function(done){
     cache.check(interest, element, null, function(a, b){
       done()

     },function(){
       console.log('fail')
     });
  })
  it('should trigger cache miss after timeout',function(done){
    this.timeout(3000)
    setTimeout(function(){
      cache.check(interest, element, null, function(a, b){
          console.log(a,b)
        }, function(a,b){
          done()
        })
    }, 1500)
  })
})
