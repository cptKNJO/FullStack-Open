import React from "react";

const Total = ({ parts }) => {
    const total = parts.reduce(((sum, part) => {
        return sum + part.exercises;
    }), 0)

    return (
        <div>
            total of {total} exercises
        </div>
    )
}

export default Total