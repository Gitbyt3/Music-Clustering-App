import React from "react"
import { useNavigate } from "react-router"

const NavButton = ({ currentPage }) => {
  const navigate = useNavigate()

  const handleNavigation = () => {
    if (currentPage === "Intro") {
      navigate("/MainApp")} 
    else {
      navigate("/")}}

  const buttonLabel = currentPage === "Intro" ? "Next →" : "← Back";

  return (
    <button 
      onClick={handleNavigation}
      style={{
        padding: "8px 16px",
        fontSize: "16px",
        cursor: "pointer",
        border: "1px solid #ccc",
        borderRadius: "4px",
        background: "#f0f0f0",
      }}
    >
      {buttonLabel}
    </button>
  );
};

export default NavButton;