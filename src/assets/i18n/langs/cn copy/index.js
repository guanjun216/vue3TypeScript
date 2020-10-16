import marketingCenter from "@/assets/i18n/langs/cn/marketingCenter.js";
import orderCenter from "@/assets/i18n/langs/cn/orderCenter.js";
import userCenter from "@/assets/i18n/langs/cn/userCenter.js";
import supplier from "@/assets/i18n/langs/cn/supplier.js";
import helpCenter from "@/assets/i18n/langs/cn/helpCenter.js";
import reviewCenter from "@/assets/i18n/langs/cn/reviewCenter.js";
import settleCenter from "./settleCenter"

let locale = {
  ...marketingCenter,
  ...orderCenter,
  ...userCenter,
  ...supplier,
  ...helpCenter,
  ...reviewCenter,
  ...settleCenter,
};

export default locale;
