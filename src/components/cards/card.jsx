import React from "react";
import { FiUsers } from "react-icons/fi";

const cardData = [
  {
    title: "Total Customer",
    value: "5612",
    change: 3.7,
    icon: <FiUsers size={24} />,
    bg: "bg-gradient-to-b from-[#4C9ED9] to-[#99D5FF]",
  },
  {
    title: "Total Worker",
    value: "1059",
    change: -1.7,
    icon: (
      <svg
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.8 13L6.41905 21.38C6.22207 21.5771 5.9882 21.7334 5.73081 21.8401C5.47341 21.9467 5.19752 22.0017 4.9189 22.0017C4.3562 22.0018 3.81651 21.7783 3.41855 21.3805C3.02059 20.9827 2.79697 20.4431 2.79688 19.8804C2.79678 19.3177 3.02022 18.778 3.41805 18.38L11.8 9.99902"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M16.7745 4.02653C15.2942 3.0857 13.6389 2.45415 11.9081 2.1699C10.1773 1.88565 8.40695 1.95458 6.70352 2.37253C5.30552 2.71453 5.61152 4.53053 6.98052 4.97353C9.07512 5.65249 11.0425 6.67437 12.8025 7.99753"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M16.8027 11.9993C18.1261 13.7599 19.148 15.728 19.8267 17.8233C20.2707 19.1923 22.0867 19.4993 22.4297 18.1013C22.846 16.4055 22.9164 14.6433 22.6367 12.9197C22.357 11.1961 21.7329 9.54646 20.8017 8.06934"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M19.1537 3.3519C18.9277 3.12595 18.6212 2.99902 18.3017 2.99902C17.9821 2.99902 17.6756 3.12595 17.4497 3.3519L12.1537 8.6479C11.9277 8.87387 11.8008 9.18034 11.8008 9.4999C11.8008 9.81945 11.9277 10.1259 12.1537 10.3519L14.4497 12.6479C14.6756 12.8738 14.9821 13.0008 15.3017 13.0008C15.6212 13.0008 15.9277 12.8738 16.1537 12.6479L21.4497 7.3519C21.6756 7.12592 21.8025 6.81945 21.8025 6.4999C21.8025 6.18034 21.6756 5.87387 21.4497 5.6479L19.1537 3.3519Z"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    bg: "bg-gradient-to-b from-[#C94CD9] to-[#F399FF]",
  },
  {
    title: "Total Shop",
    value: "1896",
    change: 3.7,
    icon: (
      <svg
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.20117 10V19C3.20117 20.1046 4.0966 21 5.20117 21H19.2012C20.3058 21 21.2012 20.1046 21.2012 19V10"
          stroke="white"
          stroke-width="2"
        />
        <path
          d="M15.0351 21V15C15.0351 13.8954 14.1397 13 13.0351 13H11.0351C9.93059 13 9.03516 13.8954 9.03516 15V21"
          stroke="white"
          stroke-width="2"
          stroke-miterlimit="16"
        />
        <path
          d="M22.0195 9.36418L20.3255 3.43517C20.2519 3.17759 20.0165 3 19.7486 3H15.7012L16.1765 8.70377C16.1921 8.89043 16.2935 9.05904 16.4544 9.15495C16.8437 9.38698 17.6064 9.81699 18.2012 10C19.217 10.3125 20.702 10.1998 21.5477 10.0958C21.8994 10.0526 22.1169 9.7049 22.0195 9.36418Z"
          stroke="white"
          stroke-width="2"
        />
        <path
          d="M14.2005 10C14.768 9.82538 15.4884 9.42589 15.8914 9.18807C16.0833 9.07486 16.1889 8.86103 16.1704 8.63904L15.7005 3H8.70052L8.2306 8.63904C8.2121 8.86103 8.31775 9.07486 8.50958 9.18807C8.91259 9.42589 9.63302 9.82538 10.2005 10C11.6935 10.4594 12.7075 10.4594 14.2005 10Z"
          stroke="white"
          stroke-width="2"
        />
        <path
          d="M4.07668 3.43517L2.38267 9.36418C2.28532 9.7049 2.50281 10.0526 2.85451 10.0958C3.70017 10.1998 5.18525 10.3125 6.20101 10C6.79578 9.81699 7.55852 9.38698 7.94779 9.15495C8.10868 9.05904 8.21014 8.89043 8.2257 8.70377L8.70101 3H4.65359C4.3857 3 4.15027 3.17759 4.07668 3.43517Z"
          stroke="white"
          stroke-width="2"
        />
      </svg>
    ),
    bg:  "bg-gradient-to-b from-[#D98E4C] to-[#FFC999]",
  },
  {
    title: "Total Order",
    value: "1896",
    change: -1.7,
    icon: (
      <svg
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.5996 22C18.1225 22 22.5996 17.5228 22.5996 12C22.5996 6.47715 18.1225 2 12.5996 2C7.07676 2 2.59961 6.47715 2.59961 12C2.59961 17.5228 7.07676 22 12.5996 22Z"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12.5996 18C15.9133 18 18.5996 15.3137 18.5996 12C18.5996 8.68629 15.9133 6 12.5996 6C9.2859 6 6.59961 8.68629 6.59961 12C6.59961 15.3137 9.2859 18 12.5996 18Z"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12.5996 14C13.7042 14 14.5996 13.1046 14.5996 12C14.5996 10.8954 13.7042 10 12.5996 10C11.495 10 10.5996 10.8954 10.5996 12C10.5996 13.1046 11.495 14 12.5996 14Z"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    bg: "bg-gradient-to-b from-[#4CD96F] to-[#99FFB3]",
  },
  {
    title: "Total Sales",
    value: "₹ 15,40,259",
    change: -1.7,
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19 7V4C19 3.73478 18.8946 3.48043 18.7071 3.29289C18.5196 3.10536 18.2652 3 18 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5C3 5.53043 3.21071 6.03914 3.58579 6.41421C3.96086 6.78929 4.46957 7 5 7H20C20.2652 7 20.5196 7.10536 20.7071 7.29289C20.8946 7.48043 21 7.73478 21 8V12M21 12H18C17.4696 12 16.9609 12.2107 16.5858 12.5858C16.2107 12.9609 16 13.4696 16 14C16 14.5304 16.2107 15.0391 16.5858 15.4142C16.9609 15.7893 17.4696 16 18 16H21C21.2652 16 21.5196 15.8946 21.7071 15.7071C21.8946 15.5196 22 15.2652 22 15V13C22 12.7348 21.8946 12.4804 21.7071 12.2929C21.5196 12.1054 21.2652 12 21 12Z"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H20C20.2652 21 20.5196 20.8946 20.7071 20.7071C20.8946 20.5196 21 20.2652 21 20V16"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    bg: "bg-gradient-to-b from-[#D94C66] to-[#FF99AC]",
  },
];

const TotalCardsPage = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cardData.map((card, index) => (
        <div
          key={index}
          className={`${card.bg} text-white p-4 rounded-xl shadow-lg flex flex-col justify-between min-h-[140px]`}
        >
          <div className="flex justify-between items-start">
            <span className="text-sm font-medium">{card.title}</span>
            <div>{card.icon}</div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold">{card.value}</div>
            <div className="flex items-center text-sm mt-1">
              {card.change >= 0 ? (
                <span className="text-green-500 font-bold flex items-center">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2"
                  >
                    <path
                      d="M16 7H22V13"
                      stroke="#34C759"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M22 7L13.5 15.5L8.5 10.5L2 17"
                      stroke="#34C759"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  +{card.change} %
                </span>
              ) : (
                <span className="text-red-500 font-bold flex items-center ">
                  <svg
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2"
                  >
                    <path
                      d="M16.4004 17H22.4004V11"
                      stroke="#FF383C"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M22.4004 17L13.9004 8.5L8.90039 13.5L2.40039 7"
                      stroke="#FF383C"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  {card.change} %
                </span>
              )}
              <span className="ml-2 text-white/80">This Month</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TotalCardsPage;
