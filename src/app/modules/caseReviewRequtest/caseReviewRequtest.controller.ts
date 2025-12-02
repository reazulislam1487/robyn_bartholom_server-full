import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import httpStatus from "http-status";
import { case_review_requtest_service } from "./caseReviewRequtest.service";
import { uploadToCloudinaryBuffer } from "../../utils/cloudinaryUpload";
import { case_review_requtest_validations } from "./caseReviewRequtest.validation";

const create_new_case_review_requtest = catchAsync(async (req, res) => {
  const parsedData = JSON.parse((req.body as any)?.data || "{}");

  // 2️⃣ Validate with Zod
  const data = case_review_requtest_validations.create.parse(parsedData);
  //

  
  // const data = JSON.parse(req.body.data);

  let uploadedDocs: string[] = [];

  if (req.files && Array.isArray(req.files)) {
    for (const file of req.files) {
      const uploaded = await uploadToCloudinaryBuffer(file, "case_docs");
      uploadedDocs.push(uploaded.secure_url);
    }
  }

  const finalPayload = {
    ...data,
    documents: uploadedDocs,
  };

  const result =
    await case_review_requtest_service.send_case_review_request_email(
      finalPayload
    );

  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Form submitted & email sent to admin!",
    data: result,
  });
});

export const case_review_requtest_controller = {
  create_new_case_review_requtest,
};
