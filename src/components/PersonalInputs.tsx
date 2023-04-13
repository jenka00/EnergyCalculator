export function PersonalInput({
    inputValue,
    inputTitle,
    inputUnit,
}: {
    inputValue: any;
    inputTitle: string;
    inputUnit: string;
}) {
    return (
        <div className="rh-result-list-personal--info">
            <span className="rh-result-list-personal-result--header">
                {inputTitle}:{" "}
            </span>
            <span className="rh-result-list-personal-result--space"></span>
            <span>
                <strong>{inputValue && inputValue + inputUnit}</strong>
            </span>
        </div>
    );
}