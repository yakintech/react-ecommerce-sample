import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  CssBaseline,
  GlobalStyles,
  Grid,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/StarBorder";
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
    await baseService.getById("/categories", id).then((data) => {
      setCategory(data);
      console.log("CATEGORY", category);
    });
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
        description: [item.description],
        buttonText: " Detail",
        buttonVariant: "outlined",
      };
    });

  return (
    <>
      {/* Hero unit */}
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
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
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier,key) => (
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
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: "center" }}
                  action={tier.title === "Pro" ? <StarIcon /> : null}
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
                      justifyContent: "center",
                      alignItems: "baseline",
                      mb: 2,
                    }}
                  >
                    <Typography
                      component="h2"
                      variant="h3"
                      color="text.primary"
                    >
                      ${tier.price}
                    </Typography>
                    <Typography
                      variant="h6"
                      color="text.secondary"
                    ></Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line ,key) => (
                      <Typography
                     
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={key}
                        noWrap
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
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
