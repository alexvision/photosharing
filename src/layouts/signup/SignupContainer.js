import Signup from "./Signup";
import { drizzleConnect } from "drizzle-react";

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    PhotoSharing: state.contracts.PhotoSharing,
    drizzleStatus: state.drizzleStatus
  };
};

const SignupContainer = drizzleConnect(Signup, mapStateToProps);

export default SignupContainer;
