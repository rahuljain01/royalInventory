import TableRow from './TableRow'
import './Table.css'

const Table = (props) => {
    var heading = props.heading;
    var body = props.body;
    return (
        <table style={{ width: '100%' }}>
            <thead>
                <tr>
                    {heading.map(head => <th className='table-header'>{head}</th>)}
                </tr>
            </thead>
            <tbody>
                {body.map(row => <TableRow row={row} />)}
            </tbody>
        </table>
    );
}

export default Table;