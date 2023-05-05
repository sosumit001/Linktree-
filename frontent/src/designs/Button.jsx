import './Button.css'

const Button = ({OnClick,Text,Width,MarginLeft,Color}) => {

    return (
        <div style={{color:Color,width:Width,marginLeft:MarginLeft}} className='button-d' onClick={OnClick}>{Text}</div>
    )
}

export default Button