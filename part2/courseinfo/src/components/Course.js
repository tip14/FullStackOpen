
const Header = ({ name }) => {
    return (
        <h1>{name}</h1>
    )
}

const Total = ({ sum }) => {
    return (
        <p><strong>total of {sum} exercises</strong></p>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.part.name} {props.part.exercises}
        </p>
    )
}

const Content = ({ parts }) => {
    const sum = parts.reduce((sum, part) => sum + part.exercises, 0);

    return (
        <div>
            {parts.map(p => <Part part={p} key={p.id} />)}
            <Total sum={sum} />
        </div>
    )
}

const Course = ({ course }) => {
    return (
        <>
            <Header name={course.name} />
            <Content parts={course.parts} />
        </>
    )
}

export default Course;