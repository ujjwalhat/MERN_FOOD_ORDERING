import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import cloudinary from "cloudinary";
import mongoose from "mongoose";

export const createMyRestaurant = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const existingRestaurant = await Restaurant.findOne({ user: req.userId });

    if (existingRestaurant) {
      return res
        .status(409)
        .json({ message: "User Restaurant already exists" });
    }

    // Check if file is uploaded
    const image = req.file as Express.Multer.File;
    if (!image) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);

    // Create new restaurant
    const restaurant = new Restaurant(req.body);
    restaurant.imageUrl = uploadResponse.url;
    restaurant.user = new mongoose.Types.ObjectId(req.userId);
    restaurant.lastUpdate = new Date();

    // Save restaurant to the database
    await restaurant.save();
    res.status(201).send(restaurant);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong in Restaurant Controller" });
  }
};
