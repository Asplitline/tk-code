function asyncFunc(v, t) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(v)
    }, t)
  })
}

async function fn(args) {
  const res1 = await asyncFunc('fn1', 1000)
  const res2 = await asyncFunc('fn2', 2000)
  const res3 = await asyncFunc('fn3', 3000)
  // ...
  console.log(res1)
  console.log(res2)
  console.log(res3)
}

// 简易版
function spawn(gen) {
  const it = gen()

  const next = (data) => {
    const result = it.next(data)

    if (result.done) return result.value

    result.value.then((res) => {
      next(res)
    })
  }

  next()
}

// Promise版本
// 1. 返回值 Promise
// 2. await 后面可以是Promise或原始值，而co模块后面只能是thunk或Promise

function spawnPromise(gen) {
  return new Promise((resolve, reject) => {
    const it = gen()
    const next = (func) => {
      let result
      try {
        result = func()
      } catch (error) {
        reject(error)
      }
      if (result.done) {
        resolve(result.value)
      }
      // 保证原始值也有then方法
      Promise.resolve(result.value)
        .then((res) => {
          next(() => it.next(res))
        })
        .catch((err) => {
          next(() => it.thrown(err))
        })
    }

    next(() => it.next(undefined))
    // const next =
  })
}

function mockFn() {
  return spawn(function* () {
    const res1 = yield asyncFunc('fn1', 1000)
    const res2 = yield asyncFunc('fn2', 2000)
    const res3 = yield asyncFunc('fn3', 3000)
    // ...
    console.log(res1)
    console.log(res2)
    console.log(res3)
  })
}

function mockFnPromise() {
  return spawn(function* () {
    const res1 = yield asyncFunc('fn1', 1000)
    const res2 = yield asyncFunc('fn2', 2000)
    const res3 = yield asyncFunc('fn3', 3000)
    const res4 = yield 4
    // ...
    console.log(res1)
    console.log(res2)
    console.log(res3)
    console.log(res4)
  })
}

/* try {
  fn()
} catch (error) {
  console.log('error', error)
}

try {
  mockFn()
} catch (error) {
  console.log('error: ', error)
}
*/
try {
  mockFnPromise()
} catch (error) {
  console.log('error: ', error)
}
