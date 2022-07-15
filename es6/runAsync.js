function asyncFunc(v, t) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(v)
    }, t * 1000)
  })
}

const list = [
  ['first', 3],
  ['second', 2],
  ['three', 1]
]

// 并发执行
// 1.Promise.all
async function runAsync1_1() {
  const promiseQueue = list.map(([x, y]) => asyncFunc(x, y))
  const res = await Promise.all(promiseQueue)
  console.log('res: ', res)
}
// runAsync1_1()

// 2.手动
async function runAsync1_2() {
  const p1 = asyncFunc(list[0][0], list[0][1])
  const p2 = asyncFunc(list[1][0], list[1][1])
  const p3 = asyncFunc(list[2][0], list[2][1])
  const result1 = await p1
  const result2 = await p2
  const result3 = await p3
  console.log('res :', [result1, result2, result3])
}
// runAsync1_2()

// 继发执行
// 1. reduce
async function runAsync2_1() {
  const res = []
  await list.reduce(async (pre, cur) => {
    // 保证执行顺序
    await pre
    const result = await asyncFunc(cur[0], cur[1])
    res.push(result)
  }, undefined)
  console.log('res', res)
}
// runAsync2_1()

// 2. for...of
async function runAsync2_2() {
  const res = []
  for (const [x, y] of list) {
    const result = await asyncFunc(x, y)
    res.push(result)
  }
  console.log('res', res)
}
runAsync2_2()
