import './LinkButton.css'

const LinkButton = (props) => {

    return <button className='link-button' type={props.type} onClick={props.onClick}>{props.children}</button>
}

export default LinkButton;