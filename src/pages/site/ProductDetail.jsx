import { Box, Button, Card, CardActions, CardContent, CardHeader, Typography, Container, CircularProgress } from '@mui/material'
import StarIcon from '@mui/icons-material/StarBorder';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { baseService } from '../../api/baseService';

function ProductDetail() {

    const [product, setProduct] = useState("");
    const [supplier, setSupplier] = useState("");
    const [loading, setLoading] = useState(true);

    const { id } = useParams();

    const getProduct = async () => {
        await baseService.getById("/products", id)
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

                : <Container
                    disableGutters
                    maxWidth="sm"
                    component="main"
                    sx={{ pt: 8, pb: 6 }}
                >
                    <Card
                        sx={{
                            width: 500,
                            margin: 'auto',
                        }}
                    >
                        <CardHeader
                            title={product.name}
                            titleTypographyProps={{ align: 'center' }}
                            action={product.title === 'Pro' ? <StarIcon /> : null}
                            subheaderTypographyProps={{
                                align: 'center',
                            }}
                            sx={{
                                height: 100,
                                backgroundColor: (theme) =>
                                    theme.palette.mode === 'light'
                                        ? theme.palette.grey[200]
                                        : theme.palette.grey[700],

                            }}
                        />

                        <CardContent >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'baseline',
                                    mb: 2,
                                }}
                            >
                                <Typography component="h4" variant="h5" color="text.primary">
                                    Price: ${product.unitPrice}
                                </Typography>
                                <Typography component="h4" variant="h5" color="text.primary">
                                    Stock: {product.unitsInStock}
                                </Typography>
                                <Typography component="h4" variant="h5" color="text.primary">
                                    Quantity: {product.quantityPerUnit}
                                </Typography>
                                <Typography component="h4" variant="h5" color="text.primary">
                                    Company: {supplier.companyName}
                                </Typography>
                            </Box>
                        </CardContent>

                        <CardActions>
                            <Button fullWidth variant='outlined'>
                                Add
                            </Button>
                        </CardActions>

                    </Card>
                </Container>
        }
    </>)
}

export default ProductDetail