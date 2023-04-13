import { ChangeEventHandler } from "react";

export default function CalculatorForm({
    labelTitle,
    placeholderTitle,
    value,
    onChange,
    id
}: {labelTitle: string, placeholderTitle: string, value: number, onChange: ChangeEventHandler, id: string}){
    
    return (        
        <>
            <label>{labelTitle}</label>
            <div className={`rh-calculator-${id}`}>
                <input
                type="number"                
                className="rh-calculator-form-input"
                placeholder={placeholderTitle}
                value={value}
                min="0"
                onChange={(e)=> onChange(e)}
                id={id}
                />
            </div>
        </>
    )
}