const { protocol, hostname, port } = window.location
const pathname = port? '/lddesign.ru/public/' : '/'
const BASE_URL = protocol + '//' + hostname + pathname

export { BASE_URL }
