import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'; 
import { addCategoryModalFunc, addCityModalFunc, addEventModalFunc, loginModalFunc, registerModalFunc, updateCategoryModalFunc, updateCityModalFunc, updateEventModalFunc } from './modalSlice';


const initialState = {
  data: [],
  events: [],
  approvedEvents: [],
  jwtToken: "",
  cities: [],       
  categories: [],
  isLoggedIn: false,
  addEventData: [],
  updateEventData: [],
  eventsByUserId: [],
  attendedEvents: [],  
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    loginUserAsync: (state, action) =>{
      state.jwtToken = action.payload.jwtToken;
    },
    getAllEvents: (state, action) => {
      state.events = action.payload;
    },
    getAllCities: (state, action) => {
      state.cities = action.payload;
    },
    getAllCategories: (state, action) => {
      state.categories = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    addEventAsync: (state, action) => {
      state.addEventData = action.payload;
    },
    updateEventAsync: (state, action) => {
      state.updateEventData = action.payload;
    },
    getEventsByUserId: (state, action) => {
      state.eventsByUserId = action.payload;
    },
    getAttendedEvents: (state, action) => {
      state.attendedEvents = action.payload;
    }
  },
})

export const { loginUserAsync, getAllEvents, getAllCities, getAllCategories, setIsLoggedIn , addEventAsync, updateEventAsync, getEventsByUserId, getAttendedEvents} = dataSlice.actions

export const loginUser = (username, password, apiUrl) => async (dispatch) => {
  try {
    const response = await axios.post(apiUrl, { username, password });
    await dispatch(loginUserAsync({ jwtToken: response.data }));
    localStorage.setItem('jwtToken', response.data);
    await dispatch(setIsLoggedIn(true)); 
    dispatch(loginModalFunc());
  } catch (error) {
    //
  }
};

export const registerUser = (firstname, lastname, username, email, password, role, apiUrl) => async (dispatch) => {
  try {
    await axios.post(apiUrl, {firstname,lastname, username, email, password, roles:[role] });
    dispatch(registerModalFunc());
  } catch (error) {
    //
  }
};

export const exitUser = () => async(dispatch) => {
  try{
    localStorage.removeItem('jwtToken');
    dispatch(setIsLoggedIn(false))
  } catch (error) {
    //
  }
};

export const addEvent = (name, applicationFinishDate , date, description, address, quota, status, ticket, price, categoryId, cityId, creatorUserId, apiUrl) => async (dispatch) => {
  try {
    await axios.post(apiUrl, {name, applicationFinishDate , date, description, address, quota, status, ticket, price, categoryId, cityId, creatorUserId}) ;

    await dispatch(addEventModalFunc());
    window.location.reload();
  } catch (error) {
      //
  }
};

export const updateEvent = (eventId, name, applicationFinishDate , date, description, address, quota, status, ticket, price, categoryId, cityId, creatorUserId, apiUrl) => async (dispatch) => {
  try {
    await axios.put(apiUrl, {eventId, name, applicationFinishDate , date, description, address, quota, status, ticket, price, categoryId, cityId, creatorUserId}) ;

    await dispatch(updateEventModalFunc());
    window.location.reload();
  } catch (error) {
      // 
  }
};

export const fetchEvents = () => async (dispatch) => {
  try {
    const response = await axios.get('https://localhost:7074/api/Event/getallwithdetails');
    dispatch(getAllEvents(response.data));
  } catch (error) {
    console.error(error);
  }
};

export const fetchCities = () => async (dispatch) => {
  try {
    const response = await axios.get('https://localhost:7074/api/City/getall');
    dispatch(getAllCities(response.data));
  } catch (error) {
    console.error(error);
  }
};

export const fetchCategories = () => async (dispatch) => {
  try {
    const response = await axios.get('https://localhost:7074/api/Category/getall');
    dispatch(getAllCategories(response.data));
  } catch (error) {
    console.error(error);
  }
};

export const fetchEventsByUserId = (userId) => async (dispatch) => {
  try{
    const response = await axios.get(`https://localhost:7074/api/Event/getbyuserid?userId=${userId}`)
    dispatch(getEventsByUserId(response.data));
  }catch (error) {
    console.error(error);
  }
};

export const fetchEventsByCity = (cityName) => async (dispatch) => {
  try {
    const response = await axios.get(`https://localhost:7074/api/Event/getbycityname?name=${cityName}`);
    dispatch(getAllEvents(response.data));
  } catch (error) {
    console.error(error);
  }
};

export const fetchEventsByCategory = (categoryName) => async (dispatch) => {
  try {
    const response = await axios.get(`https://localhost:7074/api/Event/getbycategoryname?name=${categoryName}`);
    dispatch(getAllEvents(response.data));
  } catch (error) {
    console.error(error);
  }
};

export const deleteEvent = (eventId) => async () => {
  try {
    await axios.delete(`https://localhost:7074/api/Event/delete?id=${eventId}`);
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
};

export const deleteCategory = (categoryId) => async (dispatch) => {
  try {
    await axios.delete(`https://localhost:7074/api/Category/delete?id=${categoryId}`);
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
};

export const updateLoginStatus = (isLoggedIn) => (dispatch) => {
  dispatch(setIsLoggedIn(isLoggedIn));
};

export const updateCategory = (categoryId, categoryName) => async (dispatch) => {
  try {
    await axios.put(`https://localhost:7074/api/Category/update`, {categoryId, categoryName});
    await dispatch(updateCategoryModalFunc());
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
};

export const addCategory = (categoryName) => async (dispatch) => {
  try {
    await axios.post(`https://localhost:7074/api/Category/add`, {categoryName});
    await dispatch(addCategoryModalFunc());
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
};

export const addCity = (cityName) => async (dispatch) => {
  try {
    await axios.post(`https://localhost:7074/api/City/add`, {cityName});
    await dispatch(addCityModalFunc());
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
};

export const updateCity = (cityId, cityName) => async (dispatch) => {
  try {
    await axios.put(`https://localhost:7074/api/City/update`, {cityId, cityName});
    await dispatch(updateCityModalFunc());
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
};

export const deleteCity = (cityId) => async (dispatch) => {
  try {
    await axios.delete(`https://localhost:7074/api/City/delete?id=${cityId}`);
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
};

export const attendAnEvent = (userId, eventId) => async (dispatch) => {
  try {
    await axios.post(`https://localhost:7074/api/EventUser`, {userId, eventId});
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
};

export const deleteAttendedEvent = (UserEventId) => async (dispatch) => {
  try {
    await axios.delete(`https://localhost:7074/api/EventUser/${UserEventId}`);
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
};

export const fetchAttendedEvents = (userId) => async (dispatch) => {
  try{
    const response = await axios.get(`https://localhost:7074/api/EventUser/user/${userId}/eventIds`)
    dispatch(getAttendedEvents(response.data));
  }catch (error) {
    console.error(error);
  }
};



export default dataSlice.reducer