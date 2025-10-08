
import { useEffect } from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import manimage from "../../assets/images/man-image.png";
import useAuth from "../../hook/auth/useAuth";
import conf from "../../config";

const AdminProfile = () => {
  const navigate = useNavigate();
  const { loading, getProfile, adminProfile } = useAuth();

  useEffect(() => {
    getProfile();
  }, []);

  const handleBack = () => {
    navigate(-1); // Go to previous page
  };

  return (
    // <div className="flex flex-col min-h-screen bg-[#E0E9E9] p-4 md:p-6">
    <div className="flex flex-col min-h-screen bg-[#E0E9E9] w-full">
      {/* Header Box */}
      <div className="bg-[#FFFFFF] rounded-lg p-4 mb-4 shadow-md flex items-center space-x-2 text-[#0D2E28]">
        <svg
          width="30"
          height="30"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={handleBack}
          className="cursor-pointer"
        >
          <path
            d="M20.0007 36.6663C29.2054 36.6663 36.6673 29.2044 36.6673 19.9997C36.6673 10.7949 29.2054 3.33301 20.0007 3.33301C10.7959 3.33301 3.33398 10.7949 3.33398 19.9997C3.33398 29.2044 10.7959 36.6663 20.0007 36.6663Z"
            stroke="#0D2E28"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20.0007 13.333L13.334 19.9997L20.0007 26.6663"
            stroke="#0D2E28"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M26.6673 20H13.334"
            stroke="#0D2E28"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <h2 className="text-xl md:text-2xl font-semibold text-[#0D2E28]">Admin Profile</h2>
      </div>

      {/* Profile Box */}
      <div className="flex-grow bg-[#FFFFFF] rounded-md shadow-md p-6 md:p-4">
        {loading ? (
          <div className="text-center min-h-[400px] flex justify-center items-center">
           <svg
  className="animate-spin h-10 w-10 text-[#001580]"
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
>
  <circle
    className="opacity-100"
    cx="12"
    cy="12"
    r="10"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeDasharray="60"
    strokeDashoffset="20"
  ></circle>
</svg>

          </div>
        ) : (
          <Formik
            enableReinitialize={true} //  important for API data
            initialValues={{
              fullName: adminProfile?.name || "",
              phoneNumber: adminProfile?.mobile || "",
              email: adminProfile?.email || "",
            }}
            onSubmit={(values) => console.log(values)}
          >
            {() => (
              <Form>
                <div className="flex flex-col md:flex-row gap-6 border border-[#616666] rounded-md p-6 min-h-[400px] text-[#0D2E28]">
                  {/* Left - Fields */}
                  <div className="space-y-6 w-full md:w-2/3 text-[#0D2E28]">
                    {[
                      { label: "Full Name", key: "name" },
                      { label: "Phone Number", key: "mobile" },
                      { label: "Email ID", key: "email" },
                    ].map((field) => (
                      <div key={field.key} className="flex items-center mb-2 text-[#0D2E28">
                        <label className="w-40 font-medium text-[#0D2E28]">
                          {field.label}:
                        </label>
                        <input
                          type="text"
                          value={adminProfile?.[field.key] || ""}
                          readOnly
                          className="flex-1 border border-[#001580] bg-[#E4E5EB] px-3 py-2 rounded-md outline-none text-[#0D2E28]"
                        />
                      </div>
                    ))}
                  </div>

                  {/*  Right - Profile Image */}
                  <div className="flex flex-col items-center justify-start w-full md:w-1/3 mt-6 md:mt-0">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-[#001580] overflow-hidden">
                      <img
                        src={adminProfile?.profileImage || manimage}
                        alt="Admin"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = manimage;
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Section - Button */}
                <div className="mt-8 flex justify-center">
                 <div className="mt-2 flex justify-center">
  <button
    type="button"
    className="bg-[#001580] text-white rounded-md w-[200px] h-[40px] hover:bg-blue-700 transition duration-200"
    onClick={() => navigate("/admin/edit-profile")}
  >
    Edit Profile
  </button>
</div>

                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;
