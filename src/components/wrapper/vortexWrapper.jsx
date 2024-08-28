import { Vortex } from "../uiAce/vortex";
import PropTypes from "prop-types";

export function VortexWrapper({ children, ...props }) {
  return (
    <div className=" mx-auto rounded-md h-screen overflow-hidden">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={333}
        baseHue={120}
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
        {...props}
      >
        {children}
      </Vortex>
    </div>
  );
}

VortexWrapper.propTypes = {
  children: PropTypes.node,
};
