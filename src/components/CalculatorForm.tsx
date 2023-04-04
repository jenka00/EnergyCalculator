export default function CalculatorForm({
    labelTitle,
    placeholderTitle,
    value,
    onChange,
    id
}: any){
    return (
        <>
            <label>{labelTitle}</label>
            <div className={`rh-calculator-${id}`}>
                <input
                type="number"
                className="rh-calculator-form-input"
                placeholder={placeholderTitle}
                value={value}
                onChange={(e)=> onChange(e)}
                id={id}
                />
            </div>
        </>
    )
}