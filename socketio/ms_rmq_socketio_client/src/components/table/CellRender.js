import React, { useState, useEffect } from 'react'

function CellRender(props) {
    const { styles, row, columns, column, data, config, children, ...domProps } = props;
    const [content, setContent] = useState('');

    useEffect(() => {
        let value = row[column?.id]

        if (column.format && typeof value === 'number') {
            setContent(column.format(value))
        }
        else {
            setContent(value)
        }
    }, [row, column]);

    return (
        <div {...domProps}>
            {content}
            {children}
        </div>
    )
}

export default CellRender