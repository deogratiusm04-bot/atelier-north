import {
  formatCurrency,
  formatDate,
  capitalize,
  truncate,
  isValidEmail,
  debounce,
  generateOrderId,
} from '../utils/helpers'

describe('formatCurrency', () => {
  it('formats a number as USD currency', () => {
    expect(formatCurrency(12.99)).toBe('$12.99')
  })

  it('formats whole numbers with two decimals', () => {
    expect(formatCurrency(10)).toBe('$10.00')
  })

  it('formats zero as currency', () => {
    expect(formatCurrency(0)).toBe('$0.00')
  })

  it('rounds to two decimal places', () => {
    expect(formatCurrency(5.555)).toBe('$5.56')
  })
})

describe('formatDate', () => {
  it('formats an ISO string to a readable date', () => {
    expect(formatDate('2026-11-05T14:30:00Z')).toContain('Nov 5')
  })
})

describe('capitalize', () => {
  it('capitalizes the first letter of a string', () => {
    expect(capitalize('goodbite')).toBe('Goodbite')
  })

  it('returns an empty string unchanged', () => {
    expect(capitalize('')).toBe('')
  })

  it('handles already capitalized strings', () => {
    expect(capitalize('Goodbite')).toBe('Goodbite')
  })
})

describe('truncate', () => {
  it('returns the string unchanged when shorter than the limit', () => {
    expect(truncate('short', 10)).toBe('short')
  })

  it('truncates and appends ellipsis when longer than the limit', () => {
    expect(truncate('this is a long string', 10)).toBe('this is a ...')
  })

  it('defaults to a 60 character limit', () => {
    const long = 'a'.repeat(100)
    expect(truncate(long)).toBe('a'.repeat(60) + '...')
  })

  it('handles empty strings', () => {
    expect(truncate('', 10)).toBe('')
  })
})

describe('isValidEmail', () => {
  it('returns true for valid email addresses', () => {
    expect(isValidEmail('alex@goodbite.com')).toBe(true)
  })

  it('returns false for missing @', () => {
    expect(isValidEmail('alexgoodbite.com')).toBe(false)
  })

  it('returns false for missing domain', () => {
    expect(isValidEmail('alex@')).toBe(false)
  })

  it('returns false for empty strings', () => {
    expect(isValidEmail('')).toBe(false)
  })
})

describe('debounce', () => {
  it('delays invoking the function until after the wait period', async () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 50)

    debounced('a')
    debounced('b')

    expect(fn).not.toHaveBeenCalled()

    await new Promise((resolve) => setTimeout(resolve, 100))

    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('b')
  })
})

describe('generateOrderId', () => {
  it('generates a string with the ORD- prefix', () => {
    expect(generateOrderId()).toMatch(/^ORD-[A-Z0-9]+$/)
  })

  it('generates unique ids on successive calls', () => {
    const a = generateOrderId()
    const b = generateOrderId()
    expect(a).not.toBe(b)
  })
})
