import React from 'react';

interface ListProps<T> {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
    style?:  string;
}

export default function List<T>({items, renderItem, style}: ListProps<T>) {

    return (
        <ul className={style}>
            {items.map(renderItem)}
        </ul>
    )
}