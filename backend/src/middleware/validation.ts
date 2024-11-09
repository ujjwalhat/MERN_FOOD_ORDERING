import { body, validationResult } from "express-validator";
import { Response, Request, NextFunction } from "express";

const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array()); // Log validation errors for debugging
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateMyUserRequest = [
  body("name").isString().notEmpty().withMessage("Name must be a string"),
  body("addressLine1")
    .isString()
    .notEmpty()
    .withMessage("AddressLine1 must be a string"),
  body("city").isString().notEmpty().withMessage("City must be a string"),
  body("country").isString().notEmpty().withMessage("Country must be a string"),
  handleValidationErrors,
];

export const validateMyRestaurantRequest = [
  body("restaurantName").notEmpty().withMessage("Restaurant name is required"),
  body("city").notEmpty().withMessage("City name is required"),
  body("country").notEmpty().withMessage("Country name is required"),
  body("deliveryPrice")
    .isFloat({ min: 0 })
    .withMessage("Delivery price must be a positive Number"),
  body("estimatedDeliveryTime")
    .isInt({ min: 0 })
    .withMessage("Estimated Delivery time must be a positive Number"),
  body("cuisines")
    .isArray()
    .withMessage("Cuisines must be a array")
    .not()
    .isEmpty()
    .withMessage("Cuisines array cannot be empty  "),
  body("menuItems").isArray().withMessage("Menu Items must be a array"),
  body("menuItems.*.name")
    .notEmpty()
    .withMessage("Menu Items name is required"),
  body("menuItems.name.*")
    .isFloat({ min: 0 })
    .withMessage("Menu Items price is required abd must be a positive number"),
  handleValidationErrors,
];
