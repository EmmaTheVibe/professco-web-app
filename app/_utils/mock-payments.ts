import { PaymentStatus } from "@/app/_components/common/StatusPill/StatusPill";

export interface Payment {
  id: number;
  order_id: string;
  course_name: string;
  date: string;
  amount: string;
  status: PaymentStatus;
  ref_number: string;
  payment_time: string;
  payment_method: string;
  payer_name: string;
}

export const mockPayments: Payment[] = [
  {
    id: 1,
    order_id: "#3066",
    course_name: "Name Here",
    date: "Jan 6, 2022",
    amount: "₦20,000",
    status: "pending",
    ref_number: "#3066",
    payment_time: "06-01-2022, 09:14:02",
    payment_method: "Card Payment",
    payer_name: "Olivia Rhye",
  },
  {
    id: 2,
    order_id: "#3065",
    course_name: "Name Here",
    date: "Jan 6, 2022",
    amount: "₦20,000",
    status: "paid",
    ref_number: "#3065",
    payment_time: "25-02-2024, 13:22:16",
    payment_method: "Card Payment",
    payer_name: "Olivia Rhye",
  },
  {
    id: 3,
    order_id: "#3064",
    course_name: "Name Here",
    date: "Jan 6, 2022",
    amount: "₦20,000",
    status: "paid",
    ref_number: "#3064",
    payment_time: "06-01-2022, 08:02:47",
    payment_method: "Bank Transfer",
    payer_name: "Olivia Rhye",
  },
  {
    id: 4,
    order_id: "#3063",
    course_name: "Name Here",
    date: "Jan 5, 2022",
    amount: "₦20,000",
    status: "paid",
    ref_number: "#3063",
    payment_time: "05-01-2022, 17:41:09",
    payment_method: "Card Payment",
    payer_name: "Olivia Rhye",
  },
  {
    id: 5,
    order_id: "#3062",
    course_name: "Name Here",
    date: "Jan 5, 2022",
    amount: "₦20,000",
    status: "refunded",
    ref_number: "#3062",
    payment_time: "05-01-2022, 12:18:33",
    payment_method: "Card Payment",
    payer_name: "Olivia Rhye",
  },
  {
    id: 6,
    order_id: "#3061",
    course_name: "Name Here",
    date: "Jan 5, 2022",
    amount: "₦20,000",
    status: "paid",
    ref_number: "#3061",
    payment_time: "05-01-2022, 10:05:51",
    payment_method: "Bank Transfer",
    payer_name: "Olivia Rhye",
  },
  {
    id: 7,
    order_id: "#3060",
    course_name: "Name Here",
    date: "Jan 4, 2022",
    amount: "₦20,000",
    status: "failed",
    ref_number: "#3060",
    payment_time: "04-01-2022, 19:33:27",
    payment_method: "Card Payment",
    payer_name: "Olivia Rhye",
  },
  {
    id: 8,
    order_id: "#3059",
    course_name: "Name Here",
    date: "Jan 3, 2022",
    amount: "₦20,000",
    status: "paid",
    ref_number: "#3059",
    payment_time: "03-01-2022, 15:07:44",
    payment_method: "Card Payment",
    payer_name: "Olivia Rhye",
  },
  {
    id: 9,
    order_id: "#3058",
    course_name: "Name Here",
    date: "Jan 3, 2022",
    amount: "₦20,000",
    status: "paid",
    ref_number: "#3058",
    payment_time: "03-01-2022, 11:52:19",
    payment_method: "Bank Transfer",
    payer_name: "Olivia Rhye",
  },
  {
    id: 10,
    order_id: "#3057",
    course_name: "Name Here",
    date: "Jan 3, 2022",
    amount: "₦20,000",
    status: "paid",
    ref_number: "#3057",
    payment_time: "03-01-2022, 08:29:56",
    payment_method: "Card Payment",
    payer_name: "Olivia Rhye",
  },
];
