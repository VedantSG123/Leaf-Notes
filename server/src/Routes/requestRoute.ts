import express from "express"
import { protect } from "../Middleware/protect"
// import {
//   createRequest,
//   getAllRequests,
//   getAllCollaborators,
//   acceptRequest,
//   deleteRequest,
//   removeCollaborator,
//   getPreview,
// } from "../Controllers/requestControllers"
import createRequest from "../Controllers/Requests/createRequest"
import getAllRequests from "../Controllers/Requests/getAllRequests"
import getAllCollaborators from "../Controllers/Requests/getAllCollaborators"
import acceptRequest from "../Controllers/Requests/acceptRequest"
import deleteRequest from "../Controllers/Requests/deleteRequest"
import removeCollaborator from "../Controllers/Requests/removeCollaborator"
import getPreview from "../Controllers/Requests/getPreview"

const router = express.Router()

router.post("/createRequest", protect, createRequest)
router.get("/getRequests", protect, getAllRequests)
router.get("/getCollaborators", protect, getAllCollaborators)
router.put("/acceptRequest", protect, acceptRequest)
router.delete("/declineRequest", protect, deleteRequest)
router.put("/removeCollab", protect, removeCollaborator)
router.get("/preview", protect, getPreview)

export default router
