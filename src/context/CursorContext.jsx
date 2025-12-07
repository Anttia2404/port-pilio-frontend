import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

export const CursorContext = createContext();

export const CursorProvider = ({ children }) => {
  const [cursorVariant, setCursorVariant] = useState("default");

  const cursorEnter = () => setCursorVariant("attentive");
  const cursorLeave = () => setCursorVariant("default");
  const cursorInverseEnter = () => setCursorVariant("inverse");
  const cursorInverseLeave = () => setCursorVariant("default");

  return (
    <CursorContext.Provider 
      value={{ 
        cursorVariant, 
        cursorEnter, 
        cursorLeave,
        cursorInverseEnter,
        cursorInverseLeave
      }}
    >
      {children}
    </CursorContext.Provider>
  );
};

CursorProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error("useCursor must be used within CursorProvider");
  }
  return context;
};
