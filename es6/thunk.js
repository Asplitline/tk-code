const fs = require('fs')

const readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function (error, data) {
      if (error) return reject(error)
      resolve(data)
    })
  })
}

const gen = function* () {
  const f1 = yield readFile('./file/a.txt')
  const f2 = yield readFile('./file/b.txt')
  console.log(f1.toString())
  console.log(f2.toString())
}

const run = (fn) => {
  const it = fn()
  const next = (data) => {
    const result = it.next(data)
    if (result.done) return result.value
    result.value.then((data) => {
      next(data)
    })
  }
  next()
}

run(gen)
