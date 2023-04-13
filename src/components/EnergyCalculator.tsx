import React from "react";
import "../calculator.css";
import { useState } from "react";
import CalculatorForm from "./CalculatorForm";
import { CalculatorValues } from "../interfaces/ICalculatorValues";
import { activityValues } from "../values/activityValues";
import {
    ProteinHealthy,
    ProteinUnHealthy,
    ActivityInfo,
    OverWeightInfo,
    LowAgeWarning,
} from "./CalculatorInfoText";
import { PersonalInput } from "./PersonalInputs";
import ImageRefresh from "./Image"

export default function EnergyCalculator() {
    const intialState = {
        weight: "",
        length: "",
        age: "",
    }
    const [values, setValues] = useState<CalculatorValues>(intialState);

    const [activity, setActivity] = useState("");

    const [activityMessage, setActivityMessage] = useState("");
    const handleChange =
        (fieldName: keyof CalculatorValues) =>
            (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                setValues({ ...values, [fieldName]: e.target.value });
            };
      
    const handleSelect = (
        e: React.ChangeEvent<HTMLInputElement>,
        infoText: string,
    ) => {
        setActivity(e.target.value);
        setActivityMessage(infoText.split("(")[0]);
    };
    const emptyValues = () => {
        setValues(intialState);
        setActivity("");
        setActivityMessage("");
    }

    let weightInNumber = parseInt(values.weight);
    let lengthInNumber = parseInt(values.length);
    let ageInNumber = parseInt(values.age);
    const ageLowerLimit = 18;
    let isInputValid = false;
    weightInNumber > 0 && lengthInNumber > 0 && ageInNumber > 0 && ageInNumber >= 18 ? isInputValid = true : isInputValid = false;
    let isFormValid = false;
    isInputValid === true && activity !== "" ? isFormValid = true : isFormValid = false;
    let bmiValue = Math.round(
        weightInNumber / (((lengthInNumber / 100) * lengthInNumber) / 100)
    );
    const bmiUpperLimit = 25;
    const bmiLowerLimit = ageInNumber >= 70 ? 22 : 20;
    let energyNeedExtra = 0;
    let energyAdjustment = 1;
    const metabolicRate = parseInt(activity);

    //Vid övervikt används den kroppsvikt som motsvarar BMI 25 för personens längd + tillägg av 25% av den överskjutande vikten.
    if (bmiValue > bmiUpperLimit) {
        let weight25 =
            bmiUpperLimit * (((lengthInNumber / 100) * lengthInNumber) / 100);
        let weightExceeding = weightInNumber - weight25;
        weightInNumber = weight25 + weightExceeding * 0.25;
    }

    //Energibehov och ämnesomsättning justerat för övervikt
    let energyNeed = metabolicRate * weightInNumber;
    let metabolicRateAdjusted = metabolicRate;

    //Energibehov justerat för undervikt
    if (bmiValue < bmiLowerLimit) {
        energyAdjustment = energyAdjustment + 0.1;
    }

    //Energibehov justerat för ålder > 70
    ageInNumber >= 70 && bmiValue > bmiLowerLimit && (energyAdjustment = energyAdjustment - 0.1)

    //Energibehov och ämnesomsättning justerat för ålder < 30
    if (ageInNumber < 30) {
        energyNeed = energyNeed * 1.1;
        metabolicRateAdjusted = metabolicRateAdjusted * 1.1;
    }

    energyNeed = energyNeed * energyAdjustment;
    metabolicRateAdjusted = metabolicRateAdjusted * energyAdjustment;

    //Intervall för sjuka
    let metabolicRateAdjustedExtra = 0;

    if (metabolicRate === 35) {
        metabolicRateAdjustedExtra = 40 * (metabolicRateAdjusted / metabolicRate);
        energyNeedExtra = Math.round(metabolicRateAdjustedExtra * weightInNumber);
    }

    //Proteinintervall beroende på hälsotillstånd och ålder
    let proteinHealthy =
        ageInNumber >= 70
            ? Math.round(weightInNumber * 1.2)
            : Math.round(weightInNumber * 0.8);
    let proteinSickLowerLimit =
        ageInNumber >= 70
            ? Math.round(weightInNumber * 1.2)
            : Math.round(weightInNumber * 1);
    let proteinSickUpperLimit =
        ageInNumber >= 70
            ? Math.round(weightInNumber * 1.5)
            : Math.round(weightInNumber * 1.5);

    return (
        <div className="rh-calculator">
            <h1 className="rh-calculator--headline">Energikalkylator</h1>
            <main className="rh-calculator-container">
                <div className="rh-calculator-column--left">
                    <div className="rh-calculator-form">
                        <div>
                            <form>
                                <h2>Beräkna energi</h2>
                                <CalculatorForm
                                    labelTitle="Vikt (kg)"
                                    placeholderTitle="Ange vikt"
                                    value={parseInt(values.weight)}
                                    onChange={handleChange("weight")}
                                    id="weight"
                                />

                                <CalculatorForm
                                    labelTitle="Längd (cm)"
                                    placeholderTitle="Ange längd"
                                    value={parseInt(values.length)}
                                    onChange={handleChange("length")}
                                    id="length"
                                />

                                <CalculatorForm
                                    labelTitle="Ålder (år)"
                                    placeholderTitle="Ange ålder"
                                    value={parseInt(values.age)}
                                    onChange={handleChange("age")}
                                    id="age"
                                />
                                <LowAgeWarning isInputValid={isInputValid} inputAge={ageInNumber}/>
                                
                            </form>
                        </div>
                    </div>
                    <div className="rh-calculator-line"></div>
                    <div className="rh-calculator-form rh-calculator-form--last">
                        <h2>Aktivitetsnivå</h2>
                        <form>
                            {activityValues.map((radioValues) => {
                                return (
                                    <div
                                        className="rh-form-activity-element-control"
                                        key={radioValues.id}
                                    >
                                        <label>
                                            <div className="rh-form-control--label">
                                                <input
                                                    type="radio"
                                                    id={radioValues.id}
                                                    name="radios"
                                                    value={radioValues.value}
                                                    onChange={(e) => handleSelect(e, radioValues.clearText)}
                                                    checked={parseInt(activity) === radioValues.value ? true : false}
                                                />
                                                <span>{radioValues.clearText}</span>
                                            </div>
                                        </label>
                                    </div>
                                );
                            })}
                        </form>
                    </div>
                </div>

                <div className="rh-calculator-column--right">
                    <div className="rh-calculator-form--last">
                        <div className="rh-resultlist--title">
                            <h2>Resultat beräknat på</h2>
                        </div>
                        {/*Personliga input-värden*/}
                        <div className="rh-result-list">
                            <div className="rh-result-list--icon">
                                <img src="/image/user.svg" alt=""></img>
                            </div>
                            <div className="rh-result-list-personal-result">
                                <PersonalInput
                                    inputValue={values.weight}
                                    inputTitle="Vikt"
                                    inputUnit=" kg"
                                />
                                <PersonalInput
                                    inputValue={values.length}
                                    inputTitle="Längd"
                                    inputUnit=" cm"
                                />
                                <PersonalInput
                                    inputValue={values.age}
                                    inputTitle="Ålder"
                                    inputUnit=" år"
                                />
                                <PersonalInput
                                    inputValue={isFormValid === true && 0 < bmiValue && bmiValue < 300 && bmiValue}
                                    inputTitle="BMI"
                                    inputUnit=""
                                />
                            </div>
                        </div>

                        {/*Energivärden*/}
                        <div className="rh-resultlist--title">
                            <h2>Resultat - Energibehov</h2>
                        </div>
                        <div className="rh-result-list">
                            <div className="rh-result-list--icon">
                                <img src="/image/bolt.svg" alt=""></img>
                            </div>
                            <div className="rh-result-list-info">
                                <ActivityInfo
                                    title="Aktivitetsnivå: "
                                    text={activityMessage}
                                    energyValue={""}
                                    inputIsValid={isFormValid}
                                    inputAge={ageInNumber}
                                />
                                <OverWeightInfo
                                    length={lengthInNumber}
                                    BMI={bmiValue}
                                    inputIsValid={isFormValid}
                                    inputAge={ageInNumber} />
                                {energyNeed > 0 ? (
                                    energyNeedExtra > 0 ? (
                                        <ActivityInfo
                                            title="Sammanlagt energibehov: "
                                            text=""
                                            energyValue={`${Math.round(energyNeed)} - ${Math.round(
                                                energyNeedExtra
                                            )} kcal per dygn`}
                                            inputIsValid={isFormValid}
                                            inputAge={ageInNumber}
                                        />
                                    ) : (
                                        <ActivityInfo
                                            title="Sammanlagt energibehov: "
                                            energyValue={`${Math.round(energyNeed)}`}
                                            text=" kcal per dygn"
                                            inputIsValid={isFormValid}
                                            inputAge={ageInNumber}
                                        />
                                    )
                                ) : (
                                    <ActivityInfo
                                        title="Sammanlagt energibehov: "
                                        energyValue=""
                                        text=""
                                        inputIsValid={isFormValid}
                                        inputAge={ageInNumber}
                                    />
                                )}
                            </div>
                        </div>

                        {/*Proteinvärden*/}
                        <div className="rh-resultlist--title">
                            <h2>Resultat - Proteinbehov</h2>
                        </div>
                        <div className="rh-result-list rh-result-list--protein">
                            <div className="rh-result-list--icon">
                                <img src="/image/eggs.svg" alt=""></img>
                            </div>
                            {proteinHealthy > 0 && isFormValid === true && ageInNumber >= 18 ? (
                                <div className="rh-result-list-info">
                                    <ProteinHealthy proteinHealthy={proteinHealthy} />
                                    <OverWeightInfo length={lengthInNumber} BMI={bmiValue} inputIsValid={isFormValid} inputAge={ageInNumber} />
                                    <ProteinUnHealthy
                                        lowerLimit={proteinSickLowerLimit}
                                        upperLimit={proteinSickUpperLimit}
                                    />
                                </div>
                            ) : (
                                <div className="rh-result-list-info">
                                    <div>
                                        <p className="rh-result-list--text">
                                            Proteinbehov som frisk:
                                        </p>
                                    </div>
                                    <OverWeightInfo
                                        length={lengthInNumber}
                                        BMI={bmiValue}
                                        inputIsValid={isFormValid}
                                        inputAge={ageInNumber} />
                                    <div>
                                        <p className="rh-result-list--text">
                                            Proteinbehov som sjuk:
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <div>
                <button
                    className="rh-refresh--button"
                    type="button"
                    onClick={emptyValues}
                >
                    Töm formulär
                    <ImageRefresh />
                </button>
            </div>
        </div>
    );
}
