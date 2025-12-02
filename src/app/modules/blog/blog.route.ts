import { Router } from "express";
import { blog_controller } from "./blog.controller";
import { multerUpload } from "../../middlewares/multerUpload";

const blog_router = Router();

blog_router.post(
  "/create",
  multerUpload.single("image"),

  blog_controller.create_new_blog
);
blog_router.get("/latest", blog_controller.get_three_blogs);
blog_router.get("/", blog_controller.get_all_blog);
blog_router.patch(
  "/:id",
  multerUpload.single("image"),
  blog_controller.update_blog
);
blog_router.get("/:id", blog_controller.get_detail);
blog_router.delete("/:id", blog_controller.delete_blog);

export default blog_router;
