import { ChangeEventHandler } from "react";

export default function CalculatorForm({
    labelTitle,
    placeholderTitle,
    value,
    onChange,
    id
}: { labelTitle: string, placeholderTitle: string, value: string, onChange: ChangeEventHandler, id: string }) {

    return (
        <>
            <label>{labelTitle}</label>
            <div className={`rh-calculator-${id}`}>
                <input
                    type="text"
                    className="rh-calculator-form-input"
                    placeholder={placeholderTitle}
                    value={value}
                    onChange={(e) => {
                        const inputValue = e.target.value;
                        const isPositiveNumber = /^(?:[1-9]\d*|0)?$/.test(inputValue);
                        if (isPositiveNumber) {
                            onChange(e);
                        }
                    }}
                    id={id}
                />
            </div>
        </>
    )
}