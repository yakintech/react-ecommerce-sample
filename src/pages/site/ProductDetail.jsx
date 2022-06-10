import { Box, Button, Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material'
import StarIcon from '@mui/icons-material/StarBorder';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { baseService } from '../../api/baseService';

function ProductDetail() {

    const [product, setProduct] = useState("");

    const { id } = useParams();

    const navigate = useNavigate();

    const getProduct = async () => {
        await baseService.getById("/products", id)
            .then((data) => {
                setProduct(data);
                console.log("PRODUCT", product);
            })
    }

    useEffect(() => {
        getProduct();
    }, [])

    return (<>
        <Card
            sx={{
                width: 500,
                margin: 'auto',
            }}
        >
            <CardHeader
                title={product.name}
                subheader={product.subheader}
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
                </Box>
            </CardContent>
            <CardActions>
                <Button fullWidth variant='outlined'>
                    Add
                </Button>
            </CardActions>
        </Card>
    </>)
}

export default ProductDetail