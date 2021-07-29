import './CtaButton.css'

const CtaButton = (props) => {

    return <button className="cta-button" type={props.type} onClick={props.onClick} style={props.style}>{props.children}</button>
}

export default CtaButton;