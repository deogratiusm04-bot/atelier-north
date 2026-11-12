import { renderHook, act } from '@testing-library/react'
import { AuthProvider, useAuth } from '../context/AuthContext'

const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>

const renderAuth = () => renderHook(() => useAuth(), { wrapper })

describe('AuthContext', () => {
  beforeEach(() => {
    sessionStorage.clear()
  })

  it('starts unauthenticated with no user', () => {
    const { result } = renderAuth()
    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.loading).toBe(false)
  })

  it('login sets the user and marks authenticated', async () => {
    const { result } = renderAuth()
    await act(async () => {
      await result.current.login({ email: 'alex@goodbite.com', password: 'secret' })
    })
    expect(result.current.user).not.toBeNull()
    expect(result.current.user.email).toBe('alex@goodbite.com')
    expect(result.current.isAuthenticated).toBe(true)
  })

  it('register creates a new user and marks authenticated', async () => {
    const { result } = renderAuth()
    await act(async () => {
      await result.current.register({
        name: 'Alex',
        email: 'alex@goodbite.com',
        password: 'secret',
      })
    })
    expect(result.current.user.name).toBe('Alex')
    expect(result.current.user.email).toBe('alex@goodbite.com')
    expect(result.current.isAuthenticated).toBe(true)
  })

  it('logout clears the user and authentication state', async () => {
    const { result } = renderAuth()
    await act(async () => {
      await result.current.login({ email: 'alex@goodbite.com', password: 'secret' })
    })
    expect(result.current.isAuthenticated).toBe(true)

    act(() => {
      result.current.logout()
    })
    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
  })

  it('updateProfile updates user fields', async () => {
    const { result } = renderAuth()
    await act(async () => {
      await result.current.login({ email: 'alex@goodbite.com', password: 'secret' })
    })
    await act(async () => {
      await result.current.updateProfile({ name: 'Alex Rivera' })
    })
    expect(result.current.user.name).toBe('Alex Rivera')
    expect(result.current.user.email).toBe('alex@goodbite.com')
  })

  it('restores session from sessionStorage on mount', async () => {
    const { result } = renderAuth()
    await act(async () => {
      await result.current.login({ email: 'alex@goodbite.com', password: 'secret' })
    })

    // New hook instance in a fresh provider should restore the session
    const { result: restored } = renderAuth()
    expect(restored.current.user).not.toBeNull()
    expect(restored.current.user.email).toBe('alex@goodbite.com')
    expect(restored.current.isAuthenticated).toBe(true)
  })

  it('login returns a credentials failure without setting the user', async () => {
    const { result } = renderAuth()
    let res
    await act(async () => {
      res = await result.current.login({ email: 'alex@goodbite.com', password: 'wrongpass' })
    })
    expect(res.success).toBe(false)
    expect(res.error.kind).toBe('credentials')
    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
  })

  it('offline demo accounts throw a network error', async () => {
    const { result } = renderAuth()
    let threw = false
    await act(async () => {
      try {
        await result.current.login({ email: 'alex@offline.com', password: 'secret' })
      } catch (err) {
        threw = err.kind === 'network'
      }
    })
    expect(threw).toBe(true)
    expect(result.current.isAuthenticated).toBe(false)
  })
})
