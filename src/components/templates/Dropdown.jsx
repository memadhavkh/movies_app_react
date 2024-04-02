/* eslint-disable react/prop-types */
const Dropdown = ({ title, options, func }) => {
  return (
    <div className='select'>
        <select onChange={func} name="format" id="format">
            <option disabled value="0">
                {title}
            </option>
            {options.map((o,i) => (
              <option key={i} value={o}>{o.toUpperCase()}</option>
            ))}
        </select>
    </div>
  )
}

export default Dropdown