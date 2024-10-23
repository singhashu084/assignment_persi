import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import Filters from "./components/Filters";
import Charts from "./components/Charts";
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Box, CircularProgress, Grid } from "@mui/material";

interface Category {
  name: string;
  slug: string;
  url: string;
}

const App: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [products, setProducts] = useState<any[]>([]);
  const [chartData, setChartData] = useState<{ name: string; price: number }[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          "https://dummyjson.com/products/categories"
        );
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const fetchProducts = async () => {
        setLoading(true);
        try {
          const { data } = await axios.get(
            `https://dummyjson.com/products/category/${selectedCategory}`
          );
          setProducts(data.products);
        } catch (error) {
          console.error("Failed to fetch products", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    } else {
      setProducts([]);
    }
  }, [selectedCategory]);

  const categoryChartOptions = useMemo(
    () => ({
      chart: { type: "pie" },
      title: { text: "All Categories" },
      series: [
        {
          name: "Products",
          data: categories.map((category: Category) => ({
            name: category.name,
            y: 1,
          })),
        },
      ],
    }),
    [categories]
  );

  const productChartOptions = useMemo(
    () => ({
      chart: { type: "pie" },
      title: { text: "Products" },
      series: [
        {
          name: "Price",
          data: products.map((item: any) => ({
            name: item.title,
            y: item.price,
          })),
        },
      ],
    }),
    [products]
  );

  const handleFilterChange = (selectedProducts: string[]) => {
    if (selectedCategory) {
      const filteredProducts = products.length
        ? products.filter((product: any) =>
            selectedProducts.includes(product.title)
          )
        : products;
      const data = filteredProducts.map((product: any) => ({
        name: product.title,
        price: product.price,
      }));
      setChartData(data);
    } else {
      setChartData([]);
    }
  };

  return (
    <div className="App">
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={3}>
            <Filters
              onFiltersChange={handleFilterChange}
              categories={categories}
              setSelectedCategory={setSelectedCategory}
              selectedCategory={selectedCategory}
              products={products}
              setProducts={setProducts}
            />
          </Grid>
          <Grid item xs={12} sm={8} md={9}>
            {loading ? (
              <CircularProgress />
            ) : (
              chartData.length > 0 && <Charts data={chartData} />
            )}

            {chartData.length === 0 && products.length > 0 && (
              <HighchartsReact
                highcharts={Highcharts}
                options={productChartOptions}
              />
            )}

            {chartData.length === 0 && products.length === 0 && (
              <HighchartsReact
                highcharts={Highcharts}
                options={categoryChartOptions}
              />
            )}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default App;
