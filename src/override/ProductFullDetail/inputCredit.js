import React from 'react'

const InputCredit = (props) => {
    const {value,handleInputCredit,classes,product} = props
    const valueAmount = value ? value:product.min_credit
    return (
        <div>
            <h2 className={classes.creditTitle}>Select credit amount</h2>
            <label>{`$ ${valueAmount}.00`}</label>
            <input type={'range'} value={value} min={product.min_credit} max={product.max_credit}  defaultValue={product.min_credit} onChange={handleInputCredit} />
        </div>
    )
}

export default InputCredit
