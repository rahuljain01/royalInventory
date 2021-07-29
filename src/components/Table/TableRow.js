import './TableRow.css'

const TableRow = (props) => {
    const row = props.row;
        return (
            <tr className='table-row'>
                {row.map(val => <td className='table-data'>{val}</td>)}
                <div className='table-row-buttons'>
                    {props.onEditClick && <button className='table-row-button' type='button' onClick={() => props.onEditClick(props.index)}>edit</button>}
                    {props.onCancelClick && <button className='table-row-button' type='button'onClick={() => props.onCancelClick(props.index)}>cancel</button>}
                </div>
            </tr>
        )
}

export default TableRow;