import React from 'react'
import {render} from '@testing-library/react'
import FadeInDiv from '@/components/FadeInDiv'; 

describe('FadeInDiv component', () => {
  it('renders children', () => {
    // Define some children to render within the FadeInDiv component
    const children = <div data-testid="child">Child Component</div>;

    // Render the FadeInDiv component with the children
    const { getByTestId } = render(<FadeInDiv>{children}</FadeInDiv>);

    // Assert that the children are rendered
    expect(getByTestId('child')).toBeInTheDocument();
  });


  it('matches snapshot', () => {
    // Render the FadeInDiv component
    const { container } = render(<FadeInDiv>Child Component</FadeInDiv>);

    // Assert that the rendered component matches the snapshot
    expect(container).toMatchSnapshot();
  });
});
