import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Box,
} from "@mui/material";

interface FiltersProps {
  onFiltersChange: (products: string[]) => void;
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  products: any[];
  setProducts: any;
}

interface Category {
  name: string;
  slug: string;
  url: string;
}

const Filters: React.FC<FiltersProps> = ({
  onFiltersChange,
  categories,
  selectedCategory,
  setSelectedCategory,
  products,
  setProducts,
}) => {
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const handleRunReport = () => {
    onFiltersChange(selectedProducts);
  };

  const handleClear = () => {
    setSelectedCategory("");
    setSelectedProducts([]);
    setProducts([]);
    onFiltersChange([]);
  };

  return (
    <Box
      display="flex"
      flexDirection={"column"}
      justifyContent={"space-between"}
      height={"100vh"}
    >
      <Box>
        <Box display="flex" justifyContent={"space-between"}>
          <Typography variant="h6">Filters</Typography>
          <Button onClick={handleClear}>Clear</Button>
        </Box>

        <FormControl fullWidth>
          <InputLabel>Select Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <MenuItem key={category.name} value={category.slug}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth disabled={!selectedCategory}>
          <InputLabel>Select Products</InputLabel>
          <Select
            multiple
            value={selectedProducts}
            onChange={(e) => setSelectedProducts(e.target.value as string[])}
          >
            {products.map((product) => (
              <MenuItem key={product.id} value={product.title}>
                {product.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box>
        <Button onClick={handleRunReport} disabled={!selectedCategory}>
          Run Report
        </Button>
      </Box>

    </Box>
  );
};

export default Filters;
