import React from "react";

const Total = ({ parts }) => {
    const total = parts.reduce(((sum, part) => {
        return sum + part.exercises;
    }), 0)

    return (
        <div>
            <strong>total of {total} exercises</strong>
        </div>
    )
}

export default Total