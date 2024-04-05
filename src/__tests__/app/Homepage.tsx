import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('Render', () => {
  it('rendder Home page', async () => {
    render(<Home/>)

    expect(screen.getByText('Get started')).toBeInTheDocument()
  })
})
