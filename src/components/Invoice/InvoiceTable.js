import InvoiceRow from './InvoiceRow'
import '../Table/Table.css'

const InvoiceTable = (props) => {
    var heading = props.heading;
    var body = props.body;

    const statusDict = {'p':'Pending', 'd':'Delivered', 'c':'Cancel'}

    return (
        <table style={{ width: '100%' }}>
            <thead>
                <tr>
                    {heading.map(head => <th className='table-header'>{head}</th>)}
                </tr>
            </thead>
            <tbody>
                {body.map((row, index) => <InvoiceRow row={row} index={index} onEditClick={props.onEditClick} onCancelClick={props.onCancelClick} onStatusSelection={props.onStatusSelection} status={props.status[index]} statusOptions={['d','p','c'].map((status) => ({value:status, text:statusDict[status]}))}/>)}
            </tbody>
        </table>
    );
}

export default InvoiceTable;