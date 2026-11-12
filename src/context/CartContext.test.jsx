import { act, renderHook } from '@testing-library/react'
import { CartProvider } from './CartContext.tsx'
import { useCart } from '../hooks/useCart'
import { products } from '../data/products'

const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>
const renderCart = () => renderHook(() => useCart(), { wrapper })

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('adds matching product and size together and persists the subtotal', () => {
    const { result } = renderCart()
    const product = products[0]

    act(() => {
      result.current.addToCart(product, 'S')
      result.current.addToCart(product, 'S')
    })

    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].quantity).toBe(2)
    expect(result.current.itemCount).toBe(2)
    expect(result.current.subtotal).toBe(product.price * 2)
    expect(JSON.parse(localStorage.getItem('atelier-north-cart'))[0].size).toBe('S')
  })

  it('keeps different sizes as separate bag items and removes them independently', () => {
    const { result } = renderCart()
    const product = products[0]

    act(() => {
      result.current.addToCart(product, 'S')
      result.current.addToCart(product, 'M')
      result.current.removeFromCart(product.id, 'S')
    })

    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].size).toBe('M')
    expect(result.current.itemCount).toBe(1)
  })

  it('restores persisted items when the provider mounts again', () => {
    const product = products[0]
    localStorage.setItem('atelier-north-cart', JSON.stringify([{ product, size: 'L', quantity: 3 }]))

    const { result } = renderCart()

    expect(result.current.items[0].size).toBe('L')
    expect(result.current.itemCount).toBe(3)
  })
})
