import Product from '../models/ProductModel.js';


export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    }
    catch (err) {
        res.status(404).json({ error: err.message })
    }
}


export const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const searchedProduct = await Product.findById(id);
        res.status(200).json(searchedProduct);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}


export const addProduct = async (req, res) => {
    try {
        const {
            name,
            price,
            brand,
            category,
            rating,
            description,
            stock,
            image
        } = req.body;

        const newProduct = {
            name,
            price,
            brand,
            category,
            rating,
            description,
            image,
            stock
        }

        const result = new Product(newProduct);
        const savedProduct = await result.save();
        res.status(201).json(savedProduct);

    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;



        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
            findByIdAndModify: false,
        })
        res.status(200).json(updatedProduct);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        res.status(200).json(deletedProduct);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const searchProducts = async (req, res) => {
    try {
        const { keyword } = req.params;

        const searchedProducts = await Product.find({
            $or: [
                { name: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } },
                { category: { $regex: keyword, $options: 'i' } },
                { brand: { $regex: keyword, $options: 'i' } },
            ]
        });

        res.status(200).json(searchedProducts);

    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const getProductByCategory = async (req, res) => {
    try {
        const { category } = req.params;

        const products = await Product.find({
            category: { $regex: category, $options: 'i' },
        })

        res.status(200).json(products);

    }
    catch (err) {
        res.status(500).json({ err: err.message });
    }
}

export const getProductByBrand = async (req, res) => {
    try {
        const { brand } = req.params;

        const products = await Product.find({
            brand: { $regex: brand, $options: 'i' },
        })

        res.status(200).json(products);

    }
    catch (err) {
        res.status(500).json({ err: err.message });
    }
}

export const getProductsPerPage = async (req, res) => {
    console.log(req.query);
    try {
        const page = (Number)(req.query.page || 1);
        const limit = (Number)(req.query.limit || 12);

        const skip = (page - 1) * limit;
        const startIndex = (Number) (skip+1);

        const totalCount = await Product.countDocuments();

        const products = await Product.find().skip(skip).limit(limit);

        const currentPageItems = products.length;
        const endIndex = startIndex + currentPageItems - 1;

        const response = {
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit),
            totalItems: totalCount,
            products: products,
            currentPageItems: currentPageItems,
            startIndex : startIndex,
            endIndex : endIndex
        };

        res.status(200).json(response);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }

}

export const getProductsAsPerFilter = async(req, res) => {
    try{
        const page = (Number)(req.query.page || 1);
        const maxPrice = (Number)(req.query.maxprice || 1000);
        const minPrice = (Number)(req.query.minprice || 0);
        const minRating = (Number)(req.query.minrating || 0);
        const maxRating = (Number)(req.query.maxrating || 5);
        const searchKeyword = (String)(req.query.searchKeyword || "");
        const categoryArr = req.body.categoryArr || [];
        const limit = 12;
        const skip = (page-1) * limit;

        const filterOptions = categoryArr.length === 0 ? 
        {
            price : {$gte : minPrice, $lte : maxPrice},
            rating: { $gte: minRating, $lte: maxRating },
            $or: [
                { category : { $regex: searchKeyword, $options : 'i'}},
                { name: { $regex: searchKeyword, $options: 'i' } },
                { brand: { $regex: searchKeyword, $options: 'i' } },
            ]
        } 
        :
        {
            price : {$gte : minPrice, $lte : maxPrice},
            rating: { $gte: minRating, $lte: maxRating },
            category : {$in : categoryArr},
            $or: [
                { name: { $regex: searchKeyword, $options: 'i' } },
                { brand: { $regex: searchKeyword, $options: 'i' } },
            ]
        };
        
        const totalFilteredItems = await Product.countDocuments(filterOptions);
        const filteredProducts = await Product.find(filterOptions).skip(skip).limit(limit);

        const currentPageItems = filteredProducts.length;

        const startIndex = skip + 1; 
        const endIndex = startIndex + currentPageItems - 1;

        const response = {
            currentPage : page,
            totalPages : Math.ceil(totalFilteredItems / limit),
            startIndex : startIndex,
            endIndex : endIndex,
            filteredProducts : filteredProducts,
            totalItems : totalFilteredItems,
            currentPageItems : currentPageItems,
        }

        res.status(200).json(response);
    }
    catch(err){
        res.status(500).json({error : err.message})
    }
}

