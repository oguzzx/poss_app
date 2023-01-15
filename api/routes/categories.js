const Category = require("../models/Category");
const express = require("express");
const router = express.Router();

//! get all categories
router.get("/get-all", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
  }
});

//! add category
router.post("/add-category", async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(200).json("item added successfully");
  } catch (error) {
    res.status(400).json(error);
  }
});

//! update category
router.put("/update-category", async (req, res) => {
  try {
    await Category.findOneAndUpdate({ _id: req.body.categoryId }, req.body);
    res.status(200).json("item updated successfully");
  } catch (error) {
    res.status(400).json(error);
  }
});

//! delete category
router.delete("/delete-category", async (req, res) => {
  try {
    await Category.findOneAndDelete({ _id: req.body.categoryId });
    res.status(200).json("item deleted successfully");
  } catch (error) {
    res.status(400).json(error);
  }
});
module.exports = router;
