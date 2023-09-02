import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Tabs, Tab, Table, Button } from 'react-bootstrap';
import { fetchEvents, fetchCategories, fetchCities, updateEvent, deleteEvent, deleteCategory, deleteCity } from '../redux/dataSlice';
import {addCategoryModalFunc, addCityModalFunc, updateCategoryModalFunc, updateCityModalFunc} from '../redux/modalSlice';
import CategoryUpdateModal from '../components/CategoryUpdateModal';
import CategoryAddModal from '../components/CategoryAddModal';
import CityAddModal from '../components/CityAddModal';
import CityUpdateModal from '../components/CityUpdateModal';

const AdminPanel = () => {
  const dispatch = useDispatch();
  const events = useSelector(state => state.data.events);
  const cities = useSelector((state) => state.data.cities);
  const categories = useSelector((state) => state.data.categories);
  const [updatedCategoryId, setUpdatedCategoryId] = useState(0);
  const [updatedCityId, setUpdatedCityId] = useState(0);
  const { updateCategoryModal } = useSelector(state => state.modal);
  const { addCategoryModal } = useSelector(state => state.modal);
  const { updateCityModal } = useSelector(state => state.modal);
  const { addCityModal } = useSelector(state => state.modal);

  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchCategories());
    dispatch(fetchCities());
  }, [dispatch]);

  const handleApproveEvent = (event) => {
    const categoryName = event.categoryName;
    const cityName = event.cityName;
    const selectedCategory = categories.find(category => category.categoryName === categoryName);
    const categoryId = selectedCategory ? selectedCategory.categoryId : 0;
    const selectedCity = cities.find(city => city.cityName === cityName);
    const cityId = selectedCity ? selectedCity.cityId : 0;

    dispatch(updateEvent(
      event.eventId,
      event.eventName,
      event.appFinishDate,
      event.eventDate,
      event.eventDescription,
      event.eventAddress,
      event.eventQuota,
      true,
      event.newIsEventPrice,
      event.eventPrice,
      categoryId,
      cityId,
      event.creatorUserId,
      'https://localhost:7074/api/Event/update'
    ));
  };

  const handleUpdateCategory = (categoryId) => {
    setUpdatedCategoryId(categoryId);
    dispatch(updateCategoryModalFunc());
  };
  const handleUpdateCity = (cityId) => {
    setUpdatedCityId(cityId);
    dispatch(updateCityModalFunc());
  };

    const handleDelete = (eventId) => {
        dispatch(deleteEvent(eventId));
    };

    const handleDeleteCategory = (categoryId) => {
        dispatch(deleteCategory(categoryId));
    };
    const handleDeleteCity = (cityId) => {
        dispatch(deleteCity(cityId));
    };

    return (
        <Container className="d-flex justify-content-center align-items-center mt-5">
            {updateCategoryModal && <CategoryUpdateModal categoryId={updatedCategoryId} />}
            {addCategoryModal && <CategoryAddModal />}
            {updateCityModal && <CityUpdateModal cityId={updatedCityId} />}
            {addCityModal && <CityAddModal />}
            <Row>
                <Tabs
                    defaultActiveKey="events"
                    id="justify-tab-example"
                    className="mb-3"
                    justify
                >
                    <Tab eventKey="events" title="Onay Bekleyen Etkinlikler">
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr className="text-center">
                                    <th>#</th>
                                    <th>Etkinlik Adı</th>
                                    <th>Etkinlik Türü</th>
                                    <th>İşlemler</th>
                                </tr>
                            </thead>
                            <tbody>
                                {events.map((event, index) => (
                                    <tr key={event.id} className="text-center">
                                        {event.eventStatus === false && (
                                            <>
                                                <td>{index + 1}</td>
                                                <td>{event.eventName}</td>
                                                <td>{event.categoryName}</td>
                                                <td>
                                                    <Button
                                                        variant="info"
                                                        className="me-2"
                                                        onClick={() => handleApproveEvent(event)}
                                                    >
                                                        Onayla
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        onClick={() => handleDelete(event.eventId)}
                                                    >
                                                        Sil
                                                    </Button>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Tab>
                    
                    <Tab eventKey="categories" title="Kategoriler">
                        <div className="d-flex justify-content-end mb-2">
                            <Button onClick={() => dispatch(addCategoryModalFunc())} variant="success">Etkinlik Ekle</Button>
                        </div>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr className="text-center">
                                    <th>#</th>
                                    <th>Kategori Adı</th>
                                    <th>İşlemler</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category, index) => (
                                    <tr key={category.id} className="text-center">
                                        <td>{index + 1}</td>
                                        <td>{category.categoryName}</td>
                                        <td>
                                            <Button
                                                variant="info"
                                                className="me-2"
                                                onClick={() => handleUpdateCategory(category.categoryId)}
                                            >
                                                Düzenle
                                            </Button>
                                            <Button variant="danger" onClick={() => handleDeleteCategory(category.categoryId)}>Sil</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Tab>
                    <Tab eventKey="cities" title="Şehirler">
                        <div className="d-flex justify-content-end mb-2">
                            <Button onClick={() => dispatch(addCityModalFunc())} variant="success">Şehir Ekle</Button>
                        </div>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr className="text-center">
                                    <th>#</th>
                                    <th>Şehir Adı</th>
                                    <th>İşlemler</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cities.map((city, index) => (
                                    <tr key={city.id} className="text-center">
                                        <td>{index + 1}</td>
                                        <td>{city.cityName}</td>
                                        <td>
                                            <Button
                                                variant="info"
                                                className="me-2"
                                                onClick={() => handleUpdateCity(city.cityId)}
                                            >
                                                Düzenle
                                            </Button>
                                            <Button variant="danger" onClick={() => handleDeleteCity(city.cityId)}>Sil</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Tab>
                </Tabs>
            </Row>

        </Container>
    )
}

export default AdminPanel