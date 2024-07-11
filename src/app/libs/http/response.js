// 

export class Response {
  LINE_BREAK = '\r\n'

  toString() {
    return Array.from([
      'HTTP/1.1 200 OK',
      '',
      '{}'
    ]).join(this.LINE_BREAK)
  }
}
