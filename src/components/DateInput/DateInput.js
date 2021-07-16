import './DateInput.css'

const DateInput = (props) => {
    return <div className='date-input-container'>
    <label className='date-label'>{props.placeholder}</label>
    <input className='date-input' type='date' onChange={(event) => props.onChange(event)}/>
    </div>
}

export default DateInput;