const Button = ({ text, onClick }) => {
    return <button className='btn'
            type = 'button'
            onClick={onClick}>
        {text}
    </button>
}

Button.defaultProps={
    text : 'Button',
    onClick : ()=>{console.log('Click')},
}

export default Button
