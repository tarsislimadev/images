
export class Request {
  LINE_BREAK = '\r\n'
  method = null
  pathname = null
  query = {}
  version = null
  headers = new Headers()
  body = null

  constructor(data = '') {
    this.parseRequestString(data.toString())
  }

  parseRequestString(str = '') {
    const [all_headers, body] = str.split(this.LINE_BREAK + this.LINE_BREAK)

    this.body = body

    const [first, ...raw_headers] = all_headers.split(this.LINE_BREAK)

    const [method, pathname, version] = first.split(' ')

    this.method = method

    this.version = version

    const [path, query = ''] = pathname.split('?')

    this.pathname = path

    this.query = query.split('&').map((q) => q.split('=')).reduce((q, [key, value]) => ({ ...q, [key]: value }), {})

    this.version = version

    Array.from(raw_headers).map((header) => header.split(': ')).map(([key, value = '']) => this.headers.set(key, value))
  }

  toJSON() {
    const { method, pathname, query, version, headers, body } = this
    return { method, pathname, query, version, headers, body }
  }

  toString() {
    return JSON.stringify(this.toJSON())
  }
}
