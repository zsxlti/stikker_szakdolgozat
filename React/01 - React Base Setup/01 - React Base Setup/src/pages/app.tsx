import * as React from 'react';

interface IState
{}

interface IProps
{}

export class App extends React.Component<IProps, IState>
{
  constructor(props: IProps)
  {
    super(props);

    this.state = {}
  }

  render()
  {
    const Body = () =>
      <h1>Az elso REACT alkamazasom!</h1>

    return Body();
  }
}