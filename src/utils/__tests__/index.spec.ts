import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { debounce, throttle, safeJsonParse } from '../index'

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('只执行最后一次调用', () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 300)

    debounced()
    debounced()
    debounced()

    vi.advanceTimersByTime(299)
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('delay ms 后正常执行', () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 200)

    debounced()
    vi.advanceTimersByTime(200)
    expect(fn).toHaveBeenCalledTimes(1)
  })
})

describe('throttle', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('interval 内只执行一次', () => {
    const fn = vi.fn()
    const throttled = throttle(fn, 300)

    throttled()
    throttled()
    throttled()

    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('interval 过后可再次执行', () => {
    const fn = vi.fn()
    const throttled = throttle(fn, 300)

    throttled()
    vi.advanceTimersByTime(300)
    throttled()

    expect(fn).toHaveBeenCalledTimes(2)
  })
})

describe('safeJsonParse', () => {
  it('合法 JSON 返回解析结果', () => {
    expect(safeJsonParse('{"a":1}', null)).toEqual({ a: 1 })
  })

  it('非法 JSON 返回 fallback', () => {
    expect(safeJsonParse('not-json', [])).toEqual([])
  })

  it('空字符串返回 fallback', () => {
    expect(safeJsonParse('', 0)).toBe(0)
  })
})
