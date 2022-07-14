const { getHashes } = require('crypto')
const fs = require('fs')

// 通过 Promise 封装 readFile
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
  console.log('f1: ', f1.toString())
  console.log('f2: ', f2.toString())
}

// 默认写法
const runDef = (fn) => {
  const g = fn()
  g.next().value.then((data) => {
    // g.next(data) 传递读取的数据到外部，即使用f1读取data
    g.next(data).value.then((data) => {
      g.next(data)
    })
  })
}

runDef(gen)

// 自动执行器
/*
  1. 获取迭代对象
  2. 读取文件数据
  3. 文件数据传出
  4. 终止执行
 */
const run = (fun) => {
  const g = fun() // 获取迭代对象
  function next(data) {
    // data - result - data
    // #1 undefined - f1.promise - f1-content
    // #2 f1-content - f2.promise - f2-content
    // #3 f2-content - return
    const result = g.next(data)
    if (result.done) return result.value
    result.value.then((data) => {
      next(data)
    })
  }
}

run(gen)
