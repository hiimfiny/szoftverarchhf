import Button from "./Button"

const Header = ( {title, regfunc, logfunc} ) => {

  return (
    <header className="App">
      <h1>{title}</h1>
      <div>
        <Button text='Register' onClick={regfunc}/>
        <Button text='Login' onClick={logfunc}/>
      </div>
    </header>
  )
}

Header.defaultProps = {
    title: 'React Component Test',
}

export default Header
