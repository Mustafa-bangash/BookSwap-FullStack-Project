import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { uploadOnCloudinary } from "../../utils/cloudinary";
import { ApiResponse } from "../utils/ApiResponse";
import { Book } from "../models/book.model";

const addNewBook=asyncHandler(async(req,res)=>
{
    const {title,author,genre,condition,description}=req.body


    if (
        [title, author, genre, condition,description].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

        const coverImageLocalPath = req.file?.path;

        if(!coverImageLocalPath) throw new ApiError(400,"cover image is required");

        const uploadCoverImage=uploadOnCloudinary(coverImageLocalPath);
        
        if (!uploadCoverImage.url) {
        throw new ApiError(500, "something went wrong while uploading avatar");
    }

    const book=await Book.create({
        title,
        author,
        genre,
        condition,
        description,
        coverImage:uploadCoverImage.url,
        user:req.user._id
    })

    res.status(200).json(
        new ApiResponse(200,book,"book created successfully")
    )
});


const deleteBook=asyncHandler(async(req,res)=>
{
    const {bookId}=req.params;

    if(!bookId) throw new ApiError(400,"book is is required");

    const book=await Book.findById(bookId);

    if(!book) throw new ApiError(404,"book not found");



    const owner=await Book.findOne({
        user:req.user._id,
        _id:bookId
    })


    if(!owner) throw new ApiError(403,"only owner can delete a book")


        res.status(200).json(
            new ApiResponse(200,{},"book deleted")
        )

})





export  {
    addNewBook,
    deleteBook
}