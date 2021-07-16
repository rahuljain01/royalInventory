import './FilterButton.css'

const FilterButton = (props) => {

    let buttonClass = props.isSelected ? 'filter-button-selected':'filter-button'

    return <button className={buttonClass} type={props.type} onClick={props.onClick}>{props.children}</button>
}

export default FilterButton;