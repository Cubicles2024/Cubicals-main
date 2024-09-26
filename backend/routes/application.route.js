import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import applicationController from "../controllers/application.controller.js"; // Adjusted import

const router = express.Router();

// Route to apply for a job (POST method)
router.route("/apply/:id").post(isAuthenticated, applicationController.applyJob);

// Route to get applied jobs (GET method)
router.route("/get").get(isAuthenticated, applicationController.getAppliedJobs);

// Route to get applicants for a job (GET method)
router.route("/:id/applicants").get(isAuthenticated, applicationController.getApplicants);

// Route to get all applicants across all jobs
router.route("/applicants").get(isAuthenticated, applicationController.getAllApplicants);

// Route to update the status of an application (PATCH method)
router.route("/status/:id/update").patch(isAuthenticated, applicationController.updateStatus);

// Route for user to withdraw/delete their application (DELETE method)
router.route("/withdraw/:id").delete(isAuthenticated, applicationController.withdrawApplication);

// Route for recruiter to delete an application (DELETE method)
router.route("/delete/:id").delete(isAuthenticated, applicationController.deleteApplication);

// Route for recruiter to accept/reject an application (PATCH method)
router.route("/status/:id").patch(isAuthenticated, applicationController.updateApplicationStatus);



export default router;
