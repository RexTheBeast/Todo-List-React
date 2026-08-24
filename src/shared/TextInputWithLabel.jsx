export default function TextInputWithLabel({
    elementId,
    lableText,
    onChange,
    ref,
    value,
}){

    return(
        <div>
            <label htmlFor={elementId}>{lableText}</label>
            <input 
            type="text"
            id={elementId}
            ref={ref}
            value={value}
            onChange={onChange}
            />  
        </div>
    );
}