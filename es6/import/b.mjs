// export * as a 会忽略 default
export * as a from './a.mjs'
export { default as aDef } from './a.mjs'
export const b = 'b'
export default function () {
  console.log('bb')
}
