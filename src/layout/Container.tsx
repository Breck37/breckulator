import React, { ReactNode } from 'react';
import '../styles/layout.scss';

interface Props {
    children: ReactNode;
}

const Container = ({ children }: Props) => (
    <div className="container">
        Container
    </div>
)

export default Container;