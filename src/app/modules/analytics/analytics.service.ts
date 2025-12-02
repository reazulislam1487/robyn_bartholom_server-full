import dayjs from "dayjs";
import { analytics_model } from "./analytics.schema";

const create_new_analytics_into_db = async () => {
  const currentMonth = dayjs().format("YYYY-MM");
  // const lastMonth = dayjs().subtract(1, "month").format("YYYY-MM");

  const result = await analytics_model.findOneAndUpdate(
    { month: currentMonth },
    { $inc: { views: 1 } },
    { new: true, upsert: true }
  );

  return result.views || 0;
};
const get_analytics_into_db = async () => {
  const currentMonth = dayjs().format("YYYY-MM");
  const lastMonth = dayjs().subtract(1, "month").format("YYYY-MM");

  const thisMonthDoc = await analytics_model.findOne({
    month: currentMonth,
  });

  const lastMonthDoc = await analytics_model.findOne({
    month: lastMonth,
  });

  const thisMonthViews = thisMonthDoc?.views || 0;
  const lastMonthViews = lastMonthDoc?.views || 0;

  return { thisMonthViews, lastMonthViews };
};

export const analytics_service = {
  create_new_analytics_into_db,
  get_analytics_into_db,
};
