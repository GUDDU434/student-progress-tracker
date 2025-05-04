import { formatDate, formatDateTimeIST } from "./common_func";

export const initialStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Lakshadweep",
  "Puducherry",
  "Ladakh",
  "Jammu and Kashmir",
];
export const GovTypes = ["central", "state", "private", "other"];
export const Sectors = [
  { name: "UPSC", value: "upsc" },
  { name: "SSC", value: "ssc" },
  { name: "Railway", value: "railway" },
  { name: "Bank", value: "bank" },
  { name: "Police", value: "Police_and_Law Enforcement" },
  { name: "Engineer/PSU", value: "engineering" },
  { name: "Defence", value: "defence" },
  { name: "Education/Teaching", value: "Education_and_Teaching" },
  { name: "Law", value: "Law_and_Justice" },
  { name: "Finance", value: "Agriculture_and_Rural Development" },
  { name: "Medical", value: "medical" },
  { name: "Other", value: "other" },
];
export const applyMode = ["online", "offline", "email", "walkin", "other"];
export const jobType = ["regular", "contractual", "internship", "other"];
export const initialImpDate = `<ul><li><strong>Application Start Date:&nbsp;</strong>${formatDate(
  Date.now()
)}</li><li><strong>Application Last Date:&nbsp;</strong><span style="color: rgb(255, 0, 0);">${formatDate(
  Date.now()
)}</span></li></ul>`;
export const initialAgeCont = `<ul><li><strong>Minimum:</strong> 21 Years</li><li><strong>Maximum:</strong> 30 Years</li><li><strong>Age Relaxation will be applicable as per rules.</strong></li></ul>`;
export const initialFeeCont = `<ul><li><strong>General / OBC / EWS:</strong> Rs. 200 /- </li><li><span style="color: rgb(0, 0, 0);"><strong>SC / ST / PwD / Female / ExM:</strong> Rs. 0 /- &nbsp;</span></li></ul>`;
export const initialInstructConst = `<p><strong>How to Apply &amp; Instructions:</strong></p>`;
export const initaialImpLinks = [
  {
    link_name: "Apply",
    link: "",
    file: null,
    type: "URL",
  },
  {
    link_name: "Application Form",
    link: "",
    file: null,
    type: "URL",
  },
  {
    link_name: "Official Notification",
    link: "",
    file: null,
    type: "URL",
  },

  {
    link_name: "Join WhatsApp Channel",
    link: "https://whatsapp.com/channel/0029VakgPzcB4hdYEeVouX2f",
    file: null,
    type: "URL",
  },
];
export const userRole = ["admin", "student", "teacher"];
export const empty = "<p><br></p>";

export const initialInputData = {
  gov_type: "central",
  vacancy_title: "",
  advertisement: "Advt No: ",
  description: "",
  institution: "",
  post_date: formatDateTimeIST(new Date()),
  last_date: formatDateTimeIST(new Date()),
  application_fee: initialFeeCont,
  age_limits: initialAgeCont,
  instruction: initialInstructConst,
  apply_mode: "online",
  job_type: "regular",
  is_live: true,
};
