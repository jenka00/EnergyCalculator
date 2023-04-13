export function ProteinHealthy({
    proteinHealthy
}: { proteinHealthy: number }) {
    return (
        <div>
            <p className="rh-result-list--text">Proteinbehov som frisk:
                <br className='rh-result-list--break'></br>
                <strong> {proteinHealthy} gram/dygn </strong></p>
        </div>
    )
}
export function ProteinUnHealthy({
    lowerLimit,
    upperLimit
}: {
    lowerLimit: number,
    upperLimit: number
}) {
    return (
        <div>
            <p className="rh-result-list--text">Proteinbehov som sjuk:
                <br className='rh-result-list--break'></br>
                <strong> {lowerLimit} - {upperLimit} gram/dygn</strong></p>
        </div>
    )
}
export function ActivityInfo({
    title,
    text,
    energyValue,
    inputIsValid,
    inputAge
}: {
    title: string,
    text: string,
    energyValue: string,
    inputIsValid: boolean,
    inputAge: number
}) {
    return (
        <div>
            <p className="rh-result-list--text">{title}
                <br className='rh-result-list--break'></br>
                {inputIsValid === true && inputAge >= 18 ?
                    <strong>{energyValue}{text}</strong> : ""}
            </p>
        </div>
    )
}
export function OverWeightInfo({
    length,
    BMI,
    inputIsValid,
    inputAge,
}: {
    length: number,
    BMI: number,
    inputIsValid: boolean,
    inputAge: number
}) {
    const infoText = "Justering för övervikt (BMI > 25)";
    return (
        <div className='rh-result-list__item-energy-info--overweight'>
            {(length) > 100 && BMI > 25 && inputIsValid && inputAge >= 18
                ? <p className='rh-info-overweight--text'>{infoText}</p>
                : <p className='rh-info-overweight--text-invisible'>&nbsp;</p>
            }
        </div>
    )
}

export function LowAgeWarning({
    isInputValid,
    inputAge
}: {
    isInputValid: boolean
    inputAge: number
}) {
    const infoText = "Inga uträkningar utförs för personer under 18 år!";
    return (
        <div className='rh-result-list__item-energy-info--age'>
            {!isInputValid 
                ? <p className='rh-info-age--text'>{infoText}</p>         
                : <p className='rh-info-age--invisible'>&nbsp;</p>      
            }      
        </div>
    )
}

// export function ProteinInfoText({
//     title,
//     lowerProteinLimit,
//     upperProteinLimit
// }:InfoTextValues) {
    
//     return (
//             <div>
//                 <p className="rh-result-list--text">{title}
//                 <br className='rh-result-list--break'></br>
//                 {upperProteinLimit
//                 ? <strong> {lowerProteinLimit} gram/dygn </strong>
//                 : <strong> {lowerProteinLimit} - {upperProteinLimit} gram/dygn </strong>}
//                 </p>
//             </div>
//     )
// }