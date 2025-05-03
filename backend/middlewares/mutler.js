import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({ storage });

// Accept fields: resume and profilePhoto
export const singleUpload = upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "profilePhoto", maxCount: 1 },
]);
