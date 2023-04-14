export function ProteinNeeds({
    proteinHealthy,
    lowerLimit,
    upperLimit,
    isHealthy
  }: {
    proteinHealthy?: number,
    lowerLimit?: number,
    upperLimit?: number,
    isHealthy: boolean
  }) {
    return (
      <div>
        <p className="rh-result-list--text">
          {isHealthy ? "Proteinbehov som frisk:" : "Proteinbehov som sjuk:"}
          <br className='rh-result-list--break'></br>
          <strong> {isHealthy ? proteinHealthy : `${lowerLimit} - ${upperLimit}`} gram/dygn </strong>
        </p>
      </div>
    )
  }
  
export function EnergyNeeds({
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
    isInputValid
}: {
    isInputValid: boolean
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