import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ItemsPage from './pages/ItemsPage';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function Main() {
	return (
		<BrowserRouter>
			<Layout>
				<Routes>
					<Route path='/' element={<IndexPage />} />
					<Route path='/items' element={<ItemsPage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/signup' element={<SignupPage />} />
				</Routes>
			</Layout>
		</BrowserRouter>
	);
}

export default Main;
