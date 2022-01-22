import React, {FC} from 'react';
import Container from "../../Container/Container";

const NotFound: FC = () => {
    return (
        <div>
            <Container>
                <h2>404</h2>
                <p>Page not found</p>
                <p>The site configured at this address does not contain the requested file.</p>
            </Container>
        </div>
    );
};

export default NotFound;