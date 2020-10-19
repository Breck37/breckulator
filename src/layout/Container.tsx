import React, { ReactNode } from 'react';
import '../styles/layout.scss';

interface Props {
    children: ReactNode;
}

const Container = ({ children }: Props) => (
    <div className="container">
        {children}
    </div>
)

export default Container;