export function formatToTzs(price: number) {
  return price.toLocaleString('sw-TZ', {
    style: 'currency',
    currency: 'TZS',
  })
}

export function formatDate(date: string) {
  const dayInMs = 1000 * 60 * 60 * 24
  const time = new Date(date).getTime()
  const now = new Date().getTime()
  const diff = Math.round((time - now) / dayInMs)

  const formatter = new Intl.RelativeTimeFormat('tz')

  return formatter.format(diff, 'days')
}
