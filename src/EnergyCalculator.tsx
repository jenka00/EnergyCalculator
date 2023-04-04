import React from 'react';
// import './envision.css';
import './calculator.css';
import { useState } from "react";
import CalculatorForm from './components/CalculatorForm';

type CalculatorValues = {
    weight: string;
    length: string;
    age: string;
}
const ActivityValues = [
    { id: "Basalmetabolism", value: 20 }, 
    { id: "Sängbunden", value: 25 }, 
    { id: "Uppegående med begränsad fysisk aktivitet", value: 30 }, 
    { id: "Återuppbyggnadskost", value: 35 }
]
function ProtHealthy({
    protHealthy
}: any) 
{           
    return (    
        <div>
            <p className="rh-result-list--text">Proteinbehov som frisk: 
            <br className='rh-result-list--break'></br> 
            <strong> {protHealthy} gram/dygn </strong></p>
        </div>      
    )
} 
function ProtUnHealthy({
    lowerLimit,
    upperLimit
}: any)
{
    return (
    <div>
    <p className="rh-result-list--text">Proteinbehov som sjuk: 
    <br className='rh-result-list--break'></br>
    <strong> {lowerLimit} - {upperLimit} gram/dygn</strong></p>
</div>
    )
}
function ActivityInfo({
    title,
    text,
    energyValue
}: any){
    return(
    <div>
        <p className="rh-result-list--text">{title}
        <br className='rh-result-list--break'></br>    
        <strong>{energyValue}{text}</strong></p>                                   
    </div>
    )
} 
function OverWeightInfo({
    length,
    BMI,
}: any) {
    const infoText = "Justering för övervikt (BMI > 25)";
    return (    
    <div className='rh-result-list__item-energy-info--overweight'> 
        {(length) > 100 && BMI > 25 
            ? <p className='rh-info-overweight--text'>{infoText}</p> 
            : <p className='rh-info-overweight--text-invisible'>{infoText}</p>   
        } 
        </div> 
    )
}
function PersonalInput({ 
    inputValue,
    inputTitle,
    inputUnit
    }
    : any) 
    {
        return(
        <div className='rh-result-list-personal--info'>                                    
            <span className='rh-result-list-personal-result--header'>{inputTitle}: </span>  
            <span className='rh-result-list-personal-result--space'></span>                         
                <span><strong>{inputValue && (inputValue + inputUnit)}</strong></span> 
        </div> 
    )
}
export default function Energikalkylator(){  

    const [values, setValues] = React.useState<CalculatorValues>({
        weight: "",
        length: "",
        age: ""
    });
    const [activity, setActivity] = useState("");
    const [activityMessage, setActivityMessage] = useState("");

    const handleChange = (fieldName: keyof CalculatorValues) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
            setValues({...values, [fieldName]: e.target.value});            
        };
    
    const handleSelect = (
        e: React.ChangeEvent<HTMLInputElement>
        ) => {
            setActivity(e.target.value)
            setActivityMessage(e.target.id)
    }; 

    const refreshPage = () => {
        window.location.reload();
    }
    
    let weightInNumber = parseInt(values.weight);
    let lengthInNumber = parseInt(values.length)
    let ageInNumber = parseInt(values.age);
    let BMI = Math.round((weightInNumber) / (lengthInNumber/100 * lengthInNumber/100));
    let BmiUpperLimit = 25;
    let BmiLowerLimit = ageInNumber >= 70 ? 22 : 20;
    var energyNeedExtra = 0;
    let energyAdjustment = 1;
    let MR = parseInt(activity);
     
    //Vid övervikt används den kroppsvikt som motsvarar BMI 25 för personens längd + tillägg av 25% av den överskjutande vikten.
    if (BMI > BmiUpperLimit) {
        let weight25 = BmiUpperLimit * (lengthInNumber / 100 * lengthInNumber / 100);  
        let weightExceeding = weightInNumber - weight25;
        weightInNumber = weight25 + (weightExceeding * 0.25);
    }

    //Energibehov och MR justerat för övervikt
    let energyNeed = MR * weightInNumber
    let MRadjusted = MR;
    
    //Energibehov justerat för undervikt
    if ( BMI < BmiLowerLimit ) {
        energyAdjustment = energyAdjustment + 0.1;
    }

    //Energibehov justerat för ålder > 70 
    if ( ageInNumber >= 70 ) 
    { 
        energyAdjustment = energyAdjustment - 0.1
    } 

    //Energibehov och MR justerat för ålder < 30 
    if ( ageInNumber < 30 )
    {
        energyNeed = energyNeed * 1.1;
        MRadjusted = MRadjusted * 1.1;
    } 
        
    energyNeed = energyNeed * energyAdjustment;
    MRadjusted = MRadjusted * energyAdjustment;
    

    //Intervall för sjuka
    let mrAdjustedExtra = 0;

    if (MR === 35) {
        mrAdjustedExtra =  40 * (MRadjusted / MR);
        energyNeedExtra = Math.round(mrAdjustedExtra * weightInNumber);
    } 

    let protHealthy = ageInNumber >= 70 ? Math.round(weightInNumber * 1.2) : Math.round(weightInNumber * 0.8);
    let protSickLowerLimit = ageInNumber >= 70 ? Math.round(weightInNumber * 1.2) : Math.round(weightInNumber * 1)
    let protSickUpperLimit = ageInNumber >= 70 ? Math.round(weightInNumber * 1.5) : Math.round(weightInNumber * 1.5)

    return (
        <div className='rh-calculator'>            
            <header>                
            </header>
            <h1 className='rh-calculator--headline'>Energikalkylator</h1>
            <main className='rh-calculator-container'>  
                <div className='rh-calculator-column--left'>   
                    <div className='rh-calculator-form'>
                        <div>                         
                            <form>
                                <h2>Beräkna energi</h2>
                                <CalculatorForm 
                                labelTitle="Vikt (kg)" 
                                placeholderTitle='Ange vikt' 
                                value={values.weight} 
                                onChange={handleChange("weight")} 
                                id="weight" /> 

                                <CalculatorForm 
                                labelTitle="Längd (cm)" 
                                placeholderTitle='Ange längd' 
                                value={values.length} 
                                onChange={handleChange("length")} 
                                id="length" />

                                <CalculatorForm 
                                labelTitle="Ålder (år)" 
                                placeholderTitle='Ange ålder' 
                                value={values.age} 
                                onChange={handleChange("age")} 
                                id="age" />                               
                            </form>                                   
                        </div> 
                    </div>                      
                    <div className='rh-calculator-line'></div>
                    <div className="rh-calculator-form rh-calculator-form--last">                       
                        <h2>Aktivitetsnivå</h2>
                        <form>
                            <div className='rh-form-activity-element-control'>                                
                                <label>                                    
                                    <div className='rh-form-control--label'>
                                        <input type="radio" id={ActivityValues[0].id} name="radios" value={ActivityValues[0].value} onChange={handleSelect}/>
                                        <span>Basalmetabolism (BMR, 20 kcal/kg/dygn)</span> 
                                    </div> 
                                </label>
                            </div>
                            <div className='rh-form-activity-element-control'>
                                <label>
                                    <div className='rh-form-control--label'>
                                        <input type="radio" id={ActivityValues[1].id} name="radios" value={ActivityValues[1].value} onChange={handleSelect}/>
                                        <span>Sängbunden (25 kcal/kg/dygn)</span>
                                    </div>
                                </label>
                            </div>  
                            <div className='rh-form-activity-element-control'>
                                <label>
                                    <div className="rh-form-control--label">
                                        <input type="radio" id={ActivityValues[2].id} name="radios" value={ActivityValues[2].value} onChange={handleSelect}/>
                                        <span>Uppegående med begränsad fysisk aktivitet (30 kcal/kg/dygn)</span>       
                                    </div>
                                </label>
                            </div>
                            <div className='rh-form-activity-element-control'>
                                <label>
                                    <div className="rh-form-control--label">
                                        <input type="radio" id={ActivityValues[3].id} name="radios" value={ActivityValues[3].value}  onChange={handleSelect}/>
                                        <span>Återuppbyggnadskost (35-40 kcal/kg/dygn)</span>
                                    </div>                                    
                                </label>
                            </div> 
                        </form>       
                    </div>
                </div>                          
                    
                <div className='rh-calculator-column--right'>
                    <div className='rh-calculator-form--last'>
                        {/*Personliga input-värden*/}
                        <div className='rh-result-list'>
                            <div className="rh-result-list--icon">                                
                                <img src='/image/user.svg' alt="användare"></img>
                            </div>
                            <div className="rh-result-list-personal-result">
                                <PersonalInput inputValue={values.weight} inputTitle='Vikt' inputUnit=' kg'/>
                                <PersonalInput inputValue={values.length} inputTitle='Längd' inputUnit=' cm'/>
                                <PersonalInput inputValue={values.age} inputTitle='Ålder' inputUnit=' år'/>
                                <PersonalInput inputValue={0 < BMI && BMI < 300 && (BMI)} inputTitle='BMI' inputUnit=' '/>
                            </div>                            
                        </div>                            
                            {/*Energivärden*/}
                        <div className='rh-result-list'>
                            <div className="rh-result-list--icon">                                
                                <img src='/image/bolt.svg' alt="energi"></img>
                            </div>                            
                            <div className="rh-result-list-info">
                                <ActivityInfo title="Aktivitetsnivå: " text={activityMessage} />
                                <OverWeightInfo length={lengthInNumber} BMI={BMI} />                              
                                { energyNeed > 0 ? 
                                energyNeedExtra > 0 ?
                                (<ActivityInfo 
                                    title="Sammanlagt energibehov: " 
                                    energyValue={`${Math.round(energyNeed)} - ${Math.round(energyNeedExtra)} kcal per dygn`}/>
                                ) :
                                (<ActivityInfo title="Sammanlagt energibehov: " energyValue={Math.round(energyNeed)} text=" kcal per dygn" /> 
                                ) :
                                (<ActivityInfo title="Sammanlagt energibehov: " />
                                )
                                } 
                            </div>                         
                        </div>       

                            {/*Proteinvärden*/}            
                        <div className='rh-result-list rh-result-list--protein'>
                            <div className="rh-result-list--icon">                                
                                <img src='/image/pizza.svg' alt="energi"></img>
                            </div>
                                { protHealthy > 0 ? 
                                (
                                <div className="rh-result-list-info">
                                    <ProtHealthy protHealthy={protHealthy} />
                                    <OverWeightInfo length={lengthInNumber} BMI={BMI} />                                  
                                    <ProtUnHealthy lowerLimit={protSickLowerLimit} upperLimit={protSickUpperLimit} />                                    
                                </div>) :
                                (<div className="rh-result-list-info">
                                    <div>
                                        <p className="rh-result-list--text">Proteinbehov som frisk:</p>
                                    </div> 
                                    <OverWeightInfo length={lengthInNumber} BMI={BMI} />                                     
                                    <div>
                                        <p className="rh-result-list--text">Proteinbehov som sjuk:</p>
                                    </div>
                                </div>) 
                                } 
                        </div>
                    </div>
                </div>                             
            </main>
            <div>
                <button className='rh-refresh--button' type="button" onClick={refreshPage}>Töm formulär</button>
            </div>        
        </div>        
    );
} 