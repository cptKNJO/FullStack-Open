import React from "react";

const Total = ({ parts }) => {
    const sum = parts.reduce(((acc, part) => {
        return acc + part.exercises;
    }), 0)

    return (
        <div>
            total of {sum} exercises
        </div>
    )
}

export default Total