import React, { useEffect, useState } from 'react';
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCities, fetchCategories, fetchEventsByCity, fetchEventsByCategory, fetchEvents } from '../redux/dataSlice';
import { addEventModalFunc } from '../redux/modalSlice';


const EventFilterNavbar = () => {
    const dispatch = useDispatch();
    const cities = useSelector(state => state.data.cities);
    const categories = useSelector(state => state.data.categories);
    const isLoggedIn = useSelector(state => state.data.isLoggedIn);

    useEffect(() => {
        dispatch(fetchCities());
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleCityChange = (cityName) => {
        if (cityName === null) {
            dispatch(fetchEvents()); 
        } else {
            dispatch(fetchEventsByCity(cityName));
        }
    };

    const handleCategoryChange = (categoryName) => {
        if (categoryName === null) {
            dispatch(fetchEvents()); 
        } else {
            dispatch(fetchEventsByCategory(categoryName));
        }
    };

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Nav.Link className='mx-4' onClick={() => dispatch(fetchEvents())}><h3 className='text-white'>Tüm Etkinlikler</h3></Nav.Link>
                <Nav className="me-auto">
                    <NavDropdown title="Şehirler" id="city-dropdown">
                        <NavDropdown.Item onClick={() => handleCityChange(null)}>Tüm Şehirler</NavDropdown.Item>
                        {cities.map(city => (
                            <NavDropdown.Item key={city.cityId} onClick={() => handleCityChange(city.cityName)}>{city.cityName}</NavDropdown.Item>
                        ))}
                    </NavDropdown>
                    <NavDropdown title="Etkinlikler" id="category-dropdown">
                        <NavDropdown.Item onClick={() => handleCategoryChange(null)}>Tüm Kategoriler</NavDropdown.Item>
                        {categories.map(category => (
                            <NavDropdown.Item key={category.categoryId} onClick={() => handleCategoryChange(category.categoryName)}>{category.categoryName}</NavDropdown.Item>
                        ))}
                    </NavDropdown>
                </Nav>
                <Button disabled={!isLoggedIn} variant="success" onClick={() => dispatch(addEventModalFunc())}>Yeni Etkinlik</Button>
            </Container>
        </Navbar>
    );
}

export default EventFilterNavbar;