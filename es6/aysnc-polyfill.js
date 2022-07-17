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

function spawn() {
  
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

try {
  fn()
} catch (error) {
  console.log('error', error)
}
