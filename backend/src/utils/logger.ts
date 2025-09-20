function info(...msg: string[]) {
  console.log(...msg)
}

function error(...msg: string[]) {
  console.error(...msg)
}

export default {
  info,
  error
}
