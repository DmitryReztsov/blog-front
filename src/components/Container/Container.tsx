import React, {FC} from 'react';

interface IContainerProps {
    children: React.ReactNode [] | React.ReactNode,
}

const Container: FC<IContainerProps> = ({children}) => {
    return (
        <div style={{width:1200, margin: '0 auto'}}>
            {children}
        </div>
    );
};

export default Container;