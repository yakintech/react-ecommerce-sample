import { Box, Button, Card, CardActions, CardContent, Typography, CircularProgress, CardMedia } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { baseService } from '../../api/baseService';

function ProductDetail() {

    const [product, setProduct] = useState("");
    const [supplier, setSupplier] = useState("");
    const [loading, setLoading] = useState(true);

    let location = useLocation();

    const getProduct = async () => {
        await baseService.getById("/products", location.state.id)
            .then((data) => {
                setProduct(data);
                console.log("PRODUCT", product);
            })
    }

    const getSupplier = async () => {

        await baseService.getById("/suppliers", product.supplierId)
            .then((data2) => {
                setSupplier(data2)
                console.log("SUPPLIER", supplier);
            })

    }

    useEffect(() => {
        getProduct();
    }, [])

    useEffect(() => {
        if (product) {
            getSupplier();
        }
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [product])

    return (<>
        {
            loading
                ? <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '20rem' }}>
                    <CircularProgress />
                </Box>

                :
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: "3rem" }}>
                    <Card sx={{ display: 'flex', justifyContent: 'center', mt: "1rem", p: "3rem" }}>
                        <Card
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'baseline',
                                p: "1rem"
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="400"
                                width="400"
                                image="https://picsum.photos/200/200?random=1"
                                alt="Random Image"
                            />
                        </Card>
                        <CardContent >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'baseline',
                                    ml: "1rem",
                                }}
                            >
                                <Typography component="h4" variant="h6" color="text.primary">
                                    {product.name}
                                </Typography>
                                <Typography component="h4" variant="p" color="text.primary">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br></br>Suspendisse quis mi elit.
                                    Donec interdum et mi at elementum.
                                </Typography>
                                <Typography component="h4" variant="h4" color="text.primary">
                                    <b>${product.unitPrice}</b>
                                </Typography>
                                <Typography component="h4" variant="p" color="text.primary">
                                    Stock: {product.unitsInStock}
                                </Typography>
                                <Typography component="h4" variant="p" color="text.primary">
                                    Quantity: {product.quantityPerUnit}
                                </Typography>
                                <Typography component="h4" variant="p" color="text.primary">
                                    Company: {supplier.companyName}
                                </Typography>
                            </Box>
                            <CardActions sx={{ display: "flex", justifyContent: "center", mt: "2rem" }}>
                                <Button variant='outlined'>
                                    Add to Cart
                                </Button>
                            </CardActions>
                        </CardContent>
                    </Card>
                </Box>

        }

    </>)
}

export default ProductDetail