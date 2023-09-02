import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { loginModalFunc } from '../redux/modalSlice';
import { useState } from 'react';
import { loginUser, setIsLoggedIn } from '../redux/dataSlice';

const LoginModal = () => {
    const dispatch = useDispatch();
    const showModal = useSelector(state => state.modal.loginModal);
    const jwtToken = useSelector(state => state.data.jwtToken);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleClose = () => {
        dispatch(loginModalFunc());
    };

    const handleLogin = () => {
        dispatch(loginUser(username, password, "https://localhost:7074/api/Account/login"));
        dispatch(setIsLoggedIn(true));
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className='text-black'>Üye Girişi</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label className='text-black'>Kullanıcı Adı</Form.Label>
                        <Form.Control value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Kullanıcı Adınızı Giriniz" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className='text-black'>Şifre</Form.Label>
                        <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Şifrenizi Giriniz" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Çıkış
                </Button>
                <Button variant="primary" onClick={handleLogin}>
                    Giriş
                </Button>
            </Modal.Footer>
        </Modal>


    );
}


export default LoginModal