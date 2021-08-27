import './SalesSummary.css'

const SalesSummary = (props) => {
    return <div className="summary-div" onClick={props.onClick}>
        <label>Total Sales</label>
        <label className='title-value'>{props.totalSales}</label>
        <label>No of bills</label>
        <label>{props.noOfBills}</label>
    </div>
}

export default SalesSummary;