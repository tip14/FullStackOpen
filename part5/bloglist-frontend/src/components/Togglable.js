import React, { useImperativeHandle, useState } from 'react';

const Togglable = React.forwardRef((props, ref) => {



    const [hidden, setHidden] = useState(true)
    const toggle = () => setHidden(!hidden);
    useImperativeHandle(ref, () => {
        return {
            toggle
        }
    })
    if (hidden) {
        return <button onClick={toggle}>{props.buttonLabel}</button>;
    } else {
        return (
            <>{props.children} <button onClick={toggle}>cancel</button></>
        )
    }
})

Togglable.displayName = 'Togglable'

export default Togglable