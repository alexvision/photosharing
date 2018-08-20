import Feed from './Feed'
import {
  drizzleConnect
} from 'drizzle-react'

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    PhotoSharing: state.contracts.PhotoSharing,
    drizzleStatus: state.drizzleStatus
  }
}

const FeedContainer = drizzleConnect(Feed, mapStateToProps);

export default FeedContainer
