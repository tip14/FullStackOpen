import React from 'react'
import {connect, useDispatch} from "react-redux";

const handleChange = (event) => {
    return {
        type:'FILTER',
        data: {
            filterString: event.target.value
        }
    }
}

const Filter = (props) => {

    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={props.handleChange} />
        </div>
    )
}

const mapDispatchToProps = {
        handleChange
    }

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)

export default ConnectedFilter