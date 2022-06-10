import { Box, Button, Card, CardActions, CardContent, CardHeader, Container, CssBaseline, GlobalStyles, Grid, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/StarBorder';
import React, { useLayoutEffect, useState } from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SiteFooter from './layout/SiteFooter';
import SiteHeader from './layout/SiteHeader';
import { baseService } from '../../api/baseService';

function ProductsPage() {

    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState("");
    const [productList, setProductList] = useState(products);

    const { id } = useParams();

    const navigate = useNavigate();

    const getProducts = async () => {
        await baseService.getAll("/products")
            .then((data) => {
                setProducts(data);
                console.log("PRODUCTS", products);
            })
    }

    const getCategory = async () => {
        await baseService.getById("/categories", id)
            .then((data) => {
                setCategory(data);
                console.log("CATEGORY", category);
            })
    }

    useLayoutEffect(() => {

        getProducts();
        getCategory();

    }, [])

    useEffect(() => {
        const list = products.filter(q => q.categoryId == id)
        setProductList(list)
        console.log("PRODUCTLIST", productList);
    }, [products])

    const tiers = productList && productList.map((item, key) => {
        return {
            key: key,
            title: item.name,
            id: item.id,
            price: item.unitPrice.toFixed(2),
            description: [
                item.description,
            ],
            buttonText: ' Detail',
            buttonVariant: 'outlined',
        }
    })

    return (<>
        {/* Hero unit */}
        <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
            <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
            >
                {category.name}
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" component="p">
               {category.description}
            </Typography>
        </Container>
        {/* End hero unit */}
        <Container maxWidth="md" component="main" >
            <Grid container spacing={5} alignItems="flex-end">
                {tiers.map((tier) => (

                    <Grid
                        item
                        key={tier.key}
                        xs={12}
                        sm={tier.title === 'Enterprise' ? 12 : 6}
                        md={4}
                        zeroMinWidth
                    >
                        <Card>
                            <CardHeader
                                title={tier.title}
                                subheader={tier.subheader}
                                titleTypographyProps={{ align: 'center' }}
                                action={tier.title === 'Pro' ? <StarIcon /> : null}
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
                                        justifyContent: 'center',
                                        alignItems: 'baseline',
                                        mb: 2,
                                    }}
                                >
                                    <Typography component="h2" variant="h3" color="text.primary">
                                        ${tier.price}
                                    </Typography>
                                    <Typography variant="h6" color="text.secondary">

                                    </Typography>
                                </Box>
                                <ul>
                                    {tier.description.map((line) => (
                                        <Typography
                                            component="li"
                                            variant="subtitle1"
                                            align="center"
                                            key={line}
                                            noWrap
                                        >
                                            {line}
                                        </Typography>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardActions>
                                <Button fullWidth variant={tier.buttonVariant} onClick={() => navigate("/products/" + tier.id)}>
                                    {tier.buttonText}
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    </>)
}

export default ProductsPage