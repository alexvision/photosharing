// Vendor
import { ContractForm } from "drizzle-react-components";
import React from "react";
import PropTypes from "prop-types";

// Internal
import Feed from '../feed/Feed';

class Signup extends React.Component {
  constructor(props, context) {
    super();
    this.contract = context.drizzle.contracts.PhotoSharing;
    this.state = {
      account: ""
    };
  }
  async componentDidMount() {
    await this.checkAccount();
  }
  
  async componentDidUpdate() {
    await this.checkAccount();
  }

  async checkAccount() {
    try {
      const account = await this.contract.methods
        .getAccount(this.props.accounts[0])
        .call();
      this.setState({ account });
    } catch (e) {
      console.log("No Account found for user address 0", e);
    }
  }

  render() {
    return !this.state.account ? (
      <section>
        <h2>PhotoSharing</h2>
        <p>Please create an account.</p>
        <ContractForm
          contract="PhotoSharing"
          method="addAccount"
          labels={["Username"]}
        />
      </section>
    ) : (
      <Feed account={this.state.account} {...this.props} />
    );
  }
};

Signup.contextTypes = {
  drizzle: PropTypes.object
};

export default Signup;
