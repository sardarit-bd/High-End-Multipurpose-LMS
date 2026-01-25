"use client";

import ProfileCard from "@/components/modules/dashboard/student/ProfileCard";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-white">
      <ProfileCard />
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
    </div>
  );
}
