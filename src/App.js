import React from 'react'
import { Menu } from 'semantic-ui-react'
import Exam from './pages/exam'

class App extends React.Component {
  render() {
    return (
      <>
        <Menu inverted attached>
          <Menu.Item header>Kuding</Menu.Item>
        </Menu>

        <Exam />
      </>
    )
  }
}

export default App
