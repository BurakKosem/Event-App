import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { registerModalFunc } from '../redux/modalSlice';
import { registerUser } from '../redux/dataSlice';

const RegisterModal = () => {
    const dispatch = useDispatch();
    const showModal = useSelector(state => state.modal.registerModal);
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");

    const handleClose = () => {
        dispatch(registerModalFunc());
    };

    const handleRegister = (email, userName, password, repeatPassword, firstname, lastname) => {

        {password == repeatPassword && dispatch(registerUser(firstname, lastname,userName, email, password, "User", "https://localhost:7074/api/Account/register"))}
    }

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className='text-black'>Üyelik Kaydı</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                <Form.Group className="mb-3" controlId="">
                        <Form.Label className='text-black'>Adınız</Form.Label>
                        <Form.Control value={firstname} onChange={(e) => setFirstname(e.target.value)} type="text" placeholder="Adınızı Giriniz" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label  className='text-black'>Soyadınız</Form.Label>
                        <Form.Control value={lastname} onChange={(e) => setLastname(e.target.value)} type="text" placeholder="Soyadınızı Giriniz" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label  className='text-black'>E-Posta</Form.Label>
                        <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="E-Posta Adresinizi Giriniz" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="">
                        <Form.Label  className='text-black'>Kullanıcı Adı</Form.Label>
                        <Form.Control value={userName} onChange={(e) => setUserName(e.target.value)} type="text" placeholder="Kullanıcı Adınızı Giriniz" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label  className='text-black'>Şifre</Form.Label>
                        <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Şifrenizi Giriniz" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label  className='text-black'>Şifre Tekrar</Form.Label>
                        <Form.Control value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} type="password" placeholder="Şifrenizi Giriniz" />
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Çıkış
                </Button>
                <Button variant="primary" onClick={() => handleRegister(email, userName, password, repeatPassword, firstname, lastname)}>
                    Üye Ol
                </Button>
            </Modal.Footer>
        </Modal>


    );
}

export default RegisterModal