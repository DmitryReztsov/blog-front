import React, {FC} from 'react';
import './Container.css'

interface IContainerProps {
    children: React.ReactNode [] | React.ReactNode,
}

const Container: FC<IContainerProps> = ({children}) => {
    return (
        <div className={'container'}>
            {children}
        </div>
    );
};

export default Container;