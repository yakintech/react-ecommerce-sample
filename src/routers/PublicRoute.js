import { CssBaseline, GlobalStyles } from '@mui/material'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SiteFooter from '../pages/site/layout/SiteFooter'
import SiteHeader from '../pages/site/layout/SiteHeader'
import HomePage from '../pages/site/HomePage'
import ProductsPage from '../pages/site/ProductsPage'
import ProductDetail from '../pages/site/ProductDetail'

function PublicRoute() {
    return (<>
        <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
        <CssBaseline />
        <SiteHeader></SiteHeader>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/category/:name" element={<ProductsPage />} />
            <Route path="/product/:name" element={<ProductDetail />} />
            <Route path="/products" element={<ProductsPage />} />
        </Routes>
        <SiteFooter></SiteFooter>
    </>)
}

export default PublicRoute