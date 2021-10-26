const PersonForm = ({formControls}) => {
    return (
        <>
            <form>
                <div>name: <input onChange={formControls.onNewNameChange} value={formControls.newName} /></div>
                <div>number: <input onChange={formControls.onNewNumberChange} value={formControls.newNumber} /></div>
                <div>
                    <button onClick={formControls.addPerson} type="submit">add</button>
                </div>
            </form>
        </>
    )
};

export default PersonForm;