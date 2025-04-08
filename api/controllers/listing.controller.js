import Listing from "../models/listing.model.js";
import { errorHanndle } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHanndle(401, "Listing not found!"));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHanndle(401, "you can only delete your own listing!"));
  }
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been Deleted!");
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findByIdAndUpdate(req.params.id);
  if (!listing) {
    return next(errorHanndle(404, "Listing not found"));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHanndle(401, "You can only update your own listings!"));
  }
  try {
    const updateListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updateListing);
  } catch (error) {
    next(error.message);
  }
};
