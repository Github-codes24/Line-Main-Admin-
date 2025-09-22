
import { useEffect } from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import manimage from "../../assets/images/man-image.png";
import useAuth from "../../hook/auth/useAuth";

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
    <div className="flex flex-col min-h-screen bg-[#E0E9E9] p-4 md:p-6">
      {/* Header Box */}
      <div className="bg-[#FFFFFF] rounded-lg p-2 mb-2 shadow-md flex items-center space-x-2">
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

        <h2 className="text-xl md:text-2xl font-semibold">Admin Profile</h2>
      </div>

      {/* Profile Box */}
      <div className="flex-grow bg-[#FFFFFF] rounded-md shadow-md p-4 md:p-4">
        {loading ? (
          <div className="text-center min-h-[400px] flex justify-center items-center">
            <svg
              aria-hidden="true"
              className="inline w-8 h-8 text-gray-200 animate-spin fill-[#001580]"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        ) : (
          <Formik
            enableReinitialize={true} // ✅ important for API data
            initialValues={{
              fullName: adminProfile?.name || "",
              phoneNumber: adminProfile?.mobile || "",
              email: adminProfile?.email || "",
            }}
            onSubmit={(values) => console.log(values)}
          >
            {() => (
              <Form>
                <div className="flex flex-col md:flex-row gap-6 border border-[#616666] rounded-md p-6 min-h-[400px]">
                  {/* Left - Fields */}
                  <div className="space-y-6 w-full md:w-2/3">
                    {[
                      { label: "Full Name", key: "name" },
                      { label: "Phone Number", key: "mobile" },
                      { label: "Email ID", key: "email" },
                    ].map((field) => (
                      <div key={field.key} className="flex items-center mb-2">
                        <label className="w-40 font-medium text-gray-700">
                          {field.label}:
                        </label>
                        <input
                          type="text"
                          value={adminProfile?.[field.key] || ""}
                          readOnly
                          className="flex-1 border border-[#001580] bg-[#E4E5EB] px-3 py-2 rounded-md outline-none"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Right - Image */}
                  <div className="flex justify-center items-start w-full md:w-1/3">
                    <img
                      src={manimage}
                      alt="Admin"
                      className="w-36 h-36 md:w-40 md:h-40 object-cover rounded-full border-2 border-[#001580]"
                    />
                  </div>
                </div>

                {/* Bottom Section - Button */}
                <div className="mt-8 flex justify-center">
                  <button
                    type="button"
                    className="bg-[#001580] text-white px-6 py-2 rounded-md transition duration-200"
                    onClick={() => navigate("/admin/edit-profile")}
                  >
                    Edit Profile
                  </button>
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
