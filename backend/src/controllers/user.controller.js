import User from "../models/user.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"

export const testController = (req, res) => {
    res.status(200).json({ message: "Test controller is working!" })
}

export const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while generating referesh and access token"
        )
    }
}

export const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

    const { fullName, email, username, password } = req.body
    // console.log("email: ", email);

    if (
        [fullName, email, username, password].some(
            (field) => field?.trim() === ""
        )
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }],
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }
    //console.log(req.files);

    const user = await User.create({
        fullName,
        email,
        password,
        username: username.toLowerCase(),
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(
            500,
            "Something went wrong while registering the user"
        )
    }

    return res
        .status(201)
        .json(new ApiResponse(200, createdUser, "User registered Successfully"))
})

export const loginUser = asyncHandler(async (req, res) => {
    // req body -> data
    // username or email
    //find the user
    //password check
    //access and referesh token
    //send cookie

    const { email, username, password } = req.body
    // console.log(email);

    if (!username && !email) {
        throw new ApiError(400, "username or email is required")
    }

    const user = await User.findOne({
        $or: [{ username }, { email }],
    })

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
        user._id
    )

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken,
                },
                "User logged In Successfully"
            )
        )
})

export const logoutUser = asyncHandler(async (req, res) => {
    // console.log(`Req is ${req.user}`);
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1,
            },
        },
        {
            new: true,
        }
    )

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged Out"))
})

export const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken =
        req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById(decodedToken?._id)

        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
        }

        const options = {
            httpOnly: true,
            secure: true,
        }

        const { accessToken, newRefreshToken } =
            await generateAccessAndRefereshTokens(user._id)

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: newRefreshToken },
                    "Access token refreshed"
                )
            )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }
})

// Controller to get users with pagination
export const getUsers = async (req, res) => {
    try {
        // Page and limit are optional query params
        const page = parseInt(req.query.page) || 1 // Default page to 1
        const limit = parseInt(req.query.limit) || 5 // Default limit to 5 users per page

        // Calculate the number of users to skip for pagination
        const skip = (page - 1) * limit

        // Get users from the database with pagination
        const users = await User.find()
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })

        // Get the total count of users to calculate the next page URL
        const totalUsers = await User.countDocuments()

        // Calculate the total number of pages
        const totalPages = Math.ceil(totalUsers / limit)

        // Prepare the response data with users and pagination info
        const response = {
            users,
            currentPage: page,
            totalPages,
            totalUsers,
            nextPage:
                page < totalPages
                    ? `/api/v1/users/users?page=${page + 1}&limit=${limit}`
                    : null,
            prevPage:
                page > 1
                    ? `/api/v1/users/users?page=${page - 1}&limit=${limit}`
                    : null,
        }

        // Send response
        res.status(200).json(response)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server error" })
    }
}

export const getUserCount = async (req, res) => {
    try {
        // Get the total number of users in the database
        const userCount = await User.countDocuments()

        // Send response
        res.status(200).json({ userCount })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server error" })
    }
}

// Update user details
export const updateUser = async (req, res) => {
    const { userId } = req.params // Get user ID from URL parameter
    const { username, email, fullName, password } = req.body // Get data to be updated from the request body

    try {
        // Find the user by their ID and update their details
        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        if (username) user.username = username
        if (email) user.email = email
        if (fullName) user.fullName = fullName
        if (password) {
            // Only update password if provided
            user.password = password
        }

        await user.save() // Save the updated user details

        return res
            .status(200)
            .json({ message: "User updated successfully", user })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

// Delete user by ID
export const deleteUser = async (req, res) => {
    const { userId } = req.params // Get user ID from URL parameter

    try {
        const user = await User.findByIdAndDelete(userId)

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        return res.status(200).json({ message: "User deleted successfully" })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

// Controller to create a new user
export const createUser = async (req, res) => {
    try {
        const { username, email, fullName, password } = req.body

        // Check if all fields are provided
        if (!username || !email || !fullName || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        // Check if the username or email already exists
        const existingUser = await User.findOne({
            $or: [{ username }, { email }],
        })

        if (existingUser) {
            return res.status(400).json({
                message: "Username or Email already exists",
            })
        }

        // Create a new user instance
        const newUser = new User({
            username,
            email,
            fullName,
            password,
        })

        // Save the user to the database
        await newUser.save()

        // Send a success response
        res.status(201).json({
            message: "User created successfully",
            user: {
                username: newUser.username,
                fullName: newUser.fullName,
                email: newUser.email,
            },
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
}
