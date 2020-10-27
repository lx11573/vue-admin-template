
const List = []
const count = 20

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'
function randomName(randomNext) {
  let name = ''
  let cur = ''
  for (let i = 0; i < randomNext; i++) {
    cur = 'abcdefghijklmnopqrstuvwxyz'.charAt(~~(Math.random() * 25))
    if (i === 0 || i % 10 === 1) {
      cur = cur.toUpperCase()
    }
    if (i % 10 === 0) {
      cur = ' '
    }
    name += cur
  }
  return name
}
export function ListFunc() {
  for (let i = 0; i < count; i++) {
    List.push({
      id: i + 1,
      timestamp: new Date(~~(Math.random() * 10) + 2010, ~~(Math.random() * 13), ~~(Math.random() * 29)),
      author: randomName(~~(Math.random() * 6) + 3),
      reviewer: randomName(~~(Math.random() * 8) + 3),
      title: randomName(~~(Math.random() * 80) + 30),
      content_short: 'mock data',
      content: baseContent,
      forecast: i + 10,
      importance: ~~(Math.random() * 3) + 1,
      type: ['CN', 'US', 'JP', 'EU'][~~(Math.random() * 4)],
      status: ['published', 'draft'][~~(Math.random() * 2)],
      display_time: new Date(),
      comment_disabled: true,
      pageviews: ~~(Math.random() * 300),
      image_uri,
      platforms: ['a-platform']
    })
  }
  return List
}
