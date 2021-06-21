import './CtaButton.css'

const CtaButton = (props) => {

    return <button className="cta-button" type={props.type} onClick={props.onClick}>{props.children}</button>
}

export default CtaButton;