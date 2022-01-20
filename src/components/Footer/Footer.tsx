import React, {FC} from 'react';
import Container from "../Container/Container";
import './Footer.css'

const Footer: FC = () => {
    return (
        <footer className={'footer'}>
            <Container>
                <div className={'footer__body'}>
                    <div className={'logo'}>conduit</div>
                    <p>© 2022. An interactive learning project from Thinkster. Code licensed under MIT.</p>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;