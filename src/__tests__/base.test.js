import React, { useState } from 'react'
// import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import renderer from 'react-test-renderer'

describe('Init rgr for our react stack', () => {
  test('Jest should load and watch dirs', () => {
    const watching = true
    expect(watching).toEqual(true)
  })
})

describe('should render react base dom component', () => {
  afterEach(cleanup)
  const Greeting = () => {
    const [count, countState] = useState(0)
    return (
      <div>
        <button onClick={() => countState(count => count + 1)}>
        increase clicks {count}
        </button>
        <p> shit </p>
      </div>
    )
  }

  test('should render text from dummy html', () => {
    const { getByText } = render(<Greeting/>)
    expect(getByText('shit')).toBeInTheDocument()
  })

  test('should match first snap shot', () => {
    const { getByText } = render(<Greeting/>)
    // const firstRender = asFragment()
    // fireEvent.click(getByText(/increase clicks/))
    const tree = renderer.create(<Greeting/>).toJSON()
    // const { getByText, asFragment } = tree
    fireEvent.click(getByText(/increase clicks/))
    expect(tree).toMatchSnapshot()
  })
})
