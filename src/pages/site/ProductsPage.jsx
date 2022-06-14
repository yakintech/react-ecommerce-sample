import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { baseService } from "../../api/baseService";

function ProductsPage() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});

  const getData = (categoryId) => {
    let url = "/products";
    if (categoryId) {
      url = `${url}/?categoryId=${categoryId}`;
    }
    baseService.getAll(url).then((data) => {
      setProducts(data);
    });
  };

  const getCategory = async () => {
    if(id){
      await baseService.getById("/categories", id).then((data) => {
      setCategory(data);
      console.log("CATEGORY", category);
    });
    }
    
  };

  useEffect(() => {
    getData(id);
    getCategory();
  }, []);

  const tiers =
    products &&
    products.map((item, key) => {
      return {
        key: key,
        title: item.name,
        id: item.id,
        price: item.unitPrice.toFixed(2),
        stock: item.unitsInStock,
        buttonText: " Detail",
        buttonVariant: "outlined",
      };
    });

  return (
    <>
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        {id ? (
          <>
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              {category.name}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              component="p"
            >
              {category.description}
            </Typography>
          </>
        ) : (
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            All Products
          </Typography>
        )}
      </Container>

      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier, key) => (
            <Grid
              item
              key={key}
              xs={12}
              sm={tier.title === "Enterprise" ? 12 : 6}
              md={4}
              zeroMinWidth
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  titleTypographyProps={{ align: "center" }}
                  subheaderTypographyProps={{
                    align: "center",
                  }}
                  sx={{
                    height: 100,
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: 'column',
                      justifyContent: "center",
                      alignItems: "center",
                      mb: 1,
                      mt: 1,
                    }}
                  >
                    <Typography
                      component="h2"
                      variant="h4"
                      color="text.primary"
                    >
                      <b>${tier.price}</b>
                    </Typography>
                    <Typography
                      component="h2"
                      variant="h5"
                      color="text.primary"
                    >
                      Stock: {tier.stock}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant={tier.buttonVariant}
                    onClick={() => navigate("/products/" + tier.id)}
                  >
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default ProductsPage;
